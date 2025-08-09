import { PROJECT_SWAGGER_EXAMPLES } from "@/constants/swagger/project.example"
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsString } from "class-validator"

export class InvitationStatusProjectMemberDto {
  @ApiProperty({
    example: PROJECT_SWAGGER_EXAMPLES.BOOLEAN,
  })
  @IsBoolean()
  accept: boolean
}
