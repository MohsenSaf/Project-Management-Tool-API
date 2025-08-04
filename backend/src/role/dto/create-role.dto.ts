import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @ApiProperty({
    example: 'role',
    description: 'The title of the role',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: ['role'],
    description: 'The list of permissions of the role',
  })
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
