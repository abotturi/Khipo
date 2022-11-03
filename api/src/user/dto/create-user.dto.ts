import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsEmail } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    readonly first_name: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly last_name?: string

    @ApiProperty()
    @IsEmail()
    readonly email: string

    @ApiProperty()
    @IsString()
    password: string
}
