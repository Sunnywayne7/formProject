import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Render, Res, UseGuards } from '@nestjs/common';
import { AdminControlService } from './admin-control.service';
import { RolesGuard } from 'src/guard/roles.guard';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UpdateFormDto } from './dto/updateForm.dto';
import { Response } from 'express';

@Controller('admin-control')
export class AdminControlController {
    constructor(private controlService: AdminControlService) {}
    @Get('getUpdatedForm')
    @Render('allForms')
    async getUpdatedForms(@Res() res: Response) {
        const getUpdatedForm =  await this.controlService.getForm();
        console.log(res.getHeaders());
        return {getUpdatedForm};
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Get('get-forms')
    @Render('allForms')
    @Roles('viewAdmin', 'modifyAdmin', 'superAdmin')
    async getForm(@Res() res: Response) {
        const getForm =  await this.controlService.getForm()
        console.log(res.getHeaders());
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
    @Get('updateForm/:id')
    @Render('updateForm')
    @Roles('modifyAdmin', 'superAdmin')
    async showUpdateForm(@Param('id', ParseIntPipe) id: number) {
        const formById = await this.controlService.getFormById(id);
        return { formById };
}


    


    // @UseGuards(JwtGuard, RolesGuard)
    @Post('updateForm/:id')
    @Roles('modifyAdmin', 'superAdmin')
    async updateFormById(@Param('id', ParseIntPipe) id:number, @Body() dto: UpdateFormDto, @Res() res: Response){
        const updatedForm = await this.controlService.updateFormById(id, dto);
        return res.redirect('/admin-control/getUpdatedForm')
    }


    @Delete(':id')
    @Roles('superAdmin')
    deleteFormById(@Param('id', ParseIntPipe) id: number) {
        return this.controlService.deleteFormById(id)
    }
    
}
