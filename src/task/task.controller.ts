import { JwtAuthGuard } from "@/guards/jwt-auth.guard"
import { PermissionsGuard } from "@/guards/permissions.guard"
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common"
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger"
import { TaskService } from "./task.service"
import { Permissions } from "@/decorators/permissions.decorator"
import { CreateTaskDto } from "./dto/create.dto"
import { TASK_SWAGGER_EXAMPLES } from "@/constants/swagger/task.example"
import { UpdateTaskDto } from "./dto/update.dto"
import { TaskPaginationDto } from "./dto/pagination.dto"

@ApiBearerAuth()
@Controller("task")
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post("create")
  @Permissions("Task:Create")
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto)
  }

  @Get("list")
  getList(@Query() query: TaskPaginationDto) {
    return this.taskService.getList(
      query.page,
      query.pageSize,
      query.searchText,
      query.projectId,
      query.userId
    )
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    required: true,
    type: String,
    format: "uuid",
    example: TASK_SWAGGER_EXAMPLES.UUID,
  })
  getById(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.taskService.getById(id)
  }

  @Patch(":id")
  @ApiParam({
    name: "id",
    required: true,
    type: String,
    format: "uuid",
    example: TASK_SWAGGER_EXAMPLES.UUID,
  })
  update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTaskDto
  ) {
    return this.taskService.update(id, dto)
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    required: true,
    type: String,
    format: "uuid",
    example: TASK_SWAGGER_EXAMPLES.UUID,
  })
  @HttpCode(204)
  delete(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.taskService.delete(id)
  }
}
