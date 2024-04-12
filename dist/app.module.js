"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const post_module_1 = require("./post/post.module");
const reaction_module_1 = require("./reaction/reaction.module");
const comment_module_1 = require("./comment/comment.module");
const email_module_1 = require("./email/email.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            typeorm_1.TypeOrmModule.forRoot({
                ssl: process.env.STAGE === 'prod',
                extra: {
                    ssl: process.env.STAGE !== 'prod'
                        ? { rejectUnauthorized: false }
                        : null
                },
                type: 'postgres',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                database: process.env.DB_NAME,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                autoLoadEntities: true,
                synchronize: true
            }),
            auth_module_1.AuthModule,
            post_module_1.PostModule,
            reaction_module_1.ReactionModule,
            comment_module_1.CommentModule,
            email_module_1.EmailModule,
            cloudinary_module_1.CloudinaryModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map