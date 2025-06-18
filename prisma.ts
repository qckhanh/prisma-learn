import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

export class MyPrisma {
  private static instance: PrismaClient;
  public static getInstance(): PrismaClient {
    if (
      MyPrisma.instance === null ||
      MyPrisma.instance === undefined
    ) {
      // MyPrisma.instance = new PrismaClient().$extends(
      //   withAccelerate(),
      // );
      MyPrisma.instance = new PrismaClient();
      console.log(' --------------------- Prisma instance loaded');
    }
    return MyPrisma.instance;
  }
}
