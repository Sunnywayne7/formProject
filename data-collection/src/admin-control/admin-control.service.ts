import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { UpdateFormDto } from './dto/updateForm.dto';

@Injectable()
export class AdminControlService {
    constructor(private readonly prisma: PrismaService) {}
    
    async getForm() {
        return await this.prisma.dataForm.findMany({})
    }

    async getFormById(id: number) {
        const getForm = await this.prisma.dataForm.findFirst({
            where: {
                id
            }
        })
        if(!getForm) {
            throw new ForbiddenException('form not found!!');
        }
        return getForm;
    }

    async updateFormById(id: number, dto: UpdateFormDto) {
        const updateForm = await this.prisma.dataForm.findFirst({
            where: {
                id
            }, 
        })
        if(!updateForm) {
            throw new ForbiddenException('form not found!!!')
        }

        const patchForm = await this.prisma.dataForm.update({
            where: {
                id
            }, 
            data: { 
                ...dto
            }
        })

        return patchForm;
    }


    async deleteFormById(id: number) {
        const formToDelete = await this.prisma.dataForm.findUnique({
            where: {
                id
            }
        })
        if(!formToDelete) {
            throw new ForbiddenException('form not found!!!')
        }

       await this.prisma.dataForm.delete({
            where: {
                id
            }
        })
        return ('form deleted successfully!!!')
    }
}
