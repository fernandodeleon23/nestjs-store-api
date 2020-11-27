import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductI } from './interfaces/product.interface';
import { CreateProductDto } from './dto/product.dto';
import { ProductController } from './product.controller';

@Injectable()
export class ProductService {

    constructor(
        @InjectModel('Product') private readonly productModel: Model<ProductI>
    ){}

    async getProducts(): Promise<ProductI[]>{
        const products = await this.productModel.find();
        return products;
    }

    async getProduct(productID:string): Promise<ProductI>{

        let product: ProductI;

        if ( productID.match(/^[0-9a-fA-F]{24}$/) ) {
            
            // Yes, it's a valid ObjectId, proceed with `findById` call.
            const the_product = await this.productModel.findById( productID );

            product = the_product;
        }

        return product;
    }

    async createProduct( CreateProductDTO: CreateProductDto ): Promise<ProductI>{
        const newProduct = new this.productModel( CreateProductDTO );
        return await newProduct.save();
    }

    async updateProduct( productID: string, createProductDTO: CreateProductDto ): Promise<ProductI>{
        const updatedProduct = await this.productModel.findByIdAndUpdate( productID, createProductDTO, {new: true} );
        return updatedProduct;
    }

    async deleteProduct( productID: string ): Promise<any>{
        const deleteProdcut = await this.productModel.findByIdAndDelete( productID );
        return deleteProdcut;
    }


}
