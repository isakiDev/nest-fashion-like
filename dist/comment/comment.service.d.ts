import { Repository } from 'typeorm';
import { PostService } from '../post/post.service';
import { Comment } from './entities/comment.entity';
import { type User } from '../auth/entities/user.entity';
import { type CreateCommentDto } from './dtos/create-comment.dto';
export declare class CommentService {
    private readonly commentRepository;
    private readonly postService;
    constructor(commentRepository: Repository<Comment>, postService: PostService);
    create(postId: number, user: User, createCommentDto: CreateCommentDto): Promise<{
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
