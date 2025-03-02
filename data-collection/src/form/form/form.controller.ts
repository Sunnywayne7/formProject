import { Body, Controller, Post, Render, UseGuards } from '@nestjs/common';
import { FormService } from './form.service';
import { FormDto } from '../dto/form.dto';

@Controller('form')
export class FormController {
    constructor(private formService: FormService){}   

    @Post('fill-form')
    @Render('index')
    async createForm(@Body() dto: FormDto){
        const form = await  this.formService.createForm(dto)
        console.log(form)
        return { form }
    }
}

