import { PrismaService } from "@/prisma/prisma.service"
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { CreateProjectDto } from "./dto/create.dto"
import { UpdateProjectDto } from "./dto/update.dto"

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
                name: true,
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
}
