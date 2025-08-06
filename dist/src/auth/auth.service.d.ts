import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    hashPassword(password: string): Promise<any>;
    validator(email: string, password: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        roleId: string;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    generateTokens(userId: string, email: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    updateRefreshToken(userId: string, refreshToken: string): Promise<void>;
    removeRefreshToken(userId: string): Promise<void>;
    validateRefreshToken(userId: string, refreshToken: string): Promise<any>;
}
