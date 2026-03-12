import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Wireless Mouse' })
  name: string;

  @ApiProperty({ example: 25.99, minimum: 0 })
  price: number;

  @ApiPropertyOptional({ example: 'Ergonomic wireless mouse' })
  description?: string;

  @ApiProperty({ example: 40, minimum: 0 })
  stock: number;
}
