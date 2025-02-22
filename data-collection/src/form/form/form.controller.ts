import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FormService } from './form.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { FormDto } from '../dto/form.dto';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('form')
export class FormController {
    constructor(private formService: FormService){}   

    @UseGuards(JwtGuard)
    @Post('fill-form')
    createForm(@GetUser('id') userId: number, @Body() dto: FormDto){
        return this.formService.createForm(userId, dto)
    }

  
}

