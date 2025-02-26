import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { FormDto } from '../dto/form.dto';


@Injectable()
export class FormService {
    constructor(private prisma: PrismaService){}

    async createForm(dto: FormDto) {
        const form = await this.prisma.dataForm.create({
            data: {
                ...dto
            }
        })
        return form;
    }

   

}
