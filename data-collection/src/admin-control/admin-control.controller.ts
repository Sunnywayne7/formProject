import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
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
    @Roles('viewAdmin', 'modifyAdmin', 'superAdmin')
    getForm() {
        return this.controlService.getForm()
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Get(':id')
    @Roles('viewAdmin', 'modifyAdmin', 'superAdmin')
    getFormById(@Param('id', ParseIntPipe) id: number){
        return this.controlService.getFormById(id)
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Patch(':id')
    @Roles('modifyAdmin', 'superAdmin')
    updateFormById(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFormDto ) {
        return this.controlService.updateFormById(id, dto)
    }

    @Delete(':id')
    @Roles('superAdmin')
    deleteFormById(@Param('id', ParseIntPipe) id: number) {
        return this.controlService.deleteFormById(id)
    }
    
}
