import { Controller, Delete, Get, Post, Put, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common';
import { identity } from 'rxjs';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor( private _productS: ProductService ){}

    @Get()
    async getAllProducts( @Res() res ){
        const product = await this._productS.getProducts();
        return res.status(HttpStatus.OK).json({
            messsage: 'Product',
            product
        });
    }

    @Get(':id')
    async getSingleProduct( @Res() res, @Param('id') id:string ){
        const product = await this._productS.getProduct(id);

        if( !product ){
            return res.status( HttpStatus.NOT_FOUND ).json({
                statusCode: 404,
                message: 'No found'
            });
        }
        
        return res.status( HttpStatus.OK ).json({
            message: 'Single product',
            product
        });
    }

    @Post('/create')
    async createProduct( @Res() res, @Body() CreateProductDTO: CreateProductDto ){
        const product = await this._productS.createProduct(CreateProductDTO);
        res.status( HttpStatus.OK ).json({
            message: 'Product seccessfully created',
            product: product
        });
    }

    @Put('/update/:id')
    async editProduct( @Res() res, @Param('id') id, @Body() createProduct: CreateProductDto ){
        const updatedProduct = await this._productS.updateProduct(id, createProduct);
        return res.status( HttpStatus.OK ).json({
            message: 'Product updated',
            updatedProduct
        });
    }

    @Delete('/delete/:id')
    async deleteProduct( @Param('id') id, @Res() res ){
        const product = await this._productS.deleteProduct(id);

        res.status( HttpStatus.OK ).json({
            message: 'Product deleted',
            product: product
        });
    }
}
