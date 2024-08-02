/// <reference types="multer" />
import { Repository } from 'typeorm';
import { type CreatePostDto } from './dto/create-post.dto';
import { type User } from '../auth/entities/user.entity';
import { Post } from './entities/post.entity';
import { type PaginationDto } from '../common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { type UpdatePostDto } from './dto';
export declare class PostService {
    private readonly postRespository;
    private readonly cloudinaryService;
    constructor(postRespository: Repository<Post>, cloudinaryService: CloudinaryService);
    create(createPostDto: CreatePostDto, user: User, file: Express.Multer.File): Promise<Post>;
    findAll(paginationDto: PaginationDto): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    delete(id: number): Promise<void>;
    update(id: number, updatePostDto: UpdatePostDto, user: User): Promise<{
        updatedAt: string;
        description: string;
        id: number;
        image?: string;
        createdAt?: Date;
        user: User;
        reactions: import("../reaction/entities/reaction.entity").Reaction[];
        comments: import("../comment/entities/comment.entity").Comment[];
    }>;
}
