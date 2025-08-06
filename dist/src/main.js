"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
require("dotenv/config");
const prisma_client_exceptions_filter_1 = require("./common/filters/prisma-client-exceptions.filter");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const apiUrl = process.env.API_URL ?? 'http://localhost:3000';
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Project Management API')
        .setDescription('API documentation for the Project Management Tool')
        .setVersion('1.0')
        .addBearerAuth()
        .addServer(apiUrl, 'Default server')
        .build();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    app.setGlobalPrefix('api');
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    app.useGlobalFilters(new prisma_client_exceptions_filter_1.PrismaClientExceptionFilter());
    const port = parseInt(process.env.PORT ?? '3000', 10);
    await app.listen(port);
}
void bootstrap();
//# sourceMappingURL=main.js.map