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

import { PermissionService } from "./permission.service"
import { Permissions } from "@/decorators/permissions.decorator"
import { CreatePermissionDto } from "./dto/create.dto"
import { JwtAuthGuard } from "@/guards/jwt-auth.guard"
import { PermissionsGuard } from "@/guards/permissions.guard"
import { PaginationRoleDto } from "./dto/paganation.dto"
import { PERMISSION_SWAGGER_EXAMPLES } from "@/constants/swagger/permission.example"
import { UpdatePermissionDto } from "./dto/update.dto"

@ApiBearerAuth()
@Controller("permission")
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post("create")
  @Permissions("Permission:Create")
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionService.create(dto)
  }

  @Get("list")
  @Permissions("Permission:List")
  getList(@Query() query: PaginationRoleDto) {
    return this.permissionService.getList(query.page, query.pageSize)
  }

  @Get(":id")
  @Permissions("Permission:Get")
  @ApiParam({
    name: "id",
    required: true,
    type: String,
    format: "uuid",
    example: PERMISSION_SWAGGER_EXAMPLES.UUID,
  })
  getById(@Param("id") id: string) {
    return this.permissionService.getById(id)
  }

  @Patch(":id")
  @Permissions("Permission:Update")
  @ApiParam({
    name: "id",
    required: true,
    type: String,
    format: "uuid",
    example: PERMISSION_SWAGGER_EXAMPLES.UUID,
  })
  update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePermissionDto
  ) {
    return this.permissionService.update(id, dto)
  }

  @Delete(":id")
  @HttpCode(204)
  delete(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.permissionService.delete(id)
  }
}
