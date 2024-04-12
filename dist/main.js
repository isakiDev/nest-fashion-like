"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('main');
    app.enableCors({
        origin: ['http://localhost:5173, https://fashion-like-isakidev.netlify.app']
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }));
    const port = process.env.PORT;
    await app.listen(port);
    logger.log(`App listen in port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map