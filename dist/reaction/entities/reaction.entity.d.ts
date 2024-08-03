import { User } from '../../auth/entities/user.entity';
import { Post } from '../../post/entities/post.entity';
import { TypeReaction } from '../interfaces/reaction.interface';
export declare class Reaction {
    readonly id: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly type: TypeReaction;
    user: User;
    post: Post;
}
