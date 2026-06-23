import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';

export async function startPostgresContainer(dbName = 'test_db'): Promise<StartedTestContainer> {
  return new GenericContainer('postgres:16-alpine')
    .withEnvironment({
      POSTGRES_USER: 'postgres',
      POSTGRES_PASSWORD: 'postgres',
      POSTGRES_DB: dbName,
    })
    .withExposedPorts(5432)
    .withWaitStrategy(Wait.forLogMessage('database system is ready to accept connections'))
    .start();
}

export function getPostgresDatabaseUrl(container: StartedTestContainer, dbName = 'test_db'): string {
  const host = container.getHost();
  const port = container.getMappedPort(5432);
  return `postgresql://postgres:postgres@${host}:${port}/${dbName}`;
}
