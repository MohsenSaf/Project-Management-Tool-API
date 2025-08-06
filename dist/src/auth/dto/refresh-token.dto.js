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
exports.RefreshTokenDto = void 0;
const api_property_decorator_1 = require("@nestjs/swagger/dist/decorators/api-property.decorator");
const class_validator_1 = require("class-validator");
class RefreshTokenDto {
    userId;
    refreshToken;
}
exports.RefreshTokenDto = RefreshTokenDto;
__decorate([
    (0, api_property_decorator_1.ApiProperty)({
        example: '5f956ab3-6c93-44a2-8c10-bb0165afbe40',
        description: 'The ID of the user',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'userId is required' }),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "userId", void 0);
__decorate([
    (0, api_property_decorator_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWR3eHZodnkwMDAwb3RwcjF3ZjI5aHA2IiwiZW1haWwiOiJtb2guc2FmaS4xMzgwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDMwMTU5NCwiZXhwIjoxNzU0OTA2Mzk0fQ.fmzWEKv2TyjOxyCo42TjnDRj-uMqbNcue7BzBGiF1dQ',
        description: 'The refresh token of the user',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'refreshToken is required' }),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "refreshToken", void 0);
//# sourceMappingURL=refresh-token.dto.js.map