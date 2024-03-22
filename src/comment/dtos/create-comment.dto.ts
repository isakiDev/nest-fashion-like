import { IsString, MaxLength } from 'class-validator'

export class CreateCommentDto {
  @IsString()

  // ? use limit to save shorts comments
  @MaxLength(25)
  readonly comment: string
}
