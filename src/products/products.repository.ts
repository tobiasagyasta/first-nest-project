import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsRepository {
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'Wireless Mouse',
      price: 25.99,
      description: 'Ergonomic wireless mouse',
      stock: 40,
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      price: 79.99,
      description: 'RGB mechanical keyboard',
      stock: 25,
    },
    {
      id: 3,
      name: 'USB-C Hub',
      price: 39.5,
      description: '6-in-1 USB-C hub',
      stock: 30,
    },
  ];

  private nextId = this.products.length + 1;

  create(createProductDto: CreateProductDto): Product {
    const product: Product = {
      id: this.nextId++,
      ...createProductDto,
    };

    this.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto): Product | undefined {
    const product = this.findOne(id);

    if (!product) {
      return undefined;
    }

    Object.assign(product, updateProductDto);
    return product;
  }

  remove(id: number): Product | undefined {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      return undefined;
    }

    const [deletedProduct] = this.products.splice(index, 1);
    return deletedProduct;
  }
}
