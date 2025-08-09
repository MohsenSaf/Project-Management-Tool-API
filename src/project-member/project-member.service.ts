import { PrismaService } from "@/prisma/prisma.service"
import { inviteToProjectMemberDto } from "@/project-member/dto/inviteTo.dto"
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { InvitationStatusProjectMemberDto } from "./dto/invitationStatus.dto"

@Injectable()
export class ProjectMemberService {
  constructor(private prisma: PrismaService) {}

  async inviteToProject(dto: inviteToProjectMemberDto, inviterId: string) {
    const invitation = await this.prisma.projectMember.createMany({
      data: dto.userIds.map((userId) => ({
        userId,
        projectId: dto.projectId,
        role: "VIEWER",
        invitedById: inviterId,
        joinedAt: null,
        status: "INVITED",
      })),
      skipDuplicates: true,
    })

    return {
      success: true,
      invitedCount: invitation.count,
    }
  }

  async changeInvitationStatus(
    dto: InvitationStatusProjectMemberDto,
    projectId: string,
    userId: string
  ) {
    const member = await this.prisma.projectMember.findUnique({
      where: {
        userId_projectId: { userId, projectId },
      },
      select: {
        status: true,
      },
    })

    if (!member) {
      throw new NotFoundException("Invitation not found")
    }

    // Prevent changing status if already ACTIVE or DECLINED (locked statuses)
    if (member.status === "ACTIVE" || member.status === "DECLINED") {
      throw new BadRequestException(
        "Invitation status cannot be changed once accepted or declined"
      )
    }

    const updatedMember = await this.prisma.projectMember.update({
      where: {
        userId_projectId: { userId, projectId },
      },
      data: {
        status: dto.accept ? "ACTIVE" : "DECLINED",
        joinedAt: dto.accept ? new Date() : null,
        role: dto.accept ? "MEMBER" : "VIEWER",
      },
      select: {
        status: true,
        project: {
          select: {
            title: true,
            tasks: {
              select: { id: true, title: true },
            },
          },
        },
      },
    })

    return {
      status: updatedMember.status,
      message: dto.accept ? "Invitation accepted" : "Invitation declined",
      project: dto.accept ? updatedMember.project : null,
    }
  }
}
