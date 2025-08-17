import { TASK_SWAGGER_EXAMPLES } from "@/constants/swagger/task.example"
import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsOptional, IsInt, Min, IsString, IsUUID } from "class-validator"

export class TaskPaginationDto {
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

  @ApiPropertyOptional({
    example: TASK_SWAGGER_EXAMPLES.UUID,
  })
  @IsOptional()
  @IsUUID()
  projectId: string

  @ApiPropertyOptional({
    example: TASK_SWAGGER_EXAMPLES.UUID,
  })
  @IsOptional()
  @IsUUID()
  userId: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  searchText?: string
}
