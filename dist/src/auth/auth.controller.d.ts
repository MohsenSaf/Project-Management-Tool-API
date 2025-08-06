import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: CreateUserDto): Promise<{
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        permissions: string[] | undefined;
    }>;
    login(dto: LoginDto): Promise<{
        userId: string;
        username: string;
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        permissions: string[] | undefined;
    }>;
    refresh(dto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(dto: LogoutDto): Promise<{
        message: string;
    }>;
}
