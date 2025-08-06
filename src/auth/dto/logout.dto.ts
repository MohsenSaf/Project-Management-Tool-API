import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNotEmpty } from 'class-validator';

export class LogoutDto {
  @ApiProperty({
    example: 'b4b7b967-c3a8-43cd-96ee-f5c501c613a7',
    description: 'The ID of the user',
  })
  @IsNotEmpty({ message: 'userId is required' })
  userId: string;
}
