import { Body, Injectable } from "@nestjs/common"
import { PrismaService } from "@/prisma/prisma.service"
import { CreatePermissionDto } from "./dto/create.dto"
import { UpdatePermissionDto } from "./dto/update.dto"
import { Prisma } from "@prisma/client"

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async create(@Body() dto: CreatePermissionDto) {
    const newPermission = await this.prisma.permission.create({
      data: {
        title: dto.title,
        description: dto.description,
        roles: {
          connect: dto.roles?.map((id) => ({ id })),
        },
      },
      include: {
        roles: true,
      },
    })

    await this.prisma.role.update({
      where: {
        title: "Admin",
      },
      data: {
        permissions: {
          connect: { id: newPermission.id },
        },
      },
    })

    return newPermission
  }

  async getById(id: string) {
    return await this.prisma.permission.findUnique({
      where: { id },
      include: { roles: true },
    })
  }

  async getList(page: number, pageSize: number, searchText?: string) {
    const where: Prisma.PermissionWhereInput = searchText
      ? {
          OR: [
            { title: { contains: searchText, mode: "insensitive" as const } },
            {
              description: {
                contains: searchText,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}

    if (!pageSize) {
      const allData = await this.prisma.permission.findMany({
        where,
        include: { roles: true },
      })

      return {
        total: allData.length,
        page: 1,
        list: allData,
      }
    }

    const skip = (page - 1) * pageSize

    const [data, total] = [
      await this.prisma.permission.findMany({
        where,
        skip,
        take: pageSize,
        include: { roles: true },
      }),
      await this.prisma.permission.count({
        where,
      }),
    ]

    return {
      total,
      page,
      list: data,
    }
  }

  async update(id: string, dto: UpdatePermissionDto) {
    return await this.prisma.permission.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        roles: {
          connect: dto.roles?.map((id) => ({ id })),
        },
      },
    })
  }

  async delete(id: string) {
    await this.prisma.permission.delete({ where: { id } })
  }
}
