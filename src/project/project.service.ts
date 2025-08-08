import { PrismaService } from "@/prisma/prisma.service"
import { Injectable } from "@nestjs/common"
import { CreateProjectDto } from "./dto/create.dto"

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProjectDto, currentUserId: string) {
    return await this.prisma.project.create({
      data: {
        title: dto.title,
        description: dto.description,
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
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })
  }
}
