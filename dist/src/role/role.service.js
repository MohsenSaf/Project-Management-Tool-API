"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const create_dto_1 = require("./dto/create.dto");
let RoleService = class RoleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return await this.prisma.role.create({ data: dto });
    }
    async getById(id) {
        return await this.prisma.role.findUnique({ where: { id } });
    }
    async getList(page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const [data, total] = [
            await this.prisma.role.findMany({
                skip,
                take: pageSize,
            }),
            await this.prisma.role.count(),
        ];
        return {
            total,
            page,
            list: data,
        };
    }
    async update(id, dto) {
        return await this.prisma.role.update({
            where: { id },
            data: {
                title: dto.title,
                permissions: dto.permissions,
            },
        });
    }
    async delete(id) {
        await this.prisma.role.delete({ where: { id } });
    }
};
exports.RoleService = RoleService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RoleService.prototype, "create", null);
__decorate([
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleService.prototype, "getById", null);
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoleService);
//# sourceMappingURL=role.service.js.map