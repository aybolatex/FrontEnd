export interface Post {
    id?: number;
    title: string;
    category: string;
    description: string;
    createdAt: string;
    updatedAt?: string;
    alreadyRead: boolean;
    subTitle: string;
    author: string;
}