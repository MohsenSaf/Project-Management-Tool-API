import { PROJECT_SWAGGER_EXAMPLES } from "@/constants/swagger/project.example"
import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsString } from "class-validator"

export class inviteToProjectMemberDto {
  @ApiProperty({
    example: PROJECT_SWAGGER_EXAMPLES.UUID,
  })
  @IsString()
  projectId: string

  @ApiProperty({
    example: PROJECT_SWAGGER_EXAMPLES.ARRAY_OF_UUID,
  })
  @IsArray()
  @IsString({ each: true })
  userIds: string[]
}
