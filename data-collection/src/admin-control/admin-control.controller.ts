import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AdminControlService } from './admin-control.service';
import { RolesGuard } from 'src/guard/roles.guard';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UpdateFormDto } from './dto/updateForm.dto';
import { Request, Response } from 'express';

@Controller('admin-control')
export class AdminControlController {
    constructor(private controlService: AdminControlService) {}
    @Get('getUpdatedForm')
    @Render('allForms')
    async getUpdatedForms(@Res() res: Response, @Req() req: Request) {
        const getUpdatedForm =  await this.controlService.getForm();
        const accessToken = req.headers.authorization?.split(' ')[1] || 'No Token Found';
        return {getUpdatedForm, accessToken};
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Get('get-forms')
    @Render('allForms')
    @Roles('viewAdmin', 'modifyAdmin', 'superAdmin')
    async getForm(@Res() res: Response, @Req() req: Request) {
        const getForm =  await this.controlService.getForm()
        const accessToken = req.headers.authorization?.split(' ')[1] || 'No Token Found';
        return { getForm, accessToken };
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
    async showUpdateForm(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
        const accessToken = req.headers.authorization?.split(' ')[1] || 'No Token Found'; 
        const formById = await this.controlService.getFormById(id);
        return { formById, accessToken };
}

    @UseGuards(JwtGuard, RolesGuard)
    @Post('updateForm/:id')
    @Roles('modifyAdmin', 'superAdmin')
    async updateFormById(@Param('id', ParseIntPipe) id:number, @Body() dto: UpdateFormDto, @Res() res: Response){
        const updatedForm = await this.controlService.updateFormById(id, dto);
        return res.redirect('/admin-control/getUpdatedForm')
    }


    @Delete('deleteForm/:id')
    @Roles('superAdmin')
    async deleteFormById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        await this.controlService.deleteFormById(id)
        return res.json({ success: true, message: 'Form deleted' });
    }
    
}
