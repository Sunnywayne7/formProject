import { Module } from '@nestjs/common';
import { AdminControlController } from './admin-control.controller';
import { AdminControlService } from './admin-control.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Module({
  controllers: [AdminControlController],
  providers: [AdminControlService, PrismaService]
})
export class AdminControlModule {}
