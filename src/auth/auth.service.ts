import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async validator(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException({
        message: "The email or password you entered is incorrect.",
        code: "AUTH_INVALID_CREDENTIALS",
      })
    }
    return user;
  }

  async generateTokens(userId: string, email: string) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
        },
      })

      const payload = {
        sub: userId,
        email,
        role: user?.role?.title ?? "User",
        permissions: user?.role?.permissions?.map((p) => p.title) ?? [],
      }

      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '8h',
        secret: process.env.JWT_ACCESS_SECRET,
      });

      const refreshToken = await this.jwtService.signAsync(
        { sub: userId },
        {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_SECRET,
        },
      );

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedToken },
    });
  }

  async removeRefreshToken(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.refreshToken) return false;

    return bcrypt.compare(refreshToken, user.refreshToken);
  }
}
