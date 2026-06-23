import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export interface ProductFixture {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  stock: number;
  categoryId: string | null;
}

export function buildProductFixture(overrides: Partial<ProductFixture> = {}): ProductFixture {
  return {
    id: uuidv4(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 1, max: 999, dec: 2 }),
    currency: 'USD',
    stock: faker.number.int({ min: 0, max: 100 }),
    categoryId: null,
    ...overrides,
  };
}
