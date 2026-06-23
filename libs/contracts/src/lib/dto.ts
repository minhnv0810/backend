export interface SuccessResponse<T> {
  data: T;
  meta: { correlationId: string };
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details: unknown[];
  };
  meta: { correlationId: string };
}

export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  correlationId: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginatedMeta;
}
