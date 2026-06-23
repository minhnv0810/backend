import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export interface UserFixture {
  id: string;
  email: string;
  displayName: string;
  password: string;
  roles: string[];
}

export function buildUserFixture(overrides: Partial<UserFixture> = {}): UserFixture {
  return {
    id: uuidv4(),
    email: faker.internet.email(),
    displayName: faker.person.fullName(),
    password: 'Password123!',
    roles: ['customer'],
    ...overrides,
  };
}
