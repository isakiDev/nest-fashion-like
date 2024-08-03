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
exports.ReactionController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const reaction_service_1 = require("./reaction.service");
const decorators_1 = require("../auth/decorators");
const user_entity_1 = require("../auth/entities/user.entity");
const create_interaction_dto_1 = require("./dtos/create-interaction.dto");
let ReactionController = class ReactionController {
    constructor(reactionService) {
        this.reactionService = reactionService;
    }
    async handlePostReaction(postId, user, createReactionDto) {
        return await this.reactionService.handlePostReaction(postId, user, createReactionDto);
    }
};
exports.ReactionController = ReactionController;
__decorate([
    (0, common_1.Post)('/:postId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __param(1, (0, decorators_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User,
        create_interaction_dto_1.CreateReactionDto]),
    __metadata("design:returntype", Promise)
], ReactionController.prototype, "handlePostReaction", null);
exports.ReactionController = ReactionController = __decorate([
    (0, common_1.Controller)('reaction'),
    __metadata("design:paramtypes", [reaction_service_1.ReactionService])
], ReactionController);
//# sourceMappingURL=reaction.controller.js.map