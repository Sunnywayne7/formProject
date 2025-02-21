import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FormModule } from './form/form.module';
import { AssignRolesModule } from './assign-roles/assign-roles.module';
@Module({
  imports: [AuthModule, 
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true}),
    FormModule,
    AssignRolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
