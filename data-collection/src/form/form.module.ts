import { Module } from '@nestjs/common';
import { FormController } from './form/form.controller';
import { FormService } from './form/form.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Module({
  controllers: [FormController],
  providers: [FormService, PrismaService]
})
export class FormModule {}
