import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { AssignRoleDto } from '../dto/assignRole.dto';

@Injectable()
export class AssignRolesService {
    constructor(private readonly prisma: PrismaService){}

    async assignRole(roleDto: AssignRoleDto) {
       const { userName, roleName } = roleDto;

       const admin = await this.prisma.admin.findUnique({
        where: { userName },
        include: {
          roles: {
            select: {
              role: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      

       if(!admin) {
        throw new ForbiddenException("admin not found!!");
       }

       const role = await this.prisma.role.findUnique({
        where: {
            name: roleName
        }
       })

       if(!role) {
        throw new ForbiddenException("role not found!!!");
       }
       if(role.name === 'superAdmin'){
        throw new ForbiddenException(`you are not permitted to assign the role "${role.name}" to a admin`);
       }

       const existingRoles = admin.roles.map((r) => r.role?.name);
        if (existingRoles.includes(roleName)) {
        throw new ForbiddenException(`Admin "${admin.userName}" already has the role "${roleName}"`);
  }

       await this.prisma.adminRole.create({
        data: {
            admin: {
                connect: {
                    userName
                }
            },
            role: {
                connect: {
                    id: role.id
                }
            }
        }
       })
     
       return { message: `Role "${role.name}" has been assigned to "${admin.userName}"` };
    }


    async revokeRole(roleDto: AssignRoleDto) {
        const { userName, roleName } = roleDto;

        const admin = await this.prisma.admin.findUnique ({
         where: {
             userName
         }
        })
 
        if(!admin) {
         throw new ForbiddenException("admin not found!!");
        }
 
        const role = await this.prisma.role.findUnique({
         where: {
             name: roleName
         }
        })
 
        if(!role) {
         throw new ForbiddenException("role not found!!!");
        }

      const adminRole = await this.prisma.adminRole.findFirst({
        where: {
            adminId: admin.id,
            roleId: role.id
        }
      })

      if(!adminRole) {
        throw new ForbiddenException("no role found for this admin!!")
      }

      await this.prisma.adminRole.delete({
        where: {
            id: adminRole.id
        }
      })

      return {message: `role revoked!!..."${userName}" is no longer a "${role.name}"`}
    }


}
