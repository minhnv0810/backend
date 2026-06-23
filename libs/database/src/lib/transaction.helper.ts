export type TransactionClient<T> = T & {
  $transaction<R>(fn: (tx: T) => Promise<R>): Promise<R>;
};

export async function withTransaction<T, R>(
  client: TransactionClient<T>,
  fn: (tx: T) => Promise<R>,
): Promise<R> {
  return client.$transaction(fn);
}
