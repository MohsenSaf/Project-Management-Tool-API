import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { PERMISSIONS_KEY } from "@/decorators/permissions.decorator"

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    )

    const { user } = context.switchToHttp().getRequest()
    if (user?.role === "SUPER_ADMIN") return true

    if (!requiredPermissions) return true

    // user.permissions should be an array of strings from JWT
    return requiredPermissions.every((permission) =>
      user?.permissions?.includes(permission)
    )
  }
}
