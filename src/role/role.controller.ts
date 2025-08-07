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
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create.dto';
import { JwtAuthGuard } from "@/guards/jwt-auth.guard"
import { RolesGuard } from "@/guards/roles.guard"
import { Role } from "@/decorators/role.decorator"
import { PermissionsGuard } from "@/guards/permissions.guard"
import { PaginationRoleDto } from './dto/pagination.dto';
import { updateRoleDto } from './dto/update-role.dto';
import { ROLE_SWAGGER_EXAMPLES } from "@/constants/swagger/role.example"

@ApiBearerAuth()
@Controller('role')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  @Role('Admin')
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get('list')
  getList(@Query() query: PaginationRoleDto) {
    return this.roleService.getList(query.page, query.pageSize);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    format: 'uuid',
    example: ROLE_SWAGGER_EXAMPLES.UUID,
  })
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.roleService.getById(id);
  }

  @Patch(':id')
  @Role('Admin')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    format: 'uuid',
    example: ROLE_SWAGGER_EXAMPLES.UUID,
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: updateRoleDto,
  ) {
    return this.roleService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.roleService.delete(id);
  }
}
