import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.create(createProductDto);
    const createdProduct = await this.productRepository.save(product);

    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ product_id: id });
    if (!product)
      throw new NotFoundException('Product you are looking for not exists.');

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.findOne(id);

    await this.productRepository.update(
      { product_id: id },
      { ...updateProductDto },
    );

    return await this.findOne(id);
  }

  async remove(id: number): Promise<Product> {
    const product = await this.findOne(id);

    await this.productRepository.delete({ product_id: id });

    return product;
  }
}
