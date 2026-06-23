export interface MessagingOptions {
  url: string;
  declareTopology?: boolean;
}

export const MESSAGING_OPTIONS = Symbol('MESSAGING_OPTIONS');
