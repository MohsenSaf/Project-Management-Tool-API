import { PROJECT_SWAGGER_EXAMPLES } from "@/constants/swagger/project.example"
import { trimString } from "@/utils/transformers"
import { ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsArray, IsDateString, IsOptional, IsString } from "class-validator"

export class  UpdateProjectDto {
  @ApiPropertyOptional({
    example: PROJECT_SWAGGER_EXAMPLES.TITLE,
  })
  @IsOptional()
  @IsString()
  @Transform(trimString)
  title?: string

  @ApiPropertyOptional({
    example: PROJECT_SWAGGER_EXAMPLES.DESCRIPTION,
  })
  @IsOptional()
  @IsString()
  @Transform(trimString)
  description?: string

  @ApiPropertyOptional({
    example: PROJECT_SWAGGER_EXAMPLES.ARRAY_OF_UUID,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  taskIds?: string[]

  @ApiPropertyOptional({
    example: PROJECT_SWAGGER_EXAMPLES.DATE,
  })
  @IsOptional()
  @IsDateString()
  endTime?: string
}
