"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClientExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaClientExceptionFilter = class PrismaClientExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let message = 'Database error';
        let statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        switch (exception.code) {
            case 'P2002':
                message = `Unique constraint failed on field: ${exception.meta?.target}`;
                statusCode = common_1.HttpStatus.CONFLICT;
                break;
            case 'P2025':
                message = `Record not found`;
                statusCode = common_1.HttpStatus.NOT_FOUND;
                break;
            case 'P2003':
                message = `Foreign key constraint failed`;
                statusCode = common_1.HttpStatus.BAD_REQUEST;
                break;
            default:
                message = `Prisma error: ${exception.message}`;
                break;
        }
        response.status(statusCode).json({
            statusCode,
            message,
            error: 'PrismaClientKnownRequestError',
        });
    }
};
exports.PrismaClientExceptionFilter = PrismaClientExceptionFilter;
exports.PrismaClientExceptionFilter = PrismaClientExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaClientExceptionFilter);
//# sourceMappingURL=prisma-client-exceptions.filter.js.map