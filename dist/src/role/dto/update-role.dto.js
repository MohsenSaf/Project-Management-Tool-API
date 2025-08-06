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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const role_example_1 = require("../../constants/swagger/role.example");
const transformers_1 = require("../../utils/transformers");
class updateRoleDto {
    title;
    permissions;
}
exports.updateRoleDto = updateRoleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: role_example_1.ROLE_SWAGGER_EXAMPLES.TITLE,
        description: 'The title of the role',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(transformers_1.trimString),
    __metadata("design:type", String)
], updateRoleDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: role_example_1.ROLE_SWAGGER_EXAMPLES.ARRAY_OF_STRING,
        description: 'The list of permissions of the role',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(transformers_1.trimStringArray),
    __metadata("design:type", Array)
], updateRoleDto.prototype, "permissions", void 0);
//# sourceMappingURL=update-role.dto.js.map