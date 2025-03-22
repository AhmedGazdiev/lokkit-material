import { ImageUpload } from '@core/services/upload-images.service';
import { User } from './user';

export interface Post {
    images: ImageUpload[];
    likes: [];
    comments: [];
    _id: string;
    content: string;
    user: User;
    createdAt: string;
    updatedAt: string;
    __v: 0;
}

export interface PostResponse {
    msg: string;
    post: Post;
}

export interface GetPostsResponse {
    msg: string;
    result: number;
    posts: Post[];
}
