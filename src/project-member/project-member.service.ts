import { PrismaService } from "@/prisma/prisma.service"
import { inviteToProjectMemberDto } from "@/project-member/dto/inviteTo.dto"
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { InvitationStatusProjectMemberDto } from "./dto/invitationStatus.dto"
import { Prisma } from "@prisma/client"

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

  async getListByProjectId(
    projectId: string,
    page: number,
    pageSize: number,
    searchText?: string
  ) {
    const where: Prisma.ProjectMemberWhereInput = searchText
      ? {
          projectId,
          OR: [
            { userId: { contains: searchText, mode: "insensitive" as const } },
            {
              user: {
                OR: [
                  {
                    username: {
                      contains: searchText,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            },
          ],
        }
      : {}

    if (!pageSize) {
      const allData = await this.prisma.projectMember.findMany({
        where,
      })

      return {
        total: allData.length,
        page: 1,
        list: allData,
      }
    }

    const skip = (page - 1) * pageSize

    const [data, total] = [
      await this.prisma.projectMember.findMany({
        where,
        skip,
        take: pageSize,
        select: {
          id: true,
          invitedBy: true,
          joinedAt: true,
          lastActive: true,
          status: true,
          role: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
          project: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      }),
      await this.prisma.projectMember.count({
        where,
      }),
    ]

    return {
      total,
      page,
      list: data,
    }
  }
}
