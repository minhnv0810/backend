import { z } from 'zod';

export function validateConfig<T extends z.ZodTypeAny>(schema: T) {
  return (config: Record<string, unknown>): z.infer<T> => {
    const result = schema.safeParse(config);
    if (!result.success) {
      const formatted = result.error.errors
        .map((e) => `  ${e.path.join('.')}: ${e.message}`)
        .join('\n');
      throw new Error(`Config validation failed:\n${formatted}`);
    }
    return result.data;
  };
}
