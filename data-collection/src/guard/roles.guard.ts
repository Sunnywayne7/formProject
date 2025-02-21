import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if(!user.roles || user.roles.length == 0) {
      throw new ForbiddenException('you do not have permission to access this route')
    }
    const existingRoles = await this.prisma.role.findMany({
      where: { name: { in: requiredRoles } },
    });
    
    if (!requiredRoles.every(role => existingRoles.some(existingRole => existingRole.name === role))) {
      throw new ForbiddenException(`One or more required roles do not exist: ${requiredRoles.filter(role => !existingRoles.some(existingRole => existingRole.name === role)).join(', ')}`);
    }

    if (!user) {
      throw new ForbiddenException('You are not logged in');
    }

    if (!requiredRoles.some(role => user.roles.some(userRole => userRole.role.name === role))) {
      throw new ForbiddenException(`You do not have the required role(s): ${requiredRoles.join(', ')}`);
    }
    return true;
  }
}
