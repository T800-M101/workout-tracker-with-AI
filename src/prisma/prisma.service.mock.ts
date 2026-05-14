import { PrismaService } from "./prima.service";

export const mockPrismaService = {
  provide: PrismaService,
  useValue: {
    user: { findUnique: jest.fn(), create: jest.fn(), update: jest.fn() },
    workout: { findMany: jest.fn(), create: jest.fn() },
    exercise: { 
      findMany: jest.fn(), 
      create: jest.fn(),
      findOne: jest.fn(), 
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
};