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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let PostService = class PostService {
    constructor(postRespository, cloudinaryService) {
        this.postRespository = postRespository;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createPostDto, user, file) {
        const { secure_url: imageUrl } = await this.cloudinaryService.uploadFile(file, 'fashion-like');
        const post = this.postRespository.create({
            ...createPostDto,
            user,
            image: imageUrl
        });
        return await this.postRespository.save(post);
    }
    async findAll(paginationDto) {
        const { limit = 5, offset = 0 } = paginationDto;
        const posts = await this.postRespository.find({
            take: limit,
            skip: offset,
            relations: ['user', 'comments', 'comments.user', 'reactions', 'reactions.user'],
            select: {
                user: { id: true, name: true, email: true, image: true },
                reactions: { id: true, type: true, user: { id: true, name: true } },
                comments: { id: true, comment: true, user: { id: true, name: true, email: true, image: true } }
            },
            order: { createdAt: 'DESC' }
        });
        return posts;
    }
    async findOne(id) {
        const post = await this.postRespository.findOneBy({ id });
        if (!post)
            throw new common_1.NotFoundException(`Post with id ${id} not found`);
        return post;
    }
    async delete(id) {
        const { image } = await this.findOne(id);
        const imageId = image.split('/').at(-1).split('.').at(0);
        await this.postRespository.delete(id);
        await this.cloudinaryService.deleteFile(imageId, 'fashion-like');
    }
    async update(id, updatePostDto, user) {
        const post = await this.postRespository.findOne({
            where: { id },
            relations: ['user'],
            select: ['user']
        });
        if (user.id !== post.user.id)
            throw new common_1.UnauthorizedException('The post does not belong to this user');
        const updatedPost = {
            ...post,
            ...updatePostDto,
            updatedAt: new Date(Date.now()).toISOString()
        };
        await this.postRespository.save(updatedPost);
        delete updatedPost.user;
        return updatedPost;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService])
], PostService);
//# sourceMappingURL=post.service.js.map