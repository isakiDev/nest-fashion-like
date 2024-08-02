/// <reference types="multer" />
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { User } from '../auth/entities/user.entity';
import { PaginationDto } from '../common';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(createPostDto: CreatePostDto, user: User, file: Express.Multer.File): Promise<import("./entities/post.entity").Post>;
    findPosts(paginationDto: PaginationDto): Promise<import("./entities/post.entity").Post[]>;
    deletePost(id: number): Promise<void>;
    updatePost(id: number, user: User, updatePostDto: UpdatePostDto): Promise<{
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
