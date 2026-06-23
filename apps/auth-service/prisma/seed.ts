// eslint-disable-next-line @nx/enforce-module-boundaries
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.upsert({ where: { name: 'customer' }, update: {}, create: { name: 'customer' } });
  await prisma.role.upsert({ where: { name: 'admin' }, update: {}, create: { name: 'admin' } });
  console.log('Seeded roles: customer, admin');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
