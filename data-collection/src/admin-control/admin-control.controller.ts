import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Render, UseGuards } from '@nestjs/common';
import { AdminControlService } from './admin-control.service';
import { RolesGuard } from 'src/guard/roles.guard';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UpdateFormDto } from './dto/updateForm.dto';

@Controller('admin-control')
export class AdminControlController {
    constructor(private controlService: AdminControlService) {}
    @UseGuards(JwtGuard, RolesGuard)
    @Get('get-forms')
    @Render('allForms')
    @Roles('viewAdmin', 'modifyAdmin', 'superAdmin')
    async getForm() {
        const getForm =  await this.controlService.getForm()
        console.log(getForm)
        return {getForm}
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Get(':id')
    @Render('formById')
    @Roles('viewAdmin', 'modifyAdmin', 'superAdmin')
    async getFormById(@Param('id', ParseIntPipe) id: number){
        const form = await this.controlService.getFormById(id)
        return { form }
        
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Patch(':id')
    @Render('updateForm')
    @Roles('modifyAdmin', 'superAdmin')
    async updateFormById(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFormDto ) {
        const formById = await this.controlService.updateFormById(id, dto)
        return { formById }
    }

    @Delete(':id')
    @Roles('superAdmin')
    deleteFormById(@Param('id', ParseIntPipe) id: number) {
        return this.controlService.deleteFormById(id)
    }
    
}
