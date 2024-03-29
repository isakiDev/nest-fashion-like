import { IsEnum } from 'class-validator'
import { TypeReaction } from '../interfaces/reaction.interface'

export class CreateReactionDto {
  @IsEnum(TypeReaction)
  readonly type: TypeReaction
}
