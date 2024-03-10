import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  readonly name: string

  @IsString()
  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(5)
  readonly password: string
}
