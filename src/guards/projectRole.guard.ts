import { PrismaService } from "@/prisma/prisma.service"
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

@Injectable()
export class ProjectRoleGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const userId = request.user?.id
    const projectId = request.params.projectId // assuming :projectId in route

    if (!userId || !projectId) return false

    const membership = await this.prisma.projectMember.findUnique({
      where: {
        userId_projectId: { userId, projectId },
      },
      select: { role: true },
    })

    if (!membership) return false
    if (membership.role === "OWNER") return true

    // Example: Only OWNER or ADMIN can invite
    return ["OWNER", "ADMIN"].includes(membership.role)
  }
}
