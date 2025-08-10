import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsOptional, IsInt, Min, IsString } from "class-validator"

export class PaginationProjectDto {
  @ApiPropertyOptional({
    description: "Page number (starts from 1)",
    example: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number

  @ApiPropertyOptional({
    description: "Number of items per page",
    example: 10,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  searchText?: string
}
