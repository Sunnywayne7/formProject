import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AssignRolesService } from './assign-roles.service';
import { AssignRoleDto } from '../dto/assignRole.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';

//@UseGuards(JwtGuard)
@Controller('assign-roles')
export class AssignRolesController {
    constructor(private rolesService: AssignRolesService) {}

    @Post('assign-admin')   
    @Roles('superAdmin')
    assignRole(@Body() roleDto: AssignRoleDto) {
        return this.rolesService.assignRole(roleDto)
    }

    @Post('revoke-role')
    @Roles('superAdmin')
    revokeRole(@Body() roleDto: AssignRoleDto) {
        return this.rolesService.revokeRole(roleDto)
    }

    
}
