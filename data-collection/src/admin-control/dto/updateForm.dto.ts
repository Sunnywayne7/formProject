import { AgeGroup, BornAgain } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateFormDto {
    @IsDate()
    @IsOptional()
    @Transform(({ value }) => {
      return new Date(value);
    })
    date_time?: string;
  
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsString()
    @IsOptional()
    surname?: string;
  
    @IsEmail()
    @IsOptional()
    email?: string;
  
    @IsString()
    @IsOptional()
    phoneNumber?: string;
  
    @IsString()
    @IsOptional()
    whatsapp_no?: string;
  
    @IsString()
    @IsOptional()
    house_address?: string;
  
    @IsEnum(AgeGroup)
    @IsOptional()
    age_group?: AgeGroup;
  
    @IsString()
    @IsOptional()
    birthday?: string;
  
    @IsEnum(BornAgain)
    @IsOptional()
    born_again?: BornAgain;
  
    @IsString()
    @IsOptional()
    current_church?: string;
  
    @IsString()
    @IsOptional()
    born_again_date?: string;
  }
  
