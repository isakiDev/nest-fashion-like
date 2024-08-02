import { ReactionService } from './reaction.service';
import { User } from '../auth/entities/user.entity';
import { CreateReactionDto } from './dtos/create-interaction.dto';
export declare class ReactionController {
    private readonly reactionService;
    constructor(reactionService: ReactionService);
    handlePostReaction(postId: number, user: User, createReactionDto: CreateReactionDto): Promise<{
        id: number;
        type: import("./interfaces/reaction.interface").TypeReaction;
    } | {
        id?: undefined;
        type?: undefined;
    }>;
}
