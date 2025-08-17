import { Injectable } from "@nestjs/common"
import { CreateTaskDto } from "./dto/create.dto"
import { PrismaService } from "@/prisma/prisma.service"
import { UpdateTaskDto } from "./dto/update.dto"
import { Prisma } from "@prisma/client"

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    return await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        dueDate: dto.dueDate,
        status: dto.status,
        priority: dto.priority,
        projectId: dto.projectId,
        assignees: {
          connect: dto.userIds?.map((id) => ({ id })),
        },
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },
        assignees: {
          select: {
            id: true,
            username: true,
            role: {
              select: {
                id: true,
                title: true,
                permissions: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  async getList(
    page: number,
    pageSize: number,
    searchText?: string,
    projectId?: string,
    userId?: string
  ) {
    const where: Prisma.TaskWhereInput = {
      projectId, // always filter by projectId
      ...(searchText && {
        OR: [
          {
            title: { contains: searchText, mode: "insensitive" as const },
          },
          // you can add description or other fields too
        ],
      }),
      ...(userId && {
        assignees: {
          some: {
            id: userId,
          },
        },
      }),
    }

    if (!pageSize) {
      const allData = await this.prisma.task.findMany({
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
      await this.prisma.task.findMany({
        where,
        skip,
        take: pageSize,
        include: {
          project: {
            select: {
              id: true,
              title: true,
            },
          },
          assignees: {
            select: {
              id: true,
              username: true,
              role: {
                select: {
                  id: true,
                  title: true,
                  permissions: {
                    select: {
                      id: true,
                      title: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),
      await this.prisma.task.count({
        where,
      }),
    ]

    return {
      total,
      page,
      list: data,
    }
  }

  async getById(id: string) {
    return await this.prisma.task.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },
        assignees: {
          select: {
            id: true,
            username: true,
            role: {
              select: {
                id: true,
                title: true,
                permissions: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  async update(id: string, dto: UpdateTaskDto) {
    return await this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        dueDate: dto.dueDate,
        status: dto.status,
        priority: dto.priority,
        projectId: dto.projectId,
        assignees: {
          set: dto.userIds?.map((id) => ({ id })),
        },
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },
        assignees: {
          select: {
            id: true,
            username: true,
            role: {
              select: {
                id: true,
                title: true,
                permissions: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  async delete(id: string) {
    return await this.prisma.task.delete({
      where: { id },
    })
  }
}
