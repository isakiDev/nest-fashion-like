import { CommentService } from './comment.service';
import { User } from '../auth/entities/user.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(postId: number, user: User, createCommentDto: CreateCommentDto): Promise<{
        id: number;
        comment: string;
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
        };
    }>;
}
