import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) {}

    @Post('signup')
    signUp(@Body() dto: AuthDto) {
        return this.authservice.signUp(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() dto: AuthDto) {
        return this.authservice.signIn(dto)
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
