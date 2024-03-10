import { IsString, MaxLength, MinLength } from 'class-validator'

export class CreateCommentDto {
  @IsString()
  @MinLength(5)
  // ? use limit to save shorts comments
  @MaxLength(25)
  readonly comment: string
}
