import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from "class-validator"
import { PERMISSION_SWAGGER_EXAMPLES } from "src/constants/swagger/permission.example"

export class CreatePermissionDto {
  @ApiProperty({
    example: PERMISSION_SWAGGER_EXAMPLES.TITLE,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z]+:[A-Za-z]+$/, {
    message:
      "Permission title is not in right format.It should be like Role:Create",
  })
  title: string

  @ApiPropertyOptional({
    example: PERMISSION_SWAGGER_EXAMPLES.DESCRIPTION,
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional({
    example: PERMISSION_SWAGGER_EXAMPLES.ID_OF_ROLES,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles?: string[]
}
