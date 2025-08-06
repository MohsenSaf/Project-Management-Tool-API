import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create.dto';
import { updateRoleDto } from './dto/update-role.dto';
export declare class RoleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateRoleDto): Promise<{
        id: string;
        title: string;
        permissions: string[];
    }>;
    getById(id: string): Promise<{
        id: string;
        title: string;
        permissions: string[];
    } | null>;
    getList(page?: number, pageSize?: number): Promise<{
        total: number;
        page: number;
        list: {
            id: string;
            title: string;
            permissions: string[];
        }[];
    }>;
    update(id: string, dto: updateRoleDto): Promise<{
        id: string;
        title: string;
        permissions: string[];
    }>;
    delete(id: string): Promise<void>;
}
