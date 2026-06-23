import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';

export async function startRabbitMQContainer(): Promise<StartedTestContainer> {
  return new GenericContainer('rabbitmq:3.13-alpine')
    .withExposedPorts(5672)
    .withWaitStrategy(Wait.forLogMessage('Server startup complete'))
    .start();
}

export function getRabbitMQUrl(container: StartedTestContainer): string {
  const host = container.getHost();
  const port = container.getMappedPort(5672);
  return `amqp://guest:guest@${host}:${port}`;
}
