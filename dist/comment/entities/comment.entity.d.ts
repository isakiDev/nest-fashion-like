import { User } from '../../auth/entities/user.entity';
import { Post } from '../../post/entities/post.entity';
export declare class Comment {
    readonly id: number;
    readonly comment: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    user: User;
    post: Post;
}
