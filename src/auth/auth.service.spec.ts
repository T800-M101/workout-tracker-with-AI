import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { mockPrismaService } from 'src/prisma/prisma.service.mock';

describe('AuthService', () => {
  let service: AuthService;
  const prismaMock = mockPrismaService.useValue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        ConfigService,
        mockPrismaService
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /* REGISTERING TEST*/
  describe('register', () => {
    it('should create a user if the email does not exist.', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue({
        id: '1',
        email: 'memo@test.com',
        name: 'Memo',
        password: 'hashed_password',
      });

      const result = await service.register({
        email: 'memo@test.com',
        password: '123',
        name: 'Memo',
      });

      expect(result).toHaveProperty('id');
      expect(prismaMock.user.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if email exists', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'memo@test.com',
      });

      await expect(
        service.register({
          email: 'memo@test.com',
          password: '123',
          name: 'Memo',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });


  /* LOGIN TEST*/
  describe('login', () => {
    it('should throw ForbiddenException if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      await expect(service.login({ email: 'x@test.com', password: '123' }))
        .rejects.toThrow(ForbiddenException);
    });
  
    it('should return tokens if credentials are valid', async () => {
      const user = { id: '1', email: 'memo@test.com', password: 'hashed_password' };
      prismaMock.user.findUnique.mockResolvedValue(user);
      
      // Mock de bcrypt y jwt
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
      jest.spyOn(service, 'getTokens').mockResolvedValue({ 
        access_token: 'at', 
        refresh_token: 'rt' 
      });
  
      const result = await service.login({ email: 'memo@test.com', password: '123' });
      expect(result).toHaveProperty('access_token');
    });
  });

  /* REFRESH TOKENS TEST */
  describe('refreshTokens', () => {
    const userId = 'user123';
    const rt = 'some-refresh-token';

    it('should throw ForbiddenException if user does not exist', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(service.refreshTokens(userId, rt))
        .rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if hashedRt is null (user logged out)', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: userId,
        hashedRt: null,
      });

      await expect(service.refreshTokens(userId, rt))
        .rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if refresh token does not match', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: userId,
        hashedRt: 'different_hash',
      });

      // We simulate that bcrypt says they DO NOT match
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

      await expect(service.refreshTokens(userId, rt))
        .rejects.toThrow(ForbiddenException);
    });

    it('should return new tokens and update hash if everything is valid', async () => {
      const user = {
        id: userId,
        email: 'memo@test.com',
        hashedRt: 'valid_hash',
      };

      prismaMock.user.findUnique.mockResolvedValue(user);
      
      // Security and logic mocks
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
      
      // We spy on getTokens and updateRtHash to avoid executing real JWT/Prism logic
      const getTokensSpy = jest.spyOn(service, 'getTokens').mockResolvedValue({
        access_token: 'new_at',
        refresh_token: 'new_rt',
      });
      const updateRtHashSpy = jest.spyOn(service, 'updateRtHash').mockResolvedValue(undefined);

      const result = await service.refreshTokens(userId, rt);

      expect(result).toHaveProperty('access_token', 'new_at');
      expect(getTokensSpy).toHaveBeenCalledWith(userId, user.email);
      expect(updateRtHashSpy).toHaveBeenCalled();
    });
  });

  /* UPDATE RT HASH TEST */
  describe('updateRtHash', () => {
    it('should call prisma.user.update with hashed token', async () => {
      const userId = '1';
      const rt = 'token123';
      
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashed_rt'));
      
      await service.updateRtHash(userId, rt);

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { hashedRt: 'hashed_rt' },
      });
    });
  });

});

