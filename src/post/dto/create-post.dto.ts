import { IsString } from 'class-validator'

export class CreatePostDto {
  @IsString()
  readonly description: string
}
