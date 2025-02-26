import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FormService } from './form.service';
import { FormDto } from '../dto/form.dto';

@Controller('form')
export class FormController {
    constructor(private formService: FormService){}   

    @Post('fill-form')
    createForm(@Body() dto: FormDto){
        return this.formService.createForm(dto)
    }
}

