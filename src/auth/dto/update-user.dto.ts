import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  readonly name?: string

  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email?: string

  @IsString()
  @MinLength(6)
  @IsOptional()
    password?: string
}
