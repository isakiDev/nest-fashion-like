import { IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  readonly name?: string

  @IsString()
  @MinLength(5)
  @IsOptional()
    currentPassword?: string

  @IsString()
  @MinLength(5)
  @IsOptional()
    newPassword?: string
}
