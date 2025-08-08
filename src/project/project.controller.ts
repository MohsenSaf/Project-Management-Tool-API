import { Permissions } from "@/decorators/permissions.decorator"
import { JwtAuthGuard } from "@/guards/jwt-auth.guard"
import { PermissionsGuard } from "@/guards/permissions.guard"
import { RolesGuard } from "@/guards/roles.guard"
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import { CreateProjectDto } from "./dto/create.dto"
import { ProjectService } from "./project.service"

@Controller("project")
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post("create")
  @Permissions("Project:Create")
  create(@Body() dto: CreateProjectDto, @Req() req) {
    const userId: string = req.user.userId
    return this.projectService.create(dto, userId)
  }
}
