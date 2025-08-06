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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_service_1 = require("./role.service");
const create_dto_1 = require("./dto/create.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const role_decorator_1 = require("../auth/decorators/role.decorator");
const permissions_guard_1 = require("../auth/guards/permissions.guard");
const pagination_dto_1 = require("./dto/pagination.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const role_example_1 = require("../constants/swagger/role.example");
let RoleController = class RoleController {
    roleService;
    constructor(roleService) {
        this.roleService = roleService;
    }
    create(dto) {
        return this.roleService.create(dto);
    }
    getList(query) {
        return this.roleService.getList(query.page, query.pageSize);
    }
    getById(id) {
        return this.roleService.getById(id);
    }
    update(id, dto) {
        return this.roleService.update(id, dto);
    }
    delete(id) {
        return this.roleService.delete(id);
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, common_1.Post)('create'),
    (0, role_decorator_1.Role)('Admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateRoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationRoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        type: String,
        format: 'uuid',
        example: role_example_1.ROLE_SWAGGER_EXAMPLES.UUID,
    }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_decorator_1.Role)('Admin'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        type: String,
        format: 'uuid',
        example: role_example_1.ROLE_SWAGGER_EXAMPLES.UUID,
    }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_dto_1.updateRoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "delete", null);
exports.RoleController = RoleController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('role'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
//# sourceMappingURL=role.controller.js.map