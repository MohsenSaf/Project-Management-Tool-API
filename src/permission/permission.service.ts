import { Body, Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreatePermissionDto } from "./dto/create.dto"
import { UpdatePermissionDto } from "./dto/update.dto"

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

  async getList(page: number, pageSize: number) {
    if (!pageSize) {
      const allData = await this.prisma.permission.findMany({
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
        skip,
        take: pageSize,
        include: { roles: true },
      }),
      await this.prisma.permission.count(),
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
