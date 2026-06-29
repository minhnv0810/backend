// Set dummy env vars so @nestjs/config validation passes at module load time.
// Real values are overridden in beforeAll() after Testcontainers start.
process.env['DATABASE_URL'] ??= 'postgresql://postgres:postgres@localhost:5432/placeholder';
process.env['RABBITMQ_URL'] ??= 'amqp://localhost';
process.env['PRODUCT_SERVICE_URL'] ??= 'http://localhost:3002';
process.env['NODE_ENV'] ??= 'test';
