import { Document } from 'mongoose';

export interface ProductI extends Document{
    readonly title: string;
    readonly description: string;
    readonly imageUrl: string;
    readonly price: number,
    readonly createdAt?: Date;
}