import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ROLE_SWAGGER_EXAMPLES } from 'src/constants/swagger/role.example';

export class CreateRoleDto {
  @ApiProperty({
    example: ROLE_SWAGGER_EXAMPLES.TITLE,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: ROLE_SWAGGER_EXAMPLES.ARRAY_OF_STRING,
  })
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
