/// <reference types="multer" />
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { type LoginUserDto, type CreateUserDto, type UpdateUserDto } from './dto';
import { type PaginationDto } from '../common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly cloudinaryService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, cloudinaryService: CloudinaryService);
    create(createUserDto: CreateUserDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
        };
        token: string;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            password: string;
            emailVerified?: boolean;
            isActive?: boolean;
            roles?: string[];
            image?: string;
            emailToken?: string;
            createdAt?: Date;
            updatedAt?: Date;
            post: import("../post/entities/post.entity").Post;
            reaction: import("../reaction/entities/reaction.entity").Reaction;
            comment: import("../comment/entities/comment.entity").Comment;
        };
        token: string;
    }>;
    findAll(paginationDto: PaginationDto): Promise<User[]>;
    findOne(id: string): Promise<User>;
    remove(id: string): Promise<void>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        emailVerified?: boolean;
        isActive?: boolean;
        roles?: string[];
        image?: string;
        emailToken?: string;
        createdAt?: Date;
        updatedAt?: Date;
        post: import("../post/entities/post.entity").Post;
        reaction: import("../reaction/entities/reaction.entity").Reaction;
        comment: import("../comment/entities/comment.entity").Comment;
    } & User>;
    checkAuthStatus(user: User): {
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
            roles: string[];
        };
        token: string;
    };
    verifyUserEmail(emailToken: string): Promise<{
        message: string;
        statusCode: number;
    }>;
    updateProfilePicture(id: string, file: Express.Multer.File): Promise<any>;
    private getJwt;
    private verifyJwt;
    private handleExceptionErrors;
}
