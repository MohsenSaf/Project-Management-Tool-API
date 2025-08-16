import { PROJECT_SWAGGER_EXAMPLES } from "@/constants/swagger/project.example"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsInt, IsOptional, IsString, Min } from "class-validator"

export class ProjectMemberPaginationDto {
  @ApiProperty({
    example: PROJECT_SWAGGER_EXAMPLES.UUID,
  })
  @IsString()
  projectId: string

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
