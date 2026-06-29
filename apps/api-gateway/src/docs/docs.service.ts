import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface OpenApiSpec {
  openapi?: string;
  paths?: Record<string, unknown>;
  components?: {
    schemas?: Record<string, unknown>;
    securitySchemes?: Record<string, unknown>;
    [key: string]: unknown;
  };
  tags?: Array<{ name: string; description?: string }>;
  security?: unknown[];
}

interface ServiceDef {
  name: string;
  docsUrl: string;
}

@Injectable()
export class DocsService implements OnModuleInit {
  private readonly logger = new Logger(DocsService.name);
  private mergedSpec: Record<string, unknown> | null = null;
  private readonly services: ServiceDef[];

  constructor(private readonly config: ConfigService) {
    this.services = [
      { name: 'Auth', docsUrl: `${this.config.getOrThrow('AUTH_SERVICE_URL')}/docs-json` },
      { name: 'Product', docsUrl: `${this.config.getOrThrow('PRODUCT_SERVICE_URL')}/docs-json` },
      { name: 'Orders', docsUrl: `${this.config.getOrThrow('ORDERS_SERVICE_URL')}/docs-json` },
    ];
  }

  async onModuleInit(): Promise<void> {
    await this.refresh();
  }

  async refresh(): Promise<void> {
    const results = await Promise.allSettled(
      this.services.map(async ({ name, docsUrl }) => {
        const res = await fetch(docsUrl, { signal: AbortSignal.timeout(5_000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return { name, spec: (await res.json()) as OpenApiSpec };
      }),
    );

    this.mergedSpec = this.merge(results);
  }

  getSpec(): Record<string, unknown> | null {
    return this.mergedSpec;
  }

  private merge(
    results: PromiseSettledResult<{ name: string; spec: OpenApiSpec }>[],
  ): Record<string, unknown> {
    const paths: Record<string, unknown> = {};
    const schemas: Record<string, unknown> = {};
    const securitySchemes: Record<string, unknown> = {};
    const tags: Array<{ name: string; description?: string }> = [];

    for (const result of results) {
      if (result.status === 'rejected') {
        this.logger.warn(`Could not fetch upstream docs: ${(result.reason as Error).message}`);
        continue;
      }

      const { name, spec } = result.value;
      this.logger.log(`Merged docs from ${name} service (${Object.keys(spec.paths ?? {}).length} paths)`);

      Object.assign(paths, spec.paths ?? {});

      for (const [key, schema] of Object.entries(spec.components?.schemas ?? {})) {
        if (schemas[key]) {
          this.logger.warn(`Schema conflict: "${key}" — keeping version from ${name}`);
        }
        schemas[key] = schema;
      }

      Object.assign(securitySchemes, spec.components?.securitySchemes ?? {});

      for (const tag of spec.tags ?? []) {
        if (!tags.find((t) => t.name === tag.name)) {
          tags.push(tag);
        }
      }
    }

    return {
      openapi: '3.0.0',
      info: { title: 'Backend API', version: '1.0.0' },
      tags,
      paths,
      components: { schemas, securitySchemes },
    };
  }
}
