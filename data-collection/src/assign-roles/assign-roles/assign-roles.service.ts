import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { AssignRoleDto } from '../dto/assignRole.dto';

@Injectable()
export class AssignRolesService {
    constructor(private readonly prisma: PrismaService){}

    async assignRole(roleDto: AssignRoleDto) {
       const { userName, roleName } = roleDto;

       const user = await this.prisma.user.findUnique ({
        where: {
            userName
        }
       })

       if(!user) {
        throw new ForbiddenException("user not found!!");
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
        throw new ForbiddenException(`you are not permitted to assign the role "${role.name}" to a user`);
       }

       await this.prisma.userRole.create({
        data: {
            user: {
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
     
       return (`Role "${role.name}" has been assigned to "${user.userName}"`)
    }


    async revokeRole(roleDto: AssignRoleDto) {
        const { userName, roleName } = roleDto;

        const user = await this.prisma.user.findUnique ({
         where: {
             userName
         }
        })
 
        if(!user) {
         throw new ForbiddenException("user not found!!");
        }
 
        const role = await this.prisma.role.findUnique({
         where: {
             name: roleName
         }
        })
 
        if(!role) {
         throw new ForbiddenException("role not found!!!");
        }

      const userRole = await this.prisma.userRole.findFirst({
        where: {
            userId: user.id,
            roleId: role.id
        }
      })

      if(!userRole) {
        throw new ForbiddenException("no role found for this user!!")
      }

      await this.prisma.userRole.delete({
        where: {
            id: userRole.id
        }
      })



      return (`role revoked!!..."${userName}" is no longer a "${role.name}"`)
    }

    async getUser(userName: string) {
        const userData = await this.prisma.user.findFirst({ where: { userName }, include: { roles: true}});
        console.log('User data:', userData);
        return userData;
      }

}
