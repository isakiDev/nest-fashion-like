import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from '../common';
import { User } from './entities/user.entity';
import { EmailService } from '../email/email.service';
export declare class AuthController {
    private readonly authService;
    private readonly emailService;
    constructor(authService: AuthService, emailService: EmailService);
    createUser(createUserDto: CreateUserDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
        };
        token: string;
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
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
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
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
    getUsers(paginationDto: PaginationDto): Promise<User[]>;
    deleteUser(id: string): Promise<void>;
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
    verifyUserEmail(token: string): Promise<{
        message: string;
        statusCode: number;
    }>;
}
