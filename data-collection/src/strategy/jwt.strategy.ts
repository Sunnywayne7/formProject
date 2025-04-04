import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private config: ConfigService, private prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('SECRET')
        })
    }

    async validate(payload: {sub: number, email: string}){
        const user = await this.prisma.admin.findUnique({
            where: {
                id: payload.sub
            },
            include: { roles: { include: { role: true }} }
        })
        delete user.hash;
        return user;

    }
    
}
