import { AgeGroup, BornAgain } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

  
  export class FormDto {
    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => {
      return new Date(value);
    })
    date_time: string;
  
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    surname: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
  
    @IsString()
    @IsNotEmpty()
    whatsapp_no: string;
  
    @IsString()
    @IsNotEmpty()
    house_address: string;
  
    @IsEnum(AgeGroup)
    @IsNotEmpty()
    age_group: AgeGroup;
  
    @IsString()
    @IsNotEmpty()
    birthday: string;
  
    @IsEnum(BornAgain)
    @IsNotEmpty()
    born_again: BornAgain;
  
    @IsString()
    @IsNotEmpty()
    current_church: string;
  
    @IsString()
    @IsNotEmpty()
    born_again_date: string;
  }
  