import { IsString, MinLength } from 'class-validator'

export class CreateCommentDto {
  @IsString()
  @MinLength(5)
  readonly comment: string
}
