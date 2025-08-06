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
exports.LogoutDto = void 0;
const api_property_decorator_1 = require("@nestjs/swagger/dist/decorators/api-property.decorator");
const class_validator_1 = require("class-validator");
class LogoutDto {
    userId;
}
exports.LogoutDto = LogoutDto;
__decorate([
    (0, api_property_decorator_1.ApiProperty)({
        example: 'b4b7b967-c3a8-43cd-96ee-f5c501c613a7',
        description: 'The ID of the user',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'userId is required' }),
    __metadata("design:type", String)
], LogoutDto.prototype, "userId", void 0);
//# sourceMappingURL=logout.dto.js.map