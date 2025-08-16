import { JwtAuthGuard } from "@/guards/jwt-auth.guard"
import { Controller, Get, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth } from "@nestjs/swagger"
import { ProjectMemberPaginationDto } from "./dto/pagenation.dto"
import { ProjectMemberService } from "./project-member.service"

@ApiBearerAuth()
@Controller("project-member")
@UseGuards(JwtAuthGuard)
export class ProjectMemberController {
  constructor(private projectMember: ProjectMemberService) {}

  @Get("list")
  getList(@Query() query: ProjectMemberPaginationDto) {
    return this.projectMember.getListByProjectId(
      query.projectId,
      query.page,
      query.pageSize,
      query.searchText
    )
  }
}
