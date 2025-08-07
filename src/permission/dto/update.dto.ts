import { ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsArray, IsOptional, IsString, Matches } from "class-validator"
import { PERMISSION_SWAGGER_EXAMPLES } from "src/constants/swagger/permission.example"

export class UpdatePermissionDto {
  @ApiPropertyOptional({
    example: PERMISSION_SWAGGER_EXAMPLES.TITLE,
    description: "The title of the role",
  })
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z]+:[A-Za-z]+$/, {
    message:
      "Permission title is not in right format.It should be like Role:Create",
  })
  title?: string

  @ApiPropertyOptional({
    example: PERMISSION_SWAGGER_EXAMPLES.DESCRIPTION,
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional({
    example: PERMISSION_SWAGGER_EXAMPLES.ID_OF_ROLES,
    description: "The list of permissions of the role",
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles?: string[]
}
