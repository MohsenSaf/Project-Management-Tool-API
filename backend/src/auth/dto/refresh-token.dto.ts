import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: '5f956ab3-6c93-44a2-8c10-bb0165afbe40',
    description: 'The ID of the user',
  })
  @IsNotEmpty({ message: 'userId is required' })
  userId: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWR3eHZodnkwMDAwb3RwcjF3ZjI5aHA2IiwiZW1haWwiOiJtb2guc2FmaS4xMzgwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDMwMTU5NCwiZXhwIjoxNzU0OTA2Mzk0fQ.fmzWEKv2TyjOxyCo42TjnDRj-uMqbNcue7BzBGiF1dQ',
    description: 'The refresh token of the user',
  })
  @IsNotEmpty({ message: 'refreshToken is required' })
  refreshToken: string;
}
