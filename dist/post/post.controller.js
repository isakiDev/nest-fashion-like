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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const post_service_1 = require("./post.service");
const dto_1 = require("./dto");
const decorators_1 = require("../auth/decorators");
const user_entity_1 = require("../auth/entities/user.entity");
const common_2 = require("../common");
const interfaces_1 = require("../auth/interfaces");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async createPost(createPostDto, user, file) {
        return await this.postService.create(createPostDto, user, file);
    }
    async findPosts(paginationDto) {
        return await this.postService.findAll(paginationDto);
    }
    async deletePost(id) {
        await this.postService.delete(+id);
    }
    async updatePost(id, user, updatePostDto) {
        return await this.postService.update(id, updatePostDto, user);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        fileIsRequired: true,
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: /^image\/(jpeg|png|jpg|gif)$/ })
        ]
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePostDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaginationDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findPosts", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, decorators_1.Auth)(interfaces_1.ValidRoles.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, decorators_1.Auth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, decorators_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User,
        dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map