import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create.dto';
import { PaginationRoleDto } from './dto/pagination.dto';
import { updateRoleDto } from './dto/update-role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(dto: CreateRoleDto): Promise<{
        id: string;
        title: string;
        permissions: string[];
    }>;
    getList(query: PaginationRoleDto): Promise<{
        total: number;
        page: number;
        list: {
            id: string;
            title: string;
            permissions: string[];
        }[];
    }>;
    getById(id: string): Promise<{
        id: string;
        title: string;
        permissions: string[];
    } | null>;
    update(id: string, dto: updateRoleDto): Promise<{
        id: string;
        title: string;
        permissions: string[];
    }>;
    delete(id: string): Promise<void>;
}
