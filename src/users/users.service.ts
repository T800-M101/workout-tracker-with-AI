import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { PrismaService } from 'src/prisma/prima.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

 async updateProfile(userId: string, dto: UpdateProfileDto) {
  return this.prisma.user.update({
    where: { id: userId },
    data: {
      name: dto.name, 
    },
  });
}
}
