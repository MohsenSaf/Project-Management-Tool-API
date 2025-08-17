import { TASK_SWAGGER_EXAMPLES } from "@/constants/swagger/task.example"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { TaskPriority, TaskStatus } from "@prisma/client"
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator"

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: TASK_SWAGGER_EXAMPLES.TITLE,
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiPropertyOptional({
    example: TASK_SWAGGER_EXAMPLES.DESCRIPTION,
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional({
    example: TASK_SWAGGER_EXAMPLES.STATUS,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus

  @ApiPropertyOptional({
    example: TASK_SWAGGER_EXAMPLES.PRIORITY,
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority

  @ApiPropertyOptional({
    example: TASK_SWAGGER_EXAMPLES.DUE_DATE,
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string

  @ApiPropertyOptional({
    example: TASK_SWAGGER_EXAMPLES.UUID,
  })
  @IsOptional()
  @IsUUID()
  projectId?: string

  @ApiPropertyOptional({
    example: TASK_SWAGGER_EXAMPLES.ARRAY_OF_UUID,
  })
  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true })
  userIds?: string[]
}
