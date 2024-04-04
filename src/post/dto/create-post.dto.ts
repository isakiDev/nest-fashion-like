import { IsString, MaxLength } from 'class-validator'

export class CreatePostDto {
  @IsString()
  @MaxLength(100)
  readonly description: string
}
