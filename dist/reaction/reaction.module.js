"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reaction_service_1 = require("./reaction.service");
const reaction_controller_1 = require("./reaction.controller");
const reaction_entity_1 = require("./entities/reaction.entity");
const auth_module_1 = require("../auth/auth.module");
const post_module_1 = require("../post/post.module");
let ReactionModule = class ReactionModule {
};
exports.ReactionModule = ReactionModule;
exports.ReactionModule = ReactionModule = __decorate([
    (0, common_1.Module)({
        controllers: [reaction_controller_1.ReactionController],
        providers: [reaction_service_1.ReactionService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([reaction_entity_1.Reaction]),
            auth_module_1.AuthModule,
            post_module_1.PostModule
        ]
    })
], ReactionModule);
//# sourceMappingURL=reaction.module.js.map