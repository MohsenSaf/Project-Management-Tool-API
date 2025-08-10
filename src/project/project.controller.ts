import { Permissions } from "@/decorators/permissions.decorator"
import { JwtAuthGuard } from "@/guards/jwt-auth.guard"
import { PermissionsGuard } from "@/guards/permissions.guard"
import { SystemRolesGuard } from "@/guards/systemRoles.guard"
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
  Req,
  UseGuards,
} from "@nestjs/common"
import { CreateProjectDto } from "./dto/create.dto"
import { ProjectService } from "./project.service"
import { inviteToProjectMemberDto } from "../project-member/dto/inviteTo.dto"
import { ProjectMemberService } from "@/project-member/project-member.service"
import { InvitationStatusProjectMemberDto } from "@/project-member/dto/invitationStatus.dto"
import { UpdateProjectDto } from "./dto/update.dto"
import { PaginationProjectDto } from "./dto/pagination.dto"
import { ApiBearerAuth } from "@nestjs/swagger"
import { ProjectRoleGuard } from "@/guards/projectRole.guard"
import { ProjectRole } from "@/decorators/projecetRole.decorator"

@ApiBearerAuth()
@Controller("project")
@UseGuards(JwtAuthGuard, SystemRolesGuard, PermissionsGuard)
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private projectMember: ProjectMemberService
  ) {}

  @Post("create")
  // @Permissions("Project:Create")
  create(@Body() dto: CreateProjectDto, @Req() req) {
    const userId: string = req.user.userId
    return this.projectService.create(dto, userId)
  }

  @UseGuards(ProjectRoleGuard)
  @Post("invite")
  @ProjectRole("ADMIN")
  @Permissions("Project:Invite")
  inviteToProject(@Body() dto: inviteToProjectMemberDto, @Req() req) {
    const userId: string = req.user.userId
    return this.projectMember.inviteToProject(dto, userId)
  }

  @Patch(":projectId/invitations/status")
  @ProjectRole("ADMIN")
  changeInvitationStatus(
    @Body() dto: InvitationStatusProjectMemberDto,
    @Req() req,
    @Param("projectId", new ParseUUIDPipe()) projectId: string
  ) {
    const userId: string = req.user.userId
    return this.projectMember.changeInvitationStatus(dto, projectId, userId)
  }

  @Patch("update/:projectId")
  @ProjectRole("ADMIN")
  update(
    @Body() dto: UpdateProjectDto,
    @Req() req,
    @Param("projectId", new ParseUUIDPipe()) projectId: string
  ) {
    const userId: string = req.user.userId
    return this.projectService.update(dto, userId, projectId)
  }

  @Get("list")
  getList(@Query() query: PaginationProjectDto) {
    return this.projectService.getList(
      query.page,
      query.pageSize,
      query.searchText
    )
  }

  @Get(":projectId")
  getById(@Param("projectId", new ParseUUIDPipe()) projectId: string) {
    return this.projectService.getById(projectId)
  }

  @Delete(":projectId")
  @ProjectRole("OWNER")
  @HttpCode(204)
  delete(@Param("projectId", new ParseUUIDPipe()) projectId: string) {
    return this.projectService.delete(projectId)
  }
}
