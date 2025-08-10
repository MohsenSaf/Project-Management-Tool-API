import { PrismaService } from "@/prisma/prisma.service"
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { CreateProjectDto } from "./dto/create.dto"
import { UpdateProjectDto } from "./dto/update.dto"
import { Prisma } from "@prisma/client"

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProjectDto, currentUserId: string) {
    return await this.prisma.project.create({
      data: {
        title: dto.title,
        description: dto.description,
        endTime: dto.endDate,
        members: {
          create: [
            {
              userId: currentUserId,
              role: "OWNER",
            },
          ],
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        members: {
          select: {
            role: true,
            user: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
        },
      },
    })
  }

  async update(dto: UpdateProjectDto, userId: string, projectId: string) {
    const member = await this.prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    })

    if (!member) {
      throw new NotFoundException("Project Not Found")
    }

    if (member && member.role !== "OWNER") {
      throw new ForbiddenException("Only project owner can update project ")
    }

    return await this.prisma.project.update({
      where: { id: projectId },
      data: {
        title: dto.title,
        description: dto.description,
        endTime: dto.endTime,
        tasks: {
          connect: dto.taskIds?.map((id) => ({ id })),
        },
      },
      include: {
        tasks: true,
      },
    })
  }

  async getById(projectId: string) {
    return await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        members: true,
        tasks: true,
      },
    })
  }

  async getList(page: number, pageSize: number, searchText?: string) {
    const where: Prisma.ProjectWhereInput = searchText
      ? {
          OR: [
            { title: { contains: searchText, mode: "insensitive" as const } },
            {
              members: {
                some: {
                  OR: [
                    {
                      userId: {
                        contains: searchText,
                        mode: "insensitive",
                      },
                    },
                    {
                      user: {
                        username: {
                          contains: searchText,
                          mode: "insensitive",
                        },
                      },
                    },
                  ],
                },
              },
              tasks: {
                some: {
                  OR: [
                    { id: { contains: searchText, mode: "insensitive" } },
                    {
                      title: {
                        contains: searchText,
                        mode: "insensitive",
                      },
                    },
                  ],
                },
              },
            },
          ],
        }
      : {}

    if (!pageSize) {
      const allData = await this.prisma.project.findMany({
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
      await this.prisma.project.findMany({
        where,
        skip,
        take: pageSize,
        select: {
          id: true,
          title: true,
          description: true,
          tasks: {
            select: {
              id: true,
              title: true,
              priority: true,
            },
          },
          members: {
            select: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
              role: true,
            },
          },
        },
      }),
      await this.prisma.project.count({
        where,
      }),
    ]

    return {
      total,
      page,
      list: data,
    }
  }

  async delete(projectId: string) {
    return await this.prisma.project.delete({
      where: {
        id: projectId,
      },
    })
  }
}
