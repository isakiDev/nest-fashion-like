import { IsOptional, IsString } from 'class-validator'

export class CreatePostDto {
  @IsString()
  readonly description: string

  @IsString()
  @IsOptional()
  readonly image?: string
}
