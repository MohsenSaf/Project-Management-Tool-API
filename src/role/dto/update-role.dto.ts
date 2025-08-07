import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { ROLE_SWAGGER_EXAMPLES } from '@/constants/swagger/role.example';
import { trimString, trimStringArray } from '@/utils/transformers';

export class updateRoleDto {
  @ApiPropertyOptional({
    example: ROLE_SWAGGER_EXAMPLES.TITLE,
    description: 'The title of the role',
  })
  @IsOptional()
  @IsString()
  @Transform(trimString)
  title?: string;

  @ApiPropertyOptional({
    example: ROLE_SWAGGER_EXAMPLES.ARRAY_OF_STRING,
    description: 'The list of permissions of the role',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(trimStringArray)
  permissions?: string[];
}
