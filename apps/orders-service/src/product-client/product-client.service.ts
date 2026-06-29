import {
  Injectable,
  Logger,
  ServiceUnavailableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface AvailabilityItem {
  productId: string;
  quantity: number;
}

@Injectable()
export class ProductClientService {
  private readonly logger = new Logger(ProductClientService.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = this.config.getOrThrow<string>('PRODUCT_SERVICE_URL');
    this.timeoutMs = this.config.get<number>('PRODUCT_SERVICE_TIMEOUT_MS', 3_000);
  }

  async checkAvailability(items: AvailabilityItem[], correlationId: string): Promise<void> {
    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}/products/availability`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-correlation-id': correlationId,
        },
        body: JSON.stringify({ items }),
        signal: AbortSignal.timeout(this.timeoutMs),
      });
    } catch (err) {
      this.logger.error(`product-service unavailable: ${(err as Error).message}`);
      throw new ServiceUnavailableException({
        error: { code: 'PRODUCT_SERVICE_UNAVAILABLE', message: 'Product service is unavailable' },
      });
    }

    if (response.status === 422) {
      const body = (await response.json()) as { error?: { code: string; message: string } };
      throw new UnprocessableEntityException(body);
    }

    if (!response.ok) {
      throw new ServiceUnavailableException({
        error: { code: 'PRODUCT_SERVICE_ERROR', message: 'Product service returned an error' },
      });
    }
  }
}
