import { IsNotEmpty, IsString } from "class-validator";

export class AssignRoleDto{
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    roleName: string;
}