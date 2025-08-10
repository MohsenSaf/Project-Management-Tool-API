import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import {
  IsEmail,
  IsOptional,
  ValidateIf,
  IsNotEmpty,
  MinLength,
} from "class-validator"

export class LoginDto {
  @ApiPropertyOptional({
    example: "user@example.com",
    description: "Email address of the user",
  })
  @IsOptional()
  @IsEmail({}, { message: "Email must be a valid email address" })
  @ValidateIf((o) => !o.username) // email required if username is empty
  email?: string

  @ApiPropertyOptional({
    example: "username123",
    description: "Username of the user",
  })
  @IsOptional()
  @ValidateIf((o) => !o.email) // username required if email is empty
  @IsNotEmpty({ message: "Username cannot be empty if email is not provided" })
  username?: string

  @ApiProperty({
    example: "strongpassword123",
    description: "Password of the user (min 6 characters)",
  })
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters" })
  password: string
}
