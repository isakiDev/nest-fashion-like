import { IsOptional, IsPositive, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  readonly limit?: number

  @IsOptional()
  @Min(5)
  @Type(() => Number)
  readonly offset?: number
}
