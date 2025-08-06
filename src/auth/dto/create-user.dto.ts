import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: "user@example.com",
    description: "The email address of the user",
  })
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string

  @ApiProperty({
    example: "strongpassword123",
    description: "The password of the user (min 6 characters)",
  })
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters" })
  password: string

  @ApiProperty({
    example: "John Doe",
    description: "The full name of the user",
  })
  @IsNotEmpty({ message: "Name is required" })
  name: string
}
