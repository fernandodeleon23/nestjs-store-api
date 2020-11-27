export class CreateProductDto{
    readonly title: string;
    readonly description: string;
    readonly imageUrl: string;
    readonly price: number;
    readonly createdAt?: Date;
}