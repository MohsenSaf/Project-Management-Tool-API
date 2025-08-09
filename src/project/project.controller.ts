import { Permissions } from "@/decorators/permissions.decorator"
import { JwtAuthGuard } from "@/guards/jwt-auth.guard"
import { PermissionsGuard } from "@/guards/permissions.guard"
import { RolesGuard } from "@/guards/roles.guard"
import { Body, Controller, Param, Patch, Post, Req, UseGuards } from "@nestjs/common"
import { CreateProjectDto } from "./dto/create.dto"
import { ProjectService } from "./project.service"
import { inviteToProjectMemberDto } from "../project-member/dto/inviteTo.dto"
import { ProjectMemberService } from "@/project-member/project-member.service"
import { InvitationStatusProjectMemberDto } from "@/project-member/dto/invitationStatus.dto"

@Controller("project")
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private projectMember: ProjectMemberService
  ) {}

  @Post("create")
  @Permissions("Project:Create")
  create(@Body() dto: CreateProjectDto, @Req() req) {
    const userId: string = req.user.userId
    return this.projectService.create(dto, userId)
  }

  @Post("invite")
  @Permissions("Project:Invite")
  inviteToProject(@Body() dto: inviteToProjectMemberDto, @Req() req) {
    const userId: string = req.user.userId
    return this.projectMember.inviteToProject(dto, userId)
  }

  @Patch(":projectId/invitations/status")
  changeInvitationStatus(
    @Body() dto: InvitationStatusProjectMemberDto,
    @Req() req,
    @Param("projectId") projectId: string
  ) {
    const userId: string = req.user.userId
    return this.projectMember.changeInvitationStatus(dto, projectId, userId)
  }
}
