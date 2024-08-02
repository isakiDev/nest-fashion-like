import { Reaction } from '../../reaction/entities/reaction.entity';
import { Post } from '../../post/entities/post.entity';
import { Comment } from '../../comment/entities/comment.entity';
export declare class User {
    readonly id: string;
    readonly name: string;
    email: string;
    password: string;
    emailVerified?: boolean;
    isActive?: boolean;
    roles?: string[];
    readonly image?: string;
    emailToken?: string;
    createdAt?: Date;
    readonly updatedAt?: Date;
    post: Post;
    reaction: Reaction;
    comment: Comment;
    checkFieldsInsert(): void;
    checkFieldsUpdate(): void;
}
