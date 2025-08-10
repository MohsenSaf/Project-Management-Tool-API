import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signup(@Body() dto: CreateUserDto) {
    const userRole = await this.authService["prisma"].role.findUnique({
      where: { title: "User" },
      include: {
        permissions: true,
      },
    })

    const hashedPassword = await this.authService.hashPassword(dto.password)
    const user = await this.authService["prisma"].user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        username: dto.username,
        role: {
          connect: { id: userRole?.id },
        },
      },
    })

    const tokens = await this.authService.generateTokens(user.id, user.email)
    await this.authService.updateRefreshToken(user.id, tokens.refreshToken)

    return { tokens, permissions: userRole?.permissions }
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validator(
      loginDto.password,
      loginDto.email,
      loginDto.username
    )

    const permissions = await this.authService["prisma"].role
      .findUnique({
        where: { id: user.roleId },
        include: { permissions: true },
      })
      .then((role) => role?.permissions)

    const tokens = await this.authService.generateTokens(user.id, user.email)

    await this.authService.updateRefreshToken(user.id, tokens.refreshToken)

    return { userId: user.id, username: user.username, tokens, permissions }
  }

  @Post("refresh")
  async refresh(@Body() dto: RefreshTokenDto) {
    const isValid = await this.authService.validateRefreshToken(
      dto.userId,
      dto.refreshToken
    )
    if (!isValid) throw new UnauthorizedException()

    const tokens = await this.authService.generateTokens(
      dto.userId,
      dto.refreshToken
    )
    await this.authService.updateRefreshToken(dto.userId, tokens.refreshToken)

    return tokens
  }

  @Post("logout")
  async logout(@Body() dto: LogoutDto) {
    await this.authService.removeRefreshToken(dto.userId)
    return { message: "Logged out" }
  }
}
