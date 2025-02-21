import { Module } from '@nestjs/common';
import { AssignRolesController } from './assign-roles/assign-roles.controller';
import { AssignRolesService } from './assign-roles/assign-roles.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Module({
  controllers: [AssignRolesController],
  providers: [AssignRolesService, PrismaService]
})
export class AssignRolesModule {}
