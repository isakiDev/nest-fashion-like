import { Repository } from 'typeorm';
import { Reaction } from '../reaction/entities/reaction.entity';
import { type User } from '../auth/entities/user.entity';
import { PostService } from '../post/post.service';
import { type CreateReactionDto } from './dtos/create-interaction.dto';
export declare class ReactionService {
    private readonly reactionRepository;
    private readonly postService;
    constructor(reactionRepository: Repository<Reaction>, postService: PostService);
    findOne(postId: number, user: User): Promise<Reaction>;
    handlePostReaction(postId: number, user: User, createReactionDto: CreateReactionDto): Promise<{
        id: number;
        type: import("./interfaces/reaction.interface").TypeReaction;
    } | {
        id?: undefined;
        type?: undefined;
    }>;
}
