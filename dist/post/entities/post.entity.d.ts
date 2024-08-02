import { User } from '../../auth/entities/user.entity';
import { Reaction } from '../../reaction/entities/reaction.entity';
import { Comment } from '../../comment/entities/comment.entity';
export declare class Post {
    readonly id: number;
    readonly description: string;
    readonly image?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    user: User;
    reactions: Reaction[];
    comments: Comment[];
}
