import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) {}

    @Post('signup')
    signUp(@Body() dto: AuthDto) {
        return this.authservice.signUp(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() dto: AuthDto) {
        return  await this.authservice.signIn(dto)
    }

    @Post('superadm1n-signup')
    superAdminSignUp(@Body() dto: AuthDto){
        return this.authservice.superAdminSignUp(dto)
    }

    @Post('superadm1n-signin')
    superAdminSignIn(@Body() dto: AuthDto) {
        return this.authservice.superAdminSignIn(dto)
    }
}
