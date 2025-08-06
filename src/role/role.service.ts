import { Body, Injectable, Param, ParseUUIDPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create.dto';
import { updateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(@Body() dto: CreateRoleDto) {
    return await this.prisma.role.create({ data: dto });
  }

  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prisma.role.findUnique({ where: { id } });
  }

  async getList(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;

    const [data, total] = [
      await this.prisma.role.findMany({
        skip,
        take: pageSize,
      }),
      await this.prisma.role.count(),
    ];

    return {
      total,
      page,
      list: data,
    };
  }

  async update(id: string, dto: updateRoleDto) {
    return await this.prisma.role.update({
      where: { id },
      data: {
        title: dto.title,
        permissions: dto.permissions,
      },
    });
  }

  async delete(id: string) {
    await this.prisma.role.delete({ where: { id } });
  }
}
