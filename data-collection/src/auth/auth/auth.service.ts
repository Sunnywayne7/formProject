import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private config: ConfigService, private jwt: JwtService) {}
   
    async signUp(dto: AuthDto) {
        try {
            const hash = await argon.hash(dto.password)
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    userName: dto.userName,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    hash
                }
            })
            return this.signTokens(user.id, user.email);
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002'){
                    throw new ForbiddenException('credentials taken!!!')
                }  else {
                    throw error;
                }
            }

        }
    }
    

    async signIn(dto: AuthDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
                userName: dto.userName
            }  
        })
        if(!user) {
            throw new ForbiddenException('invalid credentials!!!')
        }

        const pwMatches = await argon.verify(user.hash, dto.password)
        if(!pwMatches) {
            throw new ForbiddenException('invalid credentials!!!')    
        }
        return this.signTokens(user.id, user.email);
    }


    async signTokens(userId: number, email: string): Promise<{ access_token: string }>{
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('SECRET')
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        })
        return { access_token: token }
    }

    async superAdminSignUp(dto: AuthDto){
        const superAdminCount = await this.prisma.user.count({
            where: {
              roles: {
                some: {
                  role: {
                    name: 'superAdmin',
                  },
                },
              },
            },
          });
          if (superAdminCount >= 2) {
            throw new ForbiddenException('Access denied!!!')
          }


        await argon.hash(dto.password);
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if(!existingUser) {
            throw new ForbiddenException("you are not registered on this website yet!!!")
        }
        const superAdminRole = await this.prisma.role.findUnique({
            where: { name: 'superAdmin'}
        });

        if(!superAdminRole) {
            throw new ForbiddenException("role not found!!!")
        }

        const superAdmin = await this.prisma.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                roles: {
                    create: {
                        role: {
                            connect: {
                                id: superAdminRole.id
                            }
                        }
                    }
                }
            },
            include: {roles: true}
        })

        return superAdmin;
    }


    async superAdminSignIn(dto: AuthDto) {
        const { email, password } = dto;

        const user = await this.prisma.user.findUnique({
          where: { email },
          include: {
            roles: {
              include: {
                role: true,
              },
            },
          },
        });
      
        if (!user) {
          throw new ForbiddenException('Invalid email or password');
        }
      
      
        const isSuperAdmin = user.roles.some((role) => role.role.name === 'superAdmin');
        if (!isSuperAdmin) {
          throw new ForbiddenException('You do not have super admin privileges');
        }
      
      
        const isValidPassword = await argon.verify(user.hash, password);
        if (!isValidPassword) {
          throw new ForbiddenException('Invalid email or password');
        }
      
      
        return user;
      }
    

    }

