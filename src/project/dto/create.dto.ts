import { PROJECT_SWAGGER_EXAMPLES } from "@/constants/swagger/project.example"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateProjectDto {
  @ApiProperty({
    example: PROJECT_SWAGGER_EXAMPLES.TITLE,
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiPropertyOptional({
    example: PROJECT_SWAGGER_EXAMPLES.DESCRIPTION,
  })
  @IsOptional()
  @IsString()
  description: string
}
