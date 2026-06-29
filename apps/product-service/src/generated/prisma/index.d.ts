
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model ProductCategory
 * 
 */
export type ProductCategory = $Result.DefaultSelection<Prisma.$ProductCategoryPayload>
/**
 * Model Stock
 * 
 */
export type Stock = $Result.DefaultSelection<Prisma.$StockPayload>
/**
 * Model ProcessedEvent
 * 
 */
export type ProcessedEvent = $Result.DefaultSelection<Prisma.$ProcessedEventPayload>
/**
 * Model Outbox
 * 
 */
export type Outbox = $Result.DefaultSelection<Prisma.$OutboxPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Products
 * const products = await prisma.product.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Products
   * const products = await prisma.product.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.productCategory`: Exposes CRUD operations for the **ProductCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductCategories
    * const productCategories = await prisma.productCategory.findMany()
    * ```
    */
  get productCategory(): Prisma.ProductCategoryDelegate<ExtArgs>;

  /**
   * `prisma.stock`: Exposes CRUD operations for the **Stock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stocks
    * const stocks = await prisma.stock.findMany()
    * ```
    */
  get stock(): Prisma.StockDelegate<ExtArgs>;

  /**
   * `prisma.processedEvent`: Exposes CRUD operations for the **ProcessedEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessedEvents
    * const processedEvents = await prisma.processedEvent.findMany()
    * ```
    */
  get processedEvent(): Prisma.ProcessedEventDelegate<ExtArgs>;

  /**
   * `prisma.outbox`: Exposes CRUD operations for the **Outbox** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Outboxes
    * const outboxes = await prisma.outbox.findMany()
    * ```
    */
  get outbox(): Prisma.OutboxDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Product: 'Product',
    Category: 'Category',
    ProductCategory: 'ProductCategory',
    Stock: 'Stock',
    ProcessedEvent: 'ProcessedEvent',
    Outbox: 'Outbox'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "product" | "category" | "productCategory" | "stock" | "processedEvent" | "outbox"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      ProductCategory: {
        payload: Prisma.$ProductCategoryPayload<ExtArgs>
        fields: Prisma.ProductCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>
          }
          findFirst: {
            args: Prisma.ProductCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>
          }
          findMany: {
            args: Prisma.ProductCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>[]
          }
          create: {
            args: Prisma.ProductCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>
          }
          createMany: {
            args: Prisma.ProductCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>[]
          }
          delete: {
            args: Prisma.ProductCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>
          }
          update: {
            args: Prisma.ProductCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ProductCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>
          }
          aggregate: {
            args: Prisma.ProductCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductCategory>
          }
          groupBy: {
            args: Prisma.ProductCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCategoryCountAggregateOutputType> | number
          }
        }
      }
      Stock: {
        payload: Prisma.$StockPayload<ExtArgs>
        fields: Prisma.StockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findFirst: {
            args: Prisma.StockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findMany: {
            args: Prisma.StockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          create: {
            args: Prisma.StockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          createMany: {
            args: Prisma.StockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          delete: {
            args: Prisma.StockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          update: {
            args: Prisma.StockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          deleteMany: {
            args: Prisma.StockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          aggregate: {
            args: Prisma.StockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStock>
          }
          groupBy: {
            args: Prisma.StockGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockCountArgs<ExtArgs>
            result: $Utils.Optional<StockCountAggregateOutputType> | number
          }
        }
      }
      ProcessedEvent: {
        payload: Prisma.$ProcessedEventPayload<ExtArgs>
        fields: Prisma.ProcessedEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessedEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessedEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          findFirst: {
            args: Prisma.ProcessedEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessedEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          findMany: {
            args: Prisma.ProcessedEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>[]
          }
          create: {
            args: Prisma.ProcessedEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          createMany: {
            args: Prisma.ProcessedEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessedEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>[]
          }
          delete: {
            args: Prisma.ProcessedEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          update: {
            args: Prisma.ProcessedEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          deleteMany: {
            args: Prisma.ProcessedEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessedEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProcessedEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          aggregate: {
            args: Prisma.ProcessedEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessedEvent>
          }
          groupBy: {
            args: Prisma.ProcessedEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessedEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessedEventCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessedEventCountAggregateOutputType> | number
          }
        }
      }
      Outbox: {
        payload: Prisma.$OutboxPayload<ExtArgs>
        fields: Prisma.OutboxFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutboxFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutboxFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxPayload>
          }
          findFirst: {
            args: Prisma.OutboxFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutboxFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxPayload>
          }
          findMany: {
            args: Prisma.OutboxFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxPayload>[]
          }
          create: {
            args: Prisma.OutboxCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxPayload>
          }
          createMany: {
            args: Prisma.OutboxCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OutboxCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxPayload>[]
          }
          delete: {
            args: Prisma.OutboxDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxPayload>
          }
          update: {
            args: Prisma.OutboxUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxPayload>
          }
          deleteMany: {
            args: Prisma.OutboxDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutboxUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OutboxUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxPayload>
          }
          aggregate: {
            args: Prisma.OutboxAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutbox>
          }
          groupBy: {
            args: Prisma.OutboxGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutboxGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutboxCountArgs<ExtArgs>
            result: $Utils.Optional<OutboxCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    categories: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | ProductCountOutputTypeCountCategoriesArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductCategoryWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    children: number
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | CategoryCountOutputTypeCountChildrenArgs
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductCategoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: Decimal | null
  }

  export type ProductSumAggregateOutputType = {
    price: Decimal | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    sku: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    currency: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    sku: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    currency: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    sku: number
    name: number
    description: number
    price: number
    currency: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    sku?: true
    name?: true
    description?: true
    price?: true
    currency?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    sku?: true
    name?: true
    description?: true
    price?: true
    currency?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    sku?: true
    name?: true
    description?: true
    price?: true
    currency?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    sku: string
    name: string
    description: string | null
    price: Decimal
    currency: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    currency?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categories?: boolean | Product$categoriesArgs<ExtArgs>
    stock?: boolean | Product$stockArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    currency?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    sku?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    currency?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | Product$categoriesArgs<ExtArgs>
    stock?: boolean | Product$stockArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      categories: Prisma.$ProductCategoryPayload<ExtArgs>[]
      stock: Prisma.$StockPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sku: string
      name: string
      description: string | null
      price: Prisma.Decimal
      currency: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categories<T extends Product$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Product$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findMany"> | Null>
    stock<T extends Product$stockArgs<ExtArgs> = {}>(args?: Subset<T, Product$stockArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Decimal'>
    readonly currency: FieldRef<"Product", 'String'>
    readonly status: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product.categories
   */
  export type Product$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    where?: ProductCategoryWhereInput
    orderBy?: ProductCategoryOrderByWithRelationInput | ProductCategoryOrderByWithRelationInput[]
    cursor?: ProductCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductCategoryScalarFieldEnum | ProductCategoryScalarFieldEnum[]
  }

  /**
   * Product.stock
   */
  export type Product$stockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    where?: StockWhereInput
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    parentId: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    parentId: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    parentId: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    parentId?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    parentId?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    parentId?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    parentId: string | null
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    parentId?: boolean
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    parentId?: boolean
    parent?: boolean | Category$parentArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    parentId?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Category$parentArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      parent: Prisma.$CategoryPayload<ExtArgs> | null
      children: Prisma.$CategoryPayload<ExtArgs>[]
      products: Prisma.$ProductCategoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      parentId: string | null
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Category$parentArgs<ExtArgs> = {}>(args?: Subset<T, Category$parentArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    children<T extends Category$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Category$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany"> | Null>
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly slug: FieldRef<"Category", 'String'>
    readonly parentId: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.parent
   */
  export type Category$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Category.children
   */
  export type Category$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    where?: ProductCategoryWhereInput
    orderBy?: ProductCategoryOrderByWithRelationInput | ProductCategoryOrderByWithRelationInput[]
    cursor?: ProductCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductCategoryScalarFieldEnum | ProductCategoryScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model ProductCategory
   */

  export type AggregateProductCategory = {
    _count: ProductCategoryCountAggregateOutputType | null
    _min: ProductCategoryMinAggregateOutputType | null
    _max: ProductCategoryMaxAggregateOutputType | null
  }

  export type ProductCategoryMinAggregateOutputType = {
    productId: string | null
    categoryId: string | null
  }

  export type ProductCategoryMaxAggregateOutputType = {
    productId: string | null
    categoryId: string | null
  }

  export type ProductCategoryCountAggregateOutputType = {
    productId: number
    categoryId: number
    _all: number
  }


  export type ProductCategoryMinAggregateInputType = {
    productId?: true
    categoryId?: true
  }

  export type ProductCategoryMaxAggregateInputType = {
    productId?: true
    categoryId?: true
  }

  export type ProductCategoryCountAggregateInputType = {
    productId?: true
    categoryId?: true
    _all?: true
  }

  export type ProductCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductCategory to aggregate.
     */
    where?: ProductCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCategories to fetch.
     */
    orderBy?: ProductCategoryOrderByWithRelationInput | ProductCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductCategories
    **/
    _count?: true | ProductCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductCategoryMaxAggregateInputType
  }

  export type GetProductCategoryAggregateType<T extends ProductCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateProductCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductCategory[P]>
      : GetScalarType<T[P], AggregateProductCategory[P]>
  }




  export type ProductCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductCategoryWhereInput
    orderBy?: ProductCategoryOrderByWithAggregationInput | ProductCategoryOrderByWithAggregationInput[]
    by: ProductCategoryScalarFieldEnum[] | ProductCategoryScalarFieldEnum
    having?: ProductCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCategoryCountAggregateInputType | true
    _min?: ProductCategoryMinAggregateInputType
    _max?: ProductCategoryMaxAggregateInputType
  }

  export type ProductCategoryGroupByOutputType = {
    productId: string
    categoryId: string
    _count: ProductCategoryCountAggregateOutputType | null
    _min: ProductCategoryMinAggregateOutputType | null
    _max: ProductCategoryMaxAggregateOutputType | null
  }

  type GetProductCategoryGroupByPayload<T extends ProductCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ProductCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ProductCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    categoryId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productCategory"]>

  export type ProductCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    categoryId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productCategory"]>

  export type ProductCategorySelectScalar = {
    productId?: boolean
    categoryId?: boolean
  }

  export type ProductCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type ProductCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ProductCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductCategory"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      productId: string
      categoryId: string
    }, ExtArgs["result"]["productCategory"]>
    composites: {}
  }

  type ProductCategoryGetPayload<S extends boolean | null | undefined | ProductCategoryDefaultArgs> = $Result.GetResult<Prisma.$ProductCategoryPayload, S>

  type ProductCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductCategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCategoryCountAggregateInputType | true
    }

  export interface ProductCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductCategory'], meta: { name: 'ProductCategory' } }
    /**
     * Find zero or one ProductCategory that matches the filter.
     * @param {ProductCategoryFindUniqueArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductCategoryFindUniqueArgs>(args: SelectSubset<T, ProductCategoryFindUniqueArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProductCategory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductCategoryFindUniqueOrThrowArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProductCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryFindFirstArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductCategoryFindFirstArgs>(args?: SelectSubset<T, ProductCategoryFindFirstArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProductCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryFindFirstOrThrowArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProductCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductCategories
     * const productCategories = await prisma.productCategory.findMany()
     * 
     * // Get first 10 ProductCategories
     * const productCategories = await prisma.productCategory.findMany({ take: 10 })
     * 
     * // Only select the `productId`
     * const productCategoryWithProductIdOnly = await prisma.productCategory.findMany({ select: { productId: true } })
     * 
     */
    findMany<T extends ProductCategoryFindManyArgs>(args?: SelectSubset<T, ProductCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProductCategory.
     * @param {ProductCategoryCreateArgs} args - Arguments to create a ProductCategory.
     * @example
     * // Create one ProductCategory
     * const ProductCategory = await prisma.productCategory.create({
     *   data: {
     *     // ... data to create a ProductCategory
     *   }
     * })
     * 
     */
    create<T extends ProductCategoryCreateArgs>(args: SelectSubset<T, ProductCategoryCreateArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProductCategories.
     * @param {ProductCategoryCreateManyArgs} args - Arguments to create many ProductCategories.
     * @example
     * // Create many ProductCategories
     * const productCategory = await prisma.productCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCategoryCreateManyArgs>(args?: SelectSubset<T, ProductCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductCategories and returns the data saved in the database.
     * @param {ProductCategoryCreateManyAndReturnArgs} args - Arguments to create many ProductCategories.
     * @example
     * // Create many ProductCategories
     * const productCategory = await prisma.productCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductCategories and only return the `productId`
     * const productCategoryWithProductIdOnly = await prisma.productCategory.createManyAndReturn({ 
     *   select: { productId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProductCategory.
     * @param {ProductCategoryDeleteArgs} args - Arguments to delete one ProductCategory.
     * @example
     * // Delete one ProductCategory
     * const ProductCategory = await prisma.productCategory.delete({
     *   where: {
     *     // ... filter to delete one ProductCategory
     *   }
     * })
     * 
     */
    delete<T extends ProductCategoryDeleteArgs>(args: SelectSubset<T, ProductCategoryDeleteArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProductCategory.
     * @param {ProductCategoryUpdateArgs} args - Arguments to update one ProductCategory.
     * @example
     * // Update one ProductCategory
     * const productCategory = await prisma.productCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductCategoryUpdateArgs>(args: SelectSubset<T, ProductCategoryUpdateArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProductCategories.
     * @param {ProductCategoryDeleteManyArgs} args - Arguments to filter ProductCategories to delete.
     * @example
     * // Delete a few ProductCategories
     * const { count } = await prisma.productCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductCategoryDeleteManyArgs>(args?: SelectSubset<T, ProductCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductCategories
     * const productCategory = await prisma.productCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductCategoryUpdateManyArgs>(args: SelectSubset<T, ProductCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductCategory.
     * @param {ProductCategoryUpsertArgs} args - Arguments to update or create a ProductCategory.
     * @example
     * // Update or create a ProductCategory
     * const productCategory = await prisma.productCategory.upsert({
     *   create: {
     *     // ... data to create a ProductCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductCategory we want to update
     *   }
     * })
     */
    upsert<T extends ProductCategoryUpsertArgs>(args: SelectSubset<T, ProductCategoryUpsertArgs<ExtArgs>>): Prisma__ProductCategoryClient<$Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProductCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryCountArgs} args - Arguments to filter ProductCategories to count.
     * @example
     * // Count the number of ProductCategories
     * const count = await prisma.productCategory.count({
     *   where: {
     *     // ... the filter for the ProductCategories we want to count
     *   }
     * })
    **/
    count<T extends ProductCategoryCountArgs>(
      args?: Subset<T, ProductCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductCategoryAggregateArgs>(args: Subset<T, ProductCategoryAggregateArgs>): Prisma.PrismaPromise<GetProductCategoryAggregateType<T>>

    /**
     * Group by ProductCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ProductCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductCategory model
   */
  readonly fields: ProductCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductCategory model
   */ 
  interface ProductCategoryFieldRefs {
    readonly productId: FieldRef<"ProductCategory", 'String'>
    readonly categoryId: FieldRef<"ProductCategory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProductCategory findUnique
   */
  export type ProductCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductCategory to fetch.
     */
    where: ProductCategoryWhereUniqueInput
  }

  /**
   * ProductCategory findUniqueOrThrow
   */
  export type ProductCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductCategory to fetch.
     */
    where: ProductCategoryWhereUniqueInput
  }

  /**
   * ProductCategory findFirst
   */
  export type ProductCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductCategory to fetch.
     */
    where?: ProductCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCategories to fetch.
     */
    orderBy?: ProductCategoryOrderByWithRelationInput | ProductCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductCategories.
     */
    cursor?: ProductCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductCategories.
     */
    distinct?: ProductCategoryScalarFieldEnum | ProductCategoryScalarFieldEnum[]
  }

  /**
   * ProductCategory findFirstOrThrow
   */
  export type ProductCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductCategory to fetch.
     */
    where?: ProductCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCategories to fetch.
     */
    orderBy?: ProductCategoryOrderByWithRelationInput | ProductCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductCategories.
     */
    cursor?: ProductCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductCategories.
     */
    distinct?: ProductCategoryScalarFieldEnum | ProductCategoryScalarFieldEnum[]
  }

  /**
   * ProductCategory findMany
   */
  export type ProductCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductCategories to fetch.
     */
    where?: ProductCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCategories to fetch.
     */
    orderBy?: ProductCategoryOrderByWithRelationInput | ProductCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductCategories.
     */
    cursor?: ProductCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCategories.
     */
    skip?: number
    distinct?: ProductCategoryScalarFieldEnum | ProductCategoryScalarFieldEnum[]
  }

  /**
   * ProductCategory create
   */
  export type ProductCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductCategory.
     */
    data: XOR<ProductCategoryCreateInput, ProductCategoryUncheckedCreateInput>
  }

  /**
   * ProductCategory createMany
   */
  export type ProductCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductCategories.
     */
    data: ProductCategoryCreateManyInput | ProductCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductCategory createManyAndReturn
   */
  export type ProductCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProductCategories.
     */
    data: ProductCategoryCreateManyInput | ProductCategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductCategory update
   */
  export type ProductCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductCategory.
     */
    data: XOR<ProductCategoryUpdateInput, ProductCategoryUncheckedUpdateInput>
    /**
     * Choose, which ProductCategory to update.
     */
    where: ProductCategoryWhereUniqueInput
  }

  /**
   * ProductCategory updateMany
   */
  export type ProductCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductCategories.
     */
    data: XOR<ProductCategoryUpdateManyMutationInput, ProductCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ProductCategories to update
     */
    where?: ProductCategoryWhereInput
  }

  /**
   * ProductCategory upsert
   */
  export type ProductCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductCategory to update in case it exists.
     */
    where: ProductCategoryWhereUniqueInput
    /**
     * In case the ProductCategory found by the `where` argument doesn't exist, create a new ProductCategory with this data.
     */
    create: XOR<ProductCategoryCreateInput, ProductCategoryUncheckedCreateInput>
    /**
     * In case the ProductCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductCategoryUpdateInput, ProductCategoryUncheckedUpdateInput>
  }

  /**
   * ProductCategory delete
   */
  export type ProductCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
    /**
     * Filter which ProductCategory to delete.
     */
    where: ProductCategoryWhereUniqueInput
  }

  /**
   * ProductCategory deleteMany
   */
  export type ProductCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductCategories to delete
     */
    where?: ProductCategoryWhereInput
  }

  /**
   * ProductCategory without action
   */
  export type ProductCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Stock
   */

  export type AggregateStock = {
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  export type StockAvgAggregateOutputType = {
    quantityAvailable: number | null
    quantityReserved: number | null
  }

  export type StockSumAggregateOutputType = {
    quantityAvailable: number | null
    quantityReserved: number | null
  }

  export type StockMinAggregateOutputType = {
    productId: string | null
    quantityAvailable: number | null
    quantityReserved: number | null
    updatedAt: Date | null
  }

  export type StockMaxAggregateOutputType = {
    productId: string | null
    quantityAvailable: number | null
    quantityReserved: number | null
    updatedAt: Date | null
  }

  export type StockCountAggregateOutputType = {
    productId: number
    quantityAvailable: number
    quantityReserved: number
    updatedAt: number
    _all: number
  }


  export type StockAvgAggregateInputType = {
    quantityAvailable?: true
    quantityReserved?: true
  }

  export type StockSumAggregateInputType = {
    quantityAvailable?: true
    quantityReserved?: true
  }

  export type StockMinAggregateInputType = {
    productId?: true
    quantityAvailable?: true
    quantityReserved?: true
    updatedAt?: true
  }

  export type StockMaxAggregateInputType = {
    productId?: true
    quantityAvailable?: true
    quantityReserved?: true
    updatedAt?: true
  }

  export type StockCountAggregateInputType = {
    productId?: true
    quantityAvailable?: true
    quantityReserved?: true
    updatedAt?: true
    _all?: true
  }

  export type StockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stock to aggregate.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stocks
    **/
    _count?: true | StockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockMaxAggregateInputType
  }

  export type GetStockAggregateType<T extends StockAggregateArgs> = {
        [P in keyof T & keyof AggregateStock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStock[P]>
      : GetScalarType<T[P], AggregateStock[P]>
  }




  export type StockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
    orderBy?: StockOrderByWithAggregationInput | StockOrderByWithAggregationInput[]
    by: StockScalarFieldEnum[] | StockScalarFieldEnum
    having?: StockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockCountAggregateInputType | true
    _avg?: StockAvgAggregateInputType
    _sum?: StockSumAggregateInputType
    _min?: StockMinAggregateInputType
    _max?: StockMaxAggregateInputType
  }

  export type StockGroupByOutputType = {
    productId: string
    quantityAvailable: number
    quantityReserved: number
    updatedAt: Date
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  type GetStockGroupByPayload<T extends StockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockGroupByOutputType[P]>
            : GetScalarType<T[P], StockGroupByOutputType[P]>
        }
      >
    >


  export type StockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    quantityAvailable?: boolean
    quantityReserved?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    quantityAvailable?: boolean
    quantityReserved?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectScalar = {
    productId?: boolean
    quantityAvailable?: boolean
    quantityReserved?: boolean
    updatedAt?: boolean
  }

  export type StockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type StockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $StockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stock"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      productId: string
      quantityAvailable: number
      quantityReserved: number
      updatedAt: Date
    }, ExtArgs["result"]["stock"]>
    composites: {}
  }

  type StockGetPayload<S extends boolean | null | undefined | StockDefaultArgs> = $Result.GetResult<Prisma.$StockPayload, S>

  type StockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StockFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StockCountAggregateInputType | true
    }

  export interface StockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stock'], meta: { name: 'Stock' } }
    /**
     * Find zero or one Stock that matches the filter.
     * @param {StockFindUniqueArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockFindUniqueArgs>(args: SelectSubset<T, StockFindUniqueArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Stock that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StockFindUniqueOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockFindUniqueOrThrowArgs>(args: SelectSubset<T, StockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Stock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockFindFirstArgs>(args?: SelectSubset<T, StockFindFirstArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Stock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockFindFirstOrThrowArgs>(args?: SelectSubset<T, StockFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Stocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stocks
     * const stocks = await prisma.stock.findMany()
     * 
     * // Get first 10 Stocks
     * const stocks = await prisma.stock.findMany({ take: 10 })
     * 
     * // Only select the `productId`
     * const stockWithProductIdOnly = await prisma.stock.findMany({ select: { productId: true } })
     * 
     */
    findMany<T extends StockFindManyArgs>(args?: SelectSubset<T, StockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Stock.
     * @param {StockCreateArgs} args - Arguments to create a Stock.
     * @example
     * // Create one Stock
     * const Stock = await prisma.stock.create({
     *   data: {
     *     // ... data to create a Stock
     *   }
     * })
     * 
     */
    create<T extends StockCreateArgs>(args: SelectSubset<T, StockCreateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Stocks.
     * @param {StockCreateManyArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockCreateManyArgs>(args?: SelectSubset<T, StockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stocks and returns the data saved in the database.
     * @param {StockCreateManyAndReturnArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stocks and only return the `productId`
     * const stockWithProductIdOnly = await prisma.stock.createManyAndReturn({ 
     *   select: { productId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockCreateManyAndReturnArgs>(args?: SelectSubset<T, StockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Stock.
     * @param {StockDeleteArgs} args - Arguments to delete one Stock.
     * @example
     * // Delete one Stock
     * const Stock = await prisma.stock.delete({
     *   where: {
     *     // ... filter to delete one Stock
     *   }
     * })
     * 
     */
    delete<T extends StockDeleteArgs>(args: SelectSubset<T, StockDeleteArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Stock.
     * @param {StockUpdateArgs} args - Arguments to update one Stock.
     * @example
     * // Update one Stock
     * const stock = await prisma.stock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockUpdateArgs>(args: SelectSubset<T, StockUpdateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Stocks.
     * @param {StockDeleteManyArgs} args - Arguments to filter Stocks to delete.
     * @example
     * // Delete a few Stocks
     * const { count } = await prisma.stock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockDeleteManyArgs>(args?: SelectSubset<T, StockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stocks
     * const stock = await prisma.stock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockUpdateManyArgs>(args: SelectSubset<T, StockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Stock.
     * @param {StockUpsertArgs} args - Arguments to update or create a Stock.
     * @example
     * // Update or create a Stock
     * const stock = await prisma.stock.upsert({
     *   create: {
     *     // ... data to create a Stock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stock we want to update
     *   }
     * })
     */
    upsert<T extends StockUpsertArgs>(args: SelectSubset<T, StockUpsertArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockCountArgs} args - Arguments to filter Stocks to count.
     * @example
     * // Count the number of Stocks
     * const count = await prisma.stock.count({
     *   where: {
     *     // ... the filter for the Stocks we want to count
     *   }
     * })
    **/
    count<T extends StockCountArgs>(
      args?: Subset<T, StockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockAggregateArgs>(args: Subset<T, StockAggregateArgs>): Prisma.PrismaPromise<GetStockAggregateType<T>>

    /**
     * Group by Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockGroupByArgs['orderBy'] }
        : { orderBy?: StockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stock model
   */
  readonly fields: StockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stock model
   */ 
  interface StockFieldRefs {
    readonly productId: FieldRef<"Stock", 'String'>
    readonly quantityAvailable: FieldRef<"Stock", 'Int'>
    readonly quantityReserved: FieldRef<"Stock", 'Int'>
    readonly updatedAt: FieldRef<"Stock", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Stock findUnique
   */
  export type StockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findUniqueOrThrow
   */
  export type StockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findFirst
   */
  export type StockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findFirstOrThrow
   */
  export type StockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findMany
   */
  export type StockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stocks to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock create
   */
  export type StockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to create a Stock.
     */
    data: XOR<StockCreateInput, StockUncheckedCreateInput>
  }

  /**
   * Stock createMany
   */
  export type StockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stock createManyAndReturn
   */
  export type StockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stock update
   */
  export type StockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to update a Stock.
     */
    data: XOR<StockUpdateInput, StockUncheckedUpdateInput>
    /**
     * Choose, which Stock to update.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock updateMany
   */
  export type StockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stocks.
     */
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyInput>
    /**
     * Filter which Stocks to update
     */
    where?: StockWhereInput
  }

  /**
   * Stock upsert
   */
  export type StockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The filter to search for the Stock to update in case it exists.
     */
    where: StockWhereUniqueInput
    /**
     * In case the Stock found by the `where` argument doesn't exist, create a new Stock with this data.
     */
    create: XOR<StockCreateInput, StockUncheckedCreateInput>
    /**
     * In case the Stock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockUpdateInput, StockUncheckedUpdateInput>
  }

  /**
   * Stock delete
   */
  export type StockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter which Stock to delete.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock deleteMany
   */
  export type StockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stocks to delete
     */
    where?: StockWhereInput
  }

  /**
   * Stock without action
   */
  export type StockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
  }


  /**
   * Model ProcessedEvent
   */

  export type AggregateProcessedEvent = {
    _count: ProcessedEventCountAggregateOutputType | null
    _min: ProcessedEventMinAggregateOutputType | null
    _max: ProcessedEventMaxAggregateOutputType | null
  }

  export type ProcessedEventMinAggregateOutputType = {
    eventId: string | null
    processedAt: Date | null
  }

  export type ProcessedEventMaxAggregateOutputType = {
    eventId: string | null
    processedAt: Date | null
  }

  export type ProcessedEventCountAggregateOutputType = {
    eventId: number
    processedAt: number
    _all: number
  }


  export type ProcessedEventMinAggregateInputType = {
    eventId?: true
    processedAt?: true
  }

  export type ProcessedEventMaxAggregateInputType = {
    eventId?: true
    processedAt?: true
  }

  export type ProcessedEventCountAggregateInputType = {
    eventId?: true
    processedAt?: true
    _all?: true
  }

  export type ProcessedEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedEvent to aggregate.
     */
    where?: ProcessedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEvents to fetch.
     */
    orderBy?: ProcessedEventOrderByWithRelationInput | ProcessedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessedEvents
    **/
    _count?: true | ProcessedEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessedEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessedEventMaxAggregateInputType
  }

  export type GetProcessedEventAggregateType<T extends ProcessedEventAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessedEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessedEvent[P]>
      : GetScalarType<T[P], AggregateProcessedEvent[P]>
  }




  export type ProcessedEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessedEventWhereInput
    orderBy?: ProcessedEventOrderByWithAggregationInput | ProcessedEventOrderByWithAggregationInput[]
    by: ProcessedEventScalarFieldEnum[] | ProcessedEventScalarFieldEnum
    having?: ProcessedEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessedEventCountAggregateInputType | true
    _min?: ProcessedEventMinAggregateInputType
    _max?: ProcessedEventMaxAggregateInputType
  }

  export type ProcessedEventGroupByOutputType = {
    eventId: string
    processedAt: Date
    _count: ProcessedEventCountAggregateOutputType | null
    _min: ProcessedEventMinAggregateOutputType | null
    _max: ProcessedEventMaxAggregateOutputType | null
  }

  type GetProcessedEventGroupByPayload<T extends ProcessedEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessedEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessedEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessedEventGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessedEventGroupByOutputType[P]>
        }
      >
    >


  export type ProcessedEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    processedAt?: boolean
  }, ExtArgs["result"]["processedEvent"]>

  export type ProcessedEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    processedAt?: boolean
  }, ExtArgs["result"]["processedEvent"]>

  export type ProcessedEventSelectScalar = {
    eventId?: boolean
    processedAt?: boolean
  }


  export type $ProcessedEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProcessedEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      eventId: string
      processedAt: Date
    }, ExtArgs["result"]["processedEvent"]>
    composites: {}
  }

  type ProcessedEventGetPayload<S extends boolean | null | undefined | ProcessedEventDefaultArgs> = $Result.GetResult<Prisma.$ProcessedEventPayload, S>

  type ProcessedEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProcessedEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProcessedEventCountAggregateInputType | true
    }

  export interface ProcessedEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProcessedEvent'], meta: { name: 'ProcessedEvent' } }
    /**
     * Find zero or one ProcessedEvent that matches the filter.
     * @param {ProcessedEventFindUniqueArgs} args - Arguments to find a ProcessedEvent
     * @example
     * // Get one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessedEventFindUniqueArgs>(args: SelectSubset<T, ProcessedEventFindUniqueArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProcessedEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProcessedEventFindUniqueOrThrowArgs} args - Arguments to find a ProcessedEvent
     * @example
     * // Get one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessedEventFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessedEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProcessedEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventFindFirstArgs} args - Arguments to find a ProcessedEvent
     * @example
     * // Get one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessedEventFindFirstArgs>(args?: SelectSubset<T, ProcessedEventFindFirstArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProcessedEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventFindFirstOrThrowArgs} args - Arguments to find a ProcessedEvent
     * @example
     * // Get one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessedEventFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessedEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProcessedEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessedEvents
     * const processedEvents = await prisma.processedEvent.findMany()
     * 
     * // Get first 10 ProcessedEvents
     * const processedEvents = await prisma.processedEvent.findMany({ take: 10 })
     * 
     * // Only select the `eventId`
     * const processedEventWithEventIdOnly = await prisma.processedEvent.findMany({ select: { eventId: true } })
     * 
     */
    findMany<T extends ProcessedEventFindManyArgs>(args?: SelectSubset<T, ProcessedEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProcessedEvent.
     * @param {ProcessedEventCreateArgs} args - Arguments to create a ProcessedEvent.
     * @example
     * // Create one ProcessedEvent
     * const ProcessedEvent = await prisma.processedEvent.create({
     *   data: {
     *     // ... data to create a ProcessedEvent
     *   }
     * })
     * 
     */
    create<T extends ProcessedEventCreateArgs>(args: SelectSubset<T, ProcessedEventCreateArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProcessedEvents.
     * @param {ProcessedEventCreateManyArgs} args - Arguments to create many ProcessedEvents.
     * @example
     * // Create many ProcessedEvents
     * const processedEvent = await prisma.processedEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessedEventCreateManyArgs>(args?: SelectSubset<T, ProcessedEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProcessedEvents and returns the data saved in the database.
     * @param {ProcessedEventCreateManyAndReturnArgs} args - Arguments to create many ProcessedEvents.
     * @example
     * // Create many ProcessedEvents
     * const processedEvent = await prisma.processedEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProcessedEvents and only return the `eventId`
     * const processedEventWithEventIdOnly = await prisma.processedEvent.createManyAndReturn({ 
     *   select: { eventId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessedEventCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessedEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProcessedEvent.
     * @param {ProcessedEventDeleteArgs} args - Arguments to delete one ProcessedEvent.
     * @example
     * // Delete one ProcessedEvent
     * const ProcessedEvent = await prisma.processedEvent.delete({
     *   where: {
     *     // ... filter to delete one ProcessedEvent
     *   }
     * })
     * 
     */
    delete<T extends ProcessedEventDeleteArgs>(args: SelectSubset<T, ProcessedEventDeleteArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProcessedEvent.
     * @param {ProcessedEventUpdateArgs} args - Arguments to update one ProcessedEvent.
     * @example
     * // Update one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessedEventUpdateArgs>(args: SelectSubset<T, ProcessedEventUpdateArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProcessedEvents.
     * @param {ProcessedEventDeleteManyArgs} args - Arguments to filter ProcessedEvents to delete.
     * @example
     * // Delete a few ProcessedEvents
     * const { count } = await prisma.processedEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessedEventDeleteManyArgs>(args?: SelectSubset<T, ProcessedEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessedEvents
     * const processedEvent = await prisma.processedEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessedEventUpdateManyArgs>(args: SelectSubset<T, ProcessedEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProcessedEvent.
     * @param {ProcessedEventUpsertArgs} args - Arguments to update or create a ProcessedEvent.
     * @example
     * // Update or create a ProcessedEvent
     * const processedEvent = await prisma.processedEvent.upsert({
     *   create: {
     *     // ... data to create a ProcessedEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessedEvent we want to update
     *   }
     * })
     */
    upsert<T extends ProcessedEventUpsertArgs>(args: SelectSubset<T, ProcessedEventUpsertArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProcessedEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventCountArgs} args - Arguments to filter ProcessedEvents to count.
     * @example
     * // Count the number of ProcessedEvents
     * const count = await prisma.processedEvent.count({
     *   where: {
     *     // ... the filter for the ProcessedEvents we want to count
     *   }
     * })
    **/
    count<T extends ProcessedEventCountArgs>(
      args?: Subset<T, ProcessedEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessedEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessedEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessedEventAggregateArgs>(args: Subset<T, ProcessedEventAggregateArgs>): Prisma.PrismaPromise<GetProcessedEventAggregateType<T>>

    /**
     * Group by ProcessedEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessedEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessedEventGroupByArgs['orderBy'] }
        : { orderBy?: ProcessedEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessedEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessedEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProcessedEvent model
   */
  readonly fields: ProcessedEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessedEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessedEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProcessedEvent model
   */ 
  interface ProcessedEventFieldRefs {
    readonly eventId: FieldRef<"ProcessedEvent", 'String'>
    readonly processedAt: FieldRef<"ProcessedEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProcessedEvent findUnique
   */
  export type ProcessedEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Filter, which ProcessedEvent to fetch.
     */
    where: ProcessedEventWhereUniqueInput
  }

  /**
   * ProcessedEvent findUniqueOrThrow
   */
  export type ProcessedEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Filter, which ProcessedEvent to fetch.
     */
    where: ProcessedEventWhereUniqueInput
  }

  /**
   * ProcessedEvent findFirst
   */
  export type ProcessedEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Filter, which ProcessedEvent to fetch.
     */
    where?: ProcessedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEvents to fetch.
     */
    orderBy?: ProcessedEventOrderByWithRelationInput | ProcessedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedEvents.
     */
    cursor?: ProcessedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedEvents.
     */
    distinct?: ProcessedEventScalarFieldEnum | ProcessedEventScalarFieldEnum[]
  }

  /**
   * ProcessedEvent findFirstOrThrow
   */
  export type ProcessedEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Filter, which ProcessedEvent to fetch.
     */
    where?: ProcessedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEvents to fetch.
     */
    orderBy?: ProcessedEventOrderByWithRelationInput | ProcessedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedEvents.
     */
    cursor?: ProcessedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedEvents.
     */
    distinct?: ProcessedEventScalarFieldEnum | ProcessedEventScalarFieldEnum[]
  }

  /**
   * ProcessedEvent findMany
   */
  export type ProcessedEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Filter, which ProcessedEvents to fetch.
     */
    where?: ProcessedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEvents to fetch.
     */
    orderBy?: ProcessedEventOrderByWithRelationInput | ProcessedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessedEvents.
     */
    cursor?: ProcessedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEvents.
     */
    skip?: number
    distinct?: ProcessedEventScalarFieldEnum | ProcessedEventScalarFieldEnum[]
  }

  /**
   * ProcessedEvent create
   */
  export type ProcessedEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * The data needed to create a ProcessedEvent.
     */
    data: XOR<ProcessedEventCreateInput, ProcessedEventUncheckedCreateInput>
  }

  /**
   * ProcessedEvent createMany
   */
  export type ProcessedEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProcessedEvents.
     */
    data: ProcessedEventCreateManyInput | ProcessedEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedEvent createManyAndReturn
   */
  export type ProcessedEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProcessedEvents.
     */
    data: ProcessedEventCreateManyInput | ProcessedEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedEvent update
   */
  export type ProcessedEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * The data needed to update a ProcessedEvent.
     */
    data: XOR<ProcessedEventUpdateInput, ProcessedEventUncheckedUpdateInput>
    /**
     * Choose, which ProcessedEvent to update.
     */
    where: ProcessedEventWhereUniqueInput
  }

  /**
   * ProcessedEvent updateMany
   */
  export type ProcessedEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProcessedEvents.
     */
    data: XOR<ProcessedEventUpdateManyMutationInput, ProcessedEventUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedEvents to update
     */
    where?: ProcessedEventWhereInput
  }

  /**
   * ProcessedEvent upsert
   */
  export type ProcessedEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * The filter to search for the ProcessedEvent to update in case it exists.
     */
    where: ProcessedEventWhereUniqueInput
    /**
     * In case the ProcessedEvent found by the `where` argument doesn't exist, create a new ProcessedEvent with this data.
     */
    create: XOR<ProcessedEventCreateInput, ProcessedEventUncheckedCreateInput>
    /**
     * In case the ProcessedEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessedEventUpdateInput, ProcessedEventUncheckedUpdateInput>
  }

  /**
   * ProcessedEvent delete
   */
  export type ProcessedEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Filter which ProcessedEvent to delete.
     */
    where: ProcessedEventWhereUniqueInput
  }

  /**
   * ProcessedEvent deleteMany
   */
  export type ProcessedEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedEvents to delete
     */
    where?: ProcessedEventWhereInput
  }

  /**
   * ProcessedEvent without action
   */
  export type ProcessedEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
  }


  /**
   * Model Outbox
   */

  export type AggregateOutbox = {
    _count: OutboxCountAggregateOutputType | null
    _min: OutboxMinAggregateOutputType | null
    _max: OutboxMaxAggregateOutputType | null
  }

  export type OutboxMinAggregateOutputType = {
    id: string | null
    routingKey: string | null
    sent: boolean | null
    createdAt: Date | null
    sentAt: Date | null
  }

  export type OutboxMaxAggregateOutputType = {
    id: string | null
    routingKey: string | null
    sent: boolean | null
    createdAt: Date | null
    sentAt: Date | null
  }

  export type OutboxCountAggregateOutputType = {
    id: number
    routingKey: number
    payload: number
    sent: number
    createdAt: number
    sentAt: number
    _all: number
  }


  export type OutboxMinAggregateInputType = {
    id?: true
    routingKey?: true
    sent?: true
    createdAt?: true
    sentAt?: true
  }

  export type OutboxMaxAggregateInputType = {
    id?: true
    routingKey?: true
    sent?: true
    createdAt?: true
    sentAt?: true
  }

  export type OutboxCountAggregateInputType = {
    id?: true
    routingKey?: true
    payload?: true
    sent?: true
    createdAt?: true
    sentAt?: true
    _all?: true
  }

  export type OutboxAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Outbox to aggregate.
     */
    where?: OutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outboxes to fetch.
     */
    orderBy?: OutboxOrderByWithRelationInput | OutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Outboxes
    **/
    _count?: true | OutboxCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutboxMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutboxMaxAggregateInputType
  }

  export type GetOutboxAggregateType<T extends OutboxAggregateArgs> = {
        [P in keyof T & keyof AggregateOutbox]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutbox[P]>
      : GetScalarType<T[P], AggregateOutbox[P]>
  }




  export type OutboxGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutboxWhereInput
    orderBy?: OutboxOrderByWithAggregationInput | OutboxOrderByWithAggregationInput[]
    by: OutboxScalarFieldEnum[] | OutboxScalarFieldEnum
    having?: OutboxScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutboxCountAggregateInputType | true
    _min?: OutboxMinAggregateInputType
    _max?: OutboxMaxAggregateInputType
  }

  export type OutboxGroupByOutputType = {
    id: string
    routingKey: string
    payload: JsonValue
    sent: boolean
    createdAt: Date
    sentAt: Date | null
    _count: OutboxCountAggregateOutputType | null
    _min: OutboxMinAggregateOutputType | null
    _max: OutboxMaxAggregateOutputType | null
  }

  type GetOutboxGroupByPayload<T extends OutboxGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutboxGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutboxGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutboxGroupByOutputType[P]>
            : GetScalarType<T[P], OutboxGroupByOutputType[P]>
        }
      >
    >


  export type OutboxSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    routingKey?: boolean
    payload?: boolean
    sent?: boolean
    createdAt?: boolean
    sentAt?: boolean
  }, ExtArgs["result"]["outbox"]>

  export type OutboxSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    routingKey?: boolean
    payload?: boolean
    sent?: boolean
    createdAt?: boolean
    sentAt?: boolean
  }, ExtArgs["result"]["outbox"]>

  export type OutboxSelectScalar = {
    id?: boolean
    routingKey?: boolean
    payload?: boolean
    sent?: boolean
    createdAt?: boolean
    sentAt?: boolean
  }


  export type $OutboxPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Outbox"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      routingKey: string
      payload: Prisma.JsonValue
      sent: boolean
      createdAt: Date
      sentAt: Date | null
    }, ExtArgs["result"]["outbox"]>
    composites: {}
  }

  type OutboxGetPayload<S extends boolean | null | undefined | OutboxDefaultArgs> = $Result.GetResult<Prisma.$OutboxPayload, S>

  type OutboxCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OutboxFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OutboxCountAggregateInputType | true
    }

  export interface OutboxDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Outbox'], meta: { name: 'Outbox' } }
    /**
     * Find zero or one Outbox that matches the filter.
     * @param {OutboxFindUniqueArgs} args - Arguments to find a Outbox
     * @example
     * // Get one Outbox
     * const outbox = await prisma.outbox.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutboxFindUniqueArgs>(args: SelectSubset<T, OutboxFindUniqueArgs<ExtArgs>>): Prisma__OutboxClient<$Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Outbox that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OutboxFindUniqueOrThrowArgs} args - Arguments to find a Outbox
     * @example
     * // Get one Outbox
     * const outbox = await prisma.outbox.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutboxFindUniqueOrThrowArgs>(args: SelectSubset<T, OutboxFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutboxClient<$Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Outbox that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxFindFirstArgs} args - Arguments to find a Outbox
     * @example
     * // Get one Outbox
     * const outbox = await prisma.outbox.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutboxFindFirstArgs>(args?: SelectSubset<T, OutboxFindFirstArgs<ExtArgs>>): Prisma__OutboxClient<$Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Outbox that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxFindFirstOrThrowArgs} args - Arguments to find a Outbox
     * @example
     * // Get one Outbox
     * const outbox = await prisma.outbox.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutboxFindFirstOrThrowArgs>(args?: SelectSubset<T, OutboxFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutboxClient<$Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Outboxes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Outboxes
     * const outboxes = await prisma.outbox.findMany()
     * 
     * // Get first 10 Outboxes
     * const outboxes = await prisma.outbox.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outboxWithIdOnly = await prisma.outbox.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutboxFindManyArgs>(args?: SelectSubset<T, OutboxFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Outbox.
     * @param {OutboxCreateArgs} args - Arguments to create a Outbox.
     * @example
     * // Create one Outbox
     * const Outbox = await prisma.outbox.create({
     *   data: {
     *     // ... data to create a Outbox
     *   }
     * })
     * 
     */
    create<T extends OutboxCreateArgs>(args: SelectSubset<T, OutboxCreateArgs<ExtArgs>>): Prisma__OutboxClient<$Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Outboxes.
     * @param {OutboxCreateManyArgs} args - Arguments to create many Outboxes.
     * @example
     * // Create many Outboxes
     * const outbox = await prisma.outbox.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutboxCreateManyArgs>(args?: SelectSubset<T, OutboxCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Outboxes and returns the data saved in the database.
     * @param {OutboxCreateManyAndReturnArgs} args - Arguments to create many Outboxes.
     * @example
     * // Create many Outboxes
     * const outbox = await prisma.outbox.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Outboxes and only return the `id`
     * const outboxWithIdOnly = await prisma.outbox.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OutboxCreateManyAndReturnArgs>(args?: SelectSubset<T, OutboxCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Outbox.
     * @param {OutboxDeleteArgs} args - Arguments to delete one Outbox.
     * @example
     * // Delete one Outbox
     * const Outbox = await prisma.outbox.delete({
     *   where: {
     *     // ... filter to delete one Outbox
     *   }
     * })
     * 
     */
    delete<T extends OutboxDeleteArgs>(args: SelectSubset<T, OutboxDeleteArgs<ExtArgs>>): Prisma__OutboxClient<$Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Outbox.
     * @param {OutboxUpdateArgs} args - Arguments to update one Outbox.
     * @example
     * // Update one Outbox
     * const outbox = await prisma.outbox.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutboxUpdateArgs>(args: SelectSubset<T, OutboxUpdateArgs<ExtArgs>>): Prisma__OutboxClient<$Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Outboxes.
     * @param {OutboxDeleteManyArgs} args - Arguments to filter Outboxes to delete.
     * @example
     * // Delete a few Outboxes
     * const { count } = await prisma.outbox.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutboxDeleteManyArgs>(args?: SelectSubset<T, OutboxDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Outboxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Outboxes
     * const outbox = await prisma.outbox.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutboxUpdateManyArgs>(args: SelectSubset<T, OutboxUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Outbox.
     * @param {OutboxUpsertArgs} args - Arguments to update or create a Outbox.
     * @example
     * // Update or create a Outbox
     * const outbox = await prisma.outbox.upsert({
     *   create: {
     *     // ... data to create a Outbox
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Outbox we want to update
     *   }
     * })
     */
    upsert<T extends OutboxUpsertArgs>(args: SelectSubset<T, OutboxUpsertArgs<ExtArgs>>): Prisma__OutboxClient<$Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Outboxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxCountArgs} args - Arguments to filter Outboxes to count.
     * @example
     * // Count the number of Outboxes
     * const count = await prisma.outbox.count({
     *   where: {
     *     // ... the filter for the Outboxes we want to count
     *   }
     * })
    **/
    count<T extends OutboxCountArgs>(
      args?: Subset<T, OutboxCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutboxCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Outbox.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutboxAggregateArgs>(args: Subset<T, OutboxAggregateArgs>): Prisma.PrismaPromise<GetOutboxAggregateType<T>>

    /**
     * Group by Outbox.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutboxGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutboxGroupByArgs['orderBy'] }
        : { orderBy?: OutboxGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutboxGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutboxGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Outbox model
   */
  readonly fields: OutboxFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Outbox.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutboxClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Outbox model
   */ 
  interface OutboxFieldRefs {
    readonly id: FieldRef<"Outbox", 'String'>
    readonly routingKey: FieldRef<"Outbox", 'String'>
    readonly payload: FieldRef<"Outbox", 'Json'>
    readonly sent: FieldRef<"Outbox", 'Boolean'>
    readonly createdAt: FieldRef<"Outbox", 'DateTime'>
    readonly sentAt: FieldRef<"Outbox", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Outbox findUnique
   */
  export type OutboxFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outbox
     */
    select?: OutboxSelect<ExtArgs> | null
    /**
     * Filter, which Outbox to fetch.
     */
    where: OutboxWhereUniqueInput
  }

  /**
   * Outbox findUniqueOrThrow
   */
  export type OutboxFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outbox
     */
    select?: OutboxSelect<ExtArgs> | null
    /**
     * Filter, which Outbox to fetch.
     */
    where: OutboxWhereUniqueInput
  }

  /**
   * Outbox findFirst
   */
  export type OutboxFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outbox
     */
    select?: OutboxSelect<ExtArgs> | null
    /**
     * Filter, which Outbox to fetch.
     */
    where?: OutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outboxes to fetch.
     */
    orderBy?: OutboxOrderByWithRelationInput | OutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Outboxes.
     */
    cursor?: OutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Outboxes.
     */
    distinct?: OutboxScalarFieldEnum | OutboxScalarFieldEnum[]
  }

  /**
   * Outbox findFirstOrThrow
   */
  export type OutboxFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outbox
     */
    select?: OutboxSelect<ExtArgs> | null
    /**
     * Filter, which Outbox to fetch.
     */
    where?: OutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outboxes to fetch.
     */
    orderBy?: OutboxOrderByWithRelationInput | OutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Outboxes.
     */
    cursor?: OutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Outboxes.
     */
    distinct?: OutboxScalarFieldEnum | OutboxScalarFieldEnum[]
  }

  /**
   * Outbox findMany
   */
  export type OutboxFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outbox
     */
    select?: OutboxSelect<ExtArgs> | null
    /**
     * Filter, which Outboxes to fetch.
     */
    where?: OutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outboxes to fetch.
     */
    orderBy?: OutboxOrderByWithRelationInput | OutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Outboxes.
     */
    cursor?: OutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outboxes.
     */
    skip?: number
    distinct?: OutboxScalarFieldEnum | OutboxScalarFieldEnum[]
  }

  /**
   * Outbox create
   */
  export type OutboxCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outbox
     */
    select?: OutboxSelect<ExtArgs> | null
    /**
     * The data needed to create a Outbox.
     */
    data: XOR<OutboxCreateInput, OutboxUncheckedCreateInput>
  }

  /**
   * Outbox createMany
   */
  export type OutboxCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Outboxes.
     */
    data: OutboxCreateManyInput | OutboxCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Outbox createManyAndReturn
   */
  export type OutboxCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outbox
     */
    select?: OutboxSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Outboxes.
     */
    data: OutboxCreateManyInput | OutboxCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Outbox update
   */
  export type OutboxUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outbox
     */
    select?: OutboxSelect<ExtArgs> | null
    /**
     * The data needed to update a Outbox.
     */
    data: XOR<OutboxUpdateInput, OutboxUncheckedUpdateInput>
    /**
     * Choose, which Outbox to update.
     */
    where: OutboxWhereUniqueInput
  }

  /**
   * Outbox updateMany
   */
  export type OutboxUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Outboxes.
     */
    data: XOR<OutboxUpdateManyMutationInput, OutboxUncheckedUpdateManyInput>
    /**
     * Filter which Outboxes to update
     */
    where?: OutboxWhereInput
  }

  /**
   * Outbox upsert
   */
  export type OutboxUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outbox
     */
    select?: OutboxSelect<ExtArgs> | null
    /**
     * The filter to search for the Outbox to update in case it exists.
     */
    where: OutboxWhereUniqueInput
    /**
     * In case the Outbox found by the `where` argument doesn't exist, create a new Outbox with this data.
     */
    create: XOR<OutboxCreateInput, OutboxUncheckedCreateInput>
    /**
     * In case the Outbox was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutboxUpdateInput, OutboxUncheckedUpdateInput>
  }

  /**
   * Outbox delete
   */
  export type OutboxDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outbox
     */
    select?: OutboxSelect<ExtArgs> | null
    /**
     * Filter which Outbox to delete.
     */
    where: OutboxWhereUniqueInput
  }

  /**
   * Outbox deleteMany
   */
  export type OutboxDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Outboxes to delete
     */
    where?: OutboxWhereInput
  }

  /**
   * Outbox without action
   */
  export type OutboxDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outbox
     */
    select?: OutboxSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProductScalarFieldEnum: {
    id: 'id',
    sku: 'sku',
    name: 'name',
    description: 'description',
    price: 'price',
    currency: 'currency',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    parentId: 'parentId'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProductCategoryScalarFieldEnum: {
    productId: 'productId',
    categoryId: 'categoryId'
  };

  export type ProductCategoryScalarFieldEnum = (typeof ProductCategoryScalarFieldEnum)[keyof typeof ProductCategoryScalarFieldEnum]


  export const StockScalarFieldEnum: {
    productId: 'productId',
    quantityAvailable: 'quantityAvailable',
    quantityReserved: 'quantityReserved',
    updatedAt: 'updatedAt'
  };

  export type StockScalarFieldEnum = (typeof StockScalarFieldEnum)[keyof typeof StockScalarFieldEnum]


  export const ProcessedEventScalarFieldEnum: {
    eventId: 'eventId',
    processedAt: 'processedAt'
  };

  export type ProcessedEventScalarFieldEnum = (typeof ProcessedEventScalarFieldEnum)[keyof typeof ProcessedEventScalarFieldEnum]


  export const OutboxScalarFieldEnum: {
    id: 'id',
    routingKey: 'routingKey',
    payload: 'payload',
    sent: 'sent',
    createdAt: 'createdAt',
    sentAt: 'sentAt'
  };

  export type OutboxScalarFieldEnum = (typeof OutboxScalarFieldEnum)[keyof typeof OutboxScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    sku?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Product"> | string
    status?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    categories?: ProductCategoryListRelationFilter
    stock?: XOR<StockNullableRelationFilter, StockWhereInput> | null
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categories?: ProductCategoryOrderByRelationAggregateInput
    stock?: StockOrderByWithRelationInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sku?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Product"> | string
    status?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    categories?: ProductCategoryListRelationFilter
    stock?: XOR<StockNullableRelationFilter, StockWhereInput> | null
  }, "id" | "sku">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    sku?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    price?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"Product"> | string
    status?: StringWithAggregatesFilter<"Product"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    parentId?: StringNullableFilter<"Category"> | string | null
    parent?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    products?: ProductCategoryListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentId?: SortOrderInput | SortOrder
    parent?: CategoryOrderByWithRelationInput
    children?: CategoryOrderByRelationAggregateInput
    products?: ProductCategoryOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    parentId?: StringNullableFilter<"Category"> | string | null
    parent?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    products?: ProductCategoryListRelationFilter
  }, "id" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentId?: SortOrderInput | SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    slug?: StringWithAggregatesFilter<"Category"> | string
    parentId?: StringNullableWithAggregatesFilter<"Category"> | string | null
  }

  export type ProductCategoryWhereInput = {
    AND?: ProductCategoryWhereInput | ProductCategoryWhereInput[]
    OR?: ProductCategoryWhereInput[]
    NOT?: ProductCategoryWhereInput | ProductCategoryWhereInput[]
    productId?: StringFilter<"ProductCategory"> | string
    categoryId?: StringFilter<"ProductCategory"> | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
  }

  export type ProductCategoryOrderByWithRelationInput = {
    productId?: SortOrder
    categoryId?: SortOrder
    product?: ProductOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
  }

  export type ProductCategoryWhereUniqueInput = Prisma.AtLeast<{
    productId_categoryId?: ProductCategoryProductIdCategoryIdCompoundUniqueInput
    AND?: ProductCategoryWhereInput | ProductCategoryWhereInput[]
    OR?: ProductCategoryWhereInput[]
    NOT?: ProductCategoryWhereInput | ProductCategoryWhereInput[]
    productId?: StringFilter<"ProductCategory"> | string
    categoryId?: StringFilter<"ProductCategory"> | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
  }, "productId_categoryId">

  export type ProductCategoryOrderByWithAggregationInput = {
    productId?: SortOrder
    categoryId?: SortOrder
    _count?: ProductCategoryCountOrderByAggregateInput
    _max?: ProductCategoryMaxOrderByAggregateInput
    _min?: ProductCategoryMinOrderByAggregateInput
  }

  export type ProductCategoryScalarWhereWithAggregatesInput = {
    AND?: ProductCategoryScalarWhereWithAggregatesInput | ProductCategoryScalarWhereWithAggregatesInput[]
    OR?: ProductCategoryScalarWhereWithAggregatesInput[]
    NOT?: ProductCategoryScalarWhereWithAggregatesInput | ProductCategoryScalarWhereWithAggregatesInput[]
    productId?: StringWithAggregatesFilter<"ProductCategory"> | string
    categoryId?: StringWithAggregatesFilter<"ProductCategory"> | string
  }

  export type StockWhereInput = {
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    productId?: StringFilter<"Stock"> | string
    quantityAvailable?: IntFilter<"Stock"> | number
    quantityReserved?: IntFilter<"Stock"> | number
    updatedAt?: DateTimeFilter<"Stock"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type StockOrderByWithRelationInput = {
    productId?: SortOrder
    quantityAvailable?: SortOrder
    quantityReserved?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type StockWhereUniqueInput = Prisma.AtLeast<{
    productId?: string
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    quantityAvailable?: IntFilter<"Stock"> | number
    quantityReserved?: IntFilter<"Stock"> | number
    updatedAt?: DateTimeFilter<"Stock"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "productId">

  export type StockOrderByWithAggregationInput = {
    productId?: SortOrder
    quantityAvailable?: SortOrder
    quantityReserved?: SortOrder
    updatedAt?: SortOrder
    _count?: StockCountOrderByAggregateInput
    _avg?: StockAvgOrderByAggregateInput
    _max?: StockMaxOrderByAggregateInput
    _min?: StockMinOrderByAggregateInput
    _sum?: StockSumOrderByAggregateInput
  }

  export type StockScalarWhereWithAggregatesInput = {
    AND?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    OR?: StockScalarWhereWithAggregatesInput[]
    NOT?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    productId?: StringWithAggregatesFilter<"Stock"> | string
    quantityAvailable?: IntWithAggregatesFilter<"Stock"> | number
    quantityReserved?: IntWithAggregatesFilter<"Stock"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"Stock"> | Date | string
  }

  export type ProcessedEventWhereInput = {
    AND?: ProcessedEventWhereInput | ProcessedEventWhereInput[]
    OR?: ProcessedEventWhereInput[]
    NOT?: ProcessedEventWhereInput | ProcessedEventWhereInput[]
    eventId?: StringFilter<"ProcessedEvent"> | string
    processedAt?: DateTimeFilter<"ProcessedEvent"> | Date | string
  }

  export type ProcessedEventOrderByWithRelationInput = {
    eventId?: SortOrder
    processedAt?: SortOrder
  }

  export type ProcessedEventWhereUniqueInput = Prisma.AtLeast<{
    eventId?: string
    AND?: ProcessedEventWhereInput | ProcessedEventWhereInput[]
    OR?: ProcessedEventWhereInput[]
    NOT?: ProcessedEventWhereInput | ProcessedEventWhereInput[]
    processedAt?: DateTimeFilter<"ProcessedEvent"> | Date | string
  }, "eventId">

  export type ProcessedEventOrderByWithAggregationInput = {
    eventId?: SortOrder
    processedAt?: SortOrder
    _count?: ProcessedEventCountOrderByAggregateInput
    _max?: ProcessedEventMaxOrderByAggregateInput
    _min?: ProcessedEventMinOrderByAggregateInput
  }

  export type ProcessedEventScalarWhereWithAggregatesInput = {
    AND?: ProcessedEventScalarWhereWithAggregatesInput | ProcessedEventScalarWhereWithAggregatesInput[]
    OR?: ProcessedEventScalarWhereWithAggregatesInput[]
    NOT?: ProcessedEventScalarWhereWithAggregatesInput | ProcessedEventScalarWhereWithAggregatesInput[]
    eventId?: StringWithAggregatesFilter<"ProcessedEvent"> | string
    processedAt?: DateTimeWithAggregatesFilter<"ProcessedEvent"> | Date | string
  }

  export type OutboxWhereInput = {
    AND?: OutboxWhereInput | OutboxWhereInput[]
    OR?: OutboxWhereInput[]
    NOT?: OutboxWhereInput | OutboxWhereInput[]
    id?: StringFilter<"Outbox"> | string
    routingKey?: StringFilter<"Outbox"> | string
    payload?: JsonFilter<"Outbox">
    sent?: BoolFilter<"Outbox"> | boolean
    createdAt?: DateTimeFilter<"Outbox"> | Date | string
    sentAt?: DateTimeNullableFilter<"Outbox"> | Date | string | null
  }

  export type OutboxOrderByWithRelationInput = {
    id?: SortOrder
    routingKey?: SortOrder
    payload?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
  }

  export type OutboxWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OutboxWhereInput | OutboxWhereInput[]
    OR?: OutboxWhereInput[]
    NOT?: OutboxWhereInput | OutboxWhereInput[]
    routingKey?: StringFilter<"Outbox"> | string
    payload?: JsonFilter<"Outbox">
    sent?: BoolFilter<"Outbox"> | boolean
    createdAt?: DateTimeFilter<"Outbox"> | Date | string
    sentAt?: DateTimeNullableFilter<"Outbox"> | Date | string | null
  }, "id">

  export type OutboxOrderByWithAggregationInput = {
    id?: SortOrder
    routingKey?: SortOrder
    payload?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    _count?: OutboxCountOrderByAggregateInput
    _max?: OutboxMaxOrderByAggregateInput
    _min?: OutboxMinOrderByAggregateInput
  }

  export type OutboxScalarWhereWithAggregatesInput = {
    AND?: OutboxScalarWhereWithAggregatesInput | OutboxScalarWhereWithAggregatesInput[]
    OR?: OutboxScalarWhereWithAggregatesInput[]
    NOT?: OutboxScalarWhereWithAggregatesInput | OutboxScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Outbox"> | string
    routingKey?: StringWithAggregatesFilter<"Outbox"> | string
    payload?: JsonWithAggregatesFilter<"Outbox">
    sent?: BoolWithAggregatesFilter<"Outbox"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Outbox"> | Date | string
    sentAt?: DateTimeNullableWithAggregatesFilter<"Outbox"> | Date | string | null
  }

  export type ProductCreateInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ProductCategoryCreateNestedManyWithoutProductInput
    stock?: StockCreateNestedOneWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ProductCategoryUncheckedCreateNestedManyWithoutProductInput
    stock?: StockUncheckedCreateNestedOneWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ProductCategoryUpdateManyWithoutProductNestedInput
    stock?: StockUpdateOneWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ProductCategoryUncheckedUpdateManyWithoutProductNestedInput
    stock?: StockUncheckedUpdateOneWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    slug: string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
    products?: ProductCategoryCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    parentId?: string | null
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    products?: ProductCategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
    products?: ProductCategoryUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    products?: ProductCategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    slug: string
    parentId?: string | null
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductCategoryCreateInput = {
    product: ProductCreateNestedOneWithoutCategoriesInput
    category: CategoryCreateNestedOneWithoutProductsInput
  }

  export type ProductCategoryUncheckedCreateInput = {
    productId: string
    categoryId: string
  }

  export type ProductCategoryUpdateInput = {
    product?: ProductUpdateOneRequiredWithoutCategoriesNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductCategoryUncheckedUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCategoryCreateManyInput = {
    productId: string
    categoryId: string
  }

  export type ProductCategoryUpdateManyMutationInput = {

  }

  export type ProductCategoryUncheckedUpdateManyInput = {
    productId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type StockCreateInput = {
    quantityAvailable?: number
    quantityReserved?: number
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutStockInput
  }

  export type StockUncheckedCreateInput = {
    productId: string
    quantityAvailable?: number
    quantityReserved?: number
    updatedAt?: Date | string
  }

  export type StockUpdateInput = {
    quantityAvailable?: IntFieldUpdateOperationsInput | number
    quantityReserved?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutStockNestedInput
  }

  export type StockUncheckedUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    quantityAvailable?: IntFieldUpdateOperationsInput | number
    quantityReserved?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockCreateManyInput = {
    productId: string
    quantityAvailable?: number
    quantityReserved?: number
    updatedAt?: Date | string
  }

  export type StockUpdateManyMutationInput = {
    quantityAvailable?: IntFieldUpdateOperationsInput | number
    quantityReserved?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockUncheckedUpdateManyInput = {
    productId?: StringFieldUpdateOperationsInput | string
    quantityAvailable?: IntFieldUpdateOperationsInput | number
    quantityReserved?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEventCreateInput = {
    eventId: string
    processedAt?: Date | string
  }

  export type ProcessedEventUncheckedCreateInput = {
    eventId: string
    processedAt?: Date | string
  }

  export type ProcessedEventUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEventUncheckedUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEventCreateManyInput = {
    eventId: string
    processedAt?: Date | string
  }

  export type ProcessedEventUpdateManyMutationInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEventUncheckedUpdateManyInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutboxCreateInput = {
    id?: string
    routingKey: string
    payload: JsonNullValueInput | InputJsonValue
    sent?: boolean
    createdAt?: Date | string
    sentAt?: Date | string | null
  }

  export type OutboxUncheckedCreateInput = {
    id?: string
    routingKey: string
    payload: JsonNullValueInput | InputJsonValue
    sent?: boolean
    createdAt?: Date | string
    sentAt?: Date | string | null
  }

  export type OutboxUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    routingKey?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OutboxUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    routingKey?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OutboxCreateManyInput = {
    id?: string
    routingKey: string
    payload: JsonNullValueInput | InputJsonValue
    sent?: boolean
    createdAt?: Date | string
    sentAt?: Date | string | null
  }

  export type OutboxUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    routingKey?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OutboxUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    routingKey?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProductCategoryListRelationFilter = {
    every?: ProductCategoryWhereInput
    some?: ProductCategoryWhereInput
    none?: ProductCategoryWhereInput
  }

  export type StockNullableRelationFilter = {
    is?: StockWhereInput | null
    isNot?: StockWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CategoryNullableRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentId?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentId?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentId?: SortOrder
  }

  export type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type ProductCategoryProductIdCategoryIdCompoundUniqueInput = {
    productId: string
    categoryId: string
  }

  export type ProductCategoryCountOrderByAggregateInput = {
    productId?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductCategoryMaxOrderByAggregateInput = {
    productId?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductCategoryMinOrderByAggregateInput = {
    productId?: SortOrder
    categoryId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StockCountOrderByAggregateInput = {
    productId?: SortOrder
    quantityAvailable?: SortOrder
    quantityReserved?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockAvgOrderByAggregateInput = {
    quantityAvailable?: SortOrder
    quantityReserved?: SortOrder
  }

  export type StockMaxOrderByAggregateInput = {
    productId?: SortOrder
    quantityAvailable?: SortOrder
    quantityReserved?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockMinOrderByAggregateInput = {
    productId?: SortOrder
    quantityAvailable?: SortOrder
    quantityReserved?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockSumOrderByAggregateInput = {
    quantityAvailable?: SortOrder
    quantityReserved?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ProcessedEventCountOrderByAggregateInput = {
    eventId?: SortOrder
    processedAt?: SortOrder
  }

  export type ProcessedEventMaxOrderByAggregateInput = {
    eventId?: SortOrder
    processedAt?: SortOrder
  }

  export type ProcessedEventMinOrderByAggregateInput = {
    eventId?: SortOrder
    processedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OutboxCountOrderByAggregateInput = {
    id?: SortOrder
    routingKey?: SortOrder
    payload?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
  }

  export type OutboxMaxOrderByAggregateInput = {
    id?: SortOrder
    routingKey?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
  }

  export type OutboxMinOrderByAggregateInput = {
    id?: SortOrder
    routingKey?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProductCategoryCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductCategoryCreateWithoutProductInput, ProductCategoryUncheckedCreateWithoutProductInput> | ProductCategoryCreateWithoutProductInput[] | ProductCategoryUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutProductInput | ProductCategoryCreateOrConnectWithoutProductInput[]
    createMany?: ProductCategoryCreateManyProductInputEnvelope
    connect?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
  }

  export type StockCreateNestedOneWithoutProductInput = {
    create?: XOR<StockCreateWithoutProductInput, StockUncheckedCreateWithoutProductInput>
    connectOrCreate?: StockCreateOrConnectWithoutProductInput
    connect?: StockWhereUniqueInput
  }

  export type ProductCategoryUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductCategoryCreateWithoutProductInput, ProductCategoryUncheckedCreateWithoutProductInput> | ProductCategoryCreateWithoutProductInput[] | ProductCategoryUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutProductInput | ProductCategoryCreateOrConnectWithoutProductInput[]
    createMany?: ProductCategoryCreateManyProductInputEnvelope
    connect?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
  }

  export type StockUncheckedCreateNestedOneWithoutProductInput = {
    create?: XOR<StockCreateWithoutProductInput, StockUncheckedCreateWithoutProductInput>
    connectOrCreate?: StockCreateOrConnectWithoutProductInput
    connect?: StockWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProductCategoryUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductCategoryCreateWithoutProductInput, ProductCategoryUncheckedCreateWithoutProductInput> | ProductCategoryCreateWithoutProductInput[] | ProductCategoryUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutProductInput | ProductCategoryCreateOrConnectWithoutProductInput[]
    upsert?: ProductCategoryUpsertWithWhereUniqueWithoutProductInput | ProductCategoryUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductCategoryCreateManyProductInputEnvelope
    set?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    disconnect?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    delete?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    connect?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    update?: ProductCategoryUpdateWithWhereUniqueWithoutProductInput | ProductCategoryUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductCategoryUpdateManyWithWhereWithoutProductInput | ProductCategoryUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductCategoryScalarWhereInput | ProductCategoryScalarWhereInput[]
  }

  export type StockUpdateOneWithoutProductNestedInput = {
    create?: XOR<StockCreateWithoutProductInput, StockUncheckedCreateWithoutProductInput>
    connectOrCreate?: StockCreateOrConnectWithoutProductInput
    upsert?: StockUpsertWithoutProductInput
    disconnect?: StockWhereInput | boolean
    delete?: StockWhereInput | boolean
    connect?: StockWhereUniqueInput
    update?: XOR<XOR<StockUpdateToOneWithWhereWithoutProductInput, StockUpdateWithoutProductInput>, StockUncheckedUpdateWithoutProductInput>
  }

  export type ProductCategoryUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductCategoryCreateWithoutProductInput, ProductCategoryUncheckedCreateWithoutProductInput> | ProductCategoryCreateWithoutProductInput[] | ProductCategoryUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutProductInput | ProductCategoryCreateOrConnectWithoutProductInput[]
    upsert?: ProductCategoryUpsertWithWhereUniqueWithoutProductInput | ProductCategoryUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductCategoryCreateManyProductInputEnvelope
    set?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    disconnect?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    delete?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    connect?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    update?: ProductCategoryUpdateWithWhereUniqueWithoutProductInput | ProductCategoryUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductCategoryUpdateManyWithWhereWithoutProductInput | ProductCategoryUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductCategoryScalarWhereInput | ProductCategoryScalarWhereInput[]
  }

  export type StockUncheckedUpdateOneWithoutProductNestedInput = {
    create?: XOR<StockCreateWithoutProductInput, StockUncheckedCreateWithoutProductInput>
    connectOrCreate?: StockCreateOrConnectWithoutProductInput
    upsert?: StockUpsertWithoutProductInput
    disconnect?: StockWhereInput | boolean
    delete?: StockWhereInput | boolean
    connect?: StockWhereUniqueInput
    update?: XOR<XOR<StockUpdateToOneWithWhereWithoutProductInput, StockUpdateWithoutProductInput>, StockUncheckedUpdateWithoutProductInput>
  }

  export type CategoryCreateNestedOneWithoutChildrenInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    connect?: CategoryWhereUniqueInput
  }

  export type CategoryCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductCategoryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCategoryCreateWithoutCategoryInput, ProductCategoryUncheckedCreateWithoutCategoryInput> | ProductCategoryCreateWithoutCategoryInput[] | ProductCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutCategoryInput | ProductCategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCategoryCreateManyCategoryInputEnvelope
    connect?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductCategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCategoryCreateWithoutCategoryInput, ProductCategoryUncheckedCreateWithoutCategoryInput> | ProductCategoryCreateWithoutCategoryInput[] | ProductCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutCategoryInput | ProductCategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCategoryCreateManyCategoryInputEnvelope
    connect?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
  }

  export type CategoryUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    upsert?: CategoryUpsertWithoutChildrenInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutChildrenInput, CategoryUpdateWithoutChildrenInput>, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductCategoryUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCategoryCreateWithoutCategoryInput, ProductCategoryUncheckedCreateWithoutCategoryInput> | ProductCategoryCreateWithoutCategoryInput[] | ProductCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutCategoryInput | ProductCategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput | ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCategoryCreateManyCategoryInputEnvelope
    set?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    disconnect?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    delete?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    connect?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    update?: ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput | ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductCategoryUpdateManyWithWhereWithoutCategoryInput | ProductCategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductCategoryScalarWhereInput | ProductCategoryScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductCategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCategoryCreateWithoutCategoryInput, ProductCategoryUncheckedCreateWithoutCategoryInput> | ProductCategoryCreateWithoutCategoryInput[] | ProductCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutCategoryInput | ProductCategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput | ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCategoryCreateManyCategoryInputEnvelope
    set?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    disconnect?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    delete?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    connect?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[]
    update?: ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput | ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductCategoryUpdateManyWithWhereWithoutCategoryInput | ProductCategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductCategoryScalarWhereInput | ProductCategoryScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<ProductCreateWithoutCategoriesInput, ProductUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCategoriesInput
    connect?: ProductWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<ProductCreateWithoutCategoriesInput, ProductUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCategoriesInput
    upsert?: ProductUpsertWithoutCategoriesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutCategoriesInput, ProductUpdateWithoutCategoriesInput>, ProductUncheckedUpdateWithoutCategoriesInput>
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type ProductCreateNestedOneWithoutStockInput = {
    create?: XOR<ProductCreateWithoutStockInput, ProductUncheckedCreateWithoutStockInput>
    connectOrCreate?: ProductCreateOrConnectWithoutStockInput
    connect?: ProductWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductUpdateOneRequiredWithoutStockNestedInput = {
    create?: XOR<ProductCreateWithoutStockInput, ProductUncheckedCreateWithoutStockInput>
    connectOrCreate?: ProductCreateOrConnectWithoutStockInput
    upsert?: ProductUpsertWithoutStockInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutStockInput, ProductUpdateWithoutStockInput>, ProductUncheckedUpdateWithoutStockInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProductCategoryCreateWithoutProductInput = {
    category: CategoryCreateNestedOneWithoutProductsInput
  }

  export type ProductCategoryUncheckedCreateWithoutProductInput = {
    categoryId: string
  }

  export type ProductCategoryCreateOrConnectWithoutProductInput = {
    where: ProductCategoryWhereUniqueInput
    create: XOR<ProductCategoryCreateWithoutProductInput, ProductCategoryUncheckedCreateWithoutProductInput>
  }

  export type ProductCategoryCreateManyProductInputEnvelope = {
    data: ProductCategoryCreateManyProductInput | ProductCategoryCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type StockCreateWithoutProductInput = {
    quantityAvailable?: number
    quantityReserved?: number
    updatedAt?: Date | string
  }

  export type StockUncheckedCreateWithoutProductInput = {
    quantityAvailable?: number
    quantityReserved?: number
    updatedAt?: Date | string
  }

  export type StockCreateOrConnectWithoutProductInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutProductInput, StockUncheckedCreateWithoutProductInput>
  }

  export type ProductCategoryUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductCategoryWhereUniqueInput
    update: XOR<ProductCategoryUpdateWithoutProductInput, ProductCategoryUncheckedUpdateWithoutProductInput>
    create: XOR<ProductCategoryCreateWithoutProductInput, ProductCategoryUncheckedCreateWithoutProductInput>
  }

  export type ProductCategoryUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductCategoryWhereUniqueInput
    data: XOR<ProductCategoryUpdateWithoutProductInput, ProductCategoryUncheckedUpdateWithoutProductInput>
  }

  export type ProductCategoryUpdateManyWithWhereWithoutProductInput = {
    where: ProductCategoryScalarWhereInput
    data: XOR<ProductCategoryUpdateManyMutationInput, ProductCategoryUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductCategoryScalarWhereInput = {
    AND?: ProductCategoryScalarWhereInput | ProductCategoryScalarWhereInput[]
    OR?: ProductCategoryScalarWhereInput[]
    NOT?: ProductCategoryScalarWhereInput | ProductCategoryScalarWhereInput[]
    productId?: StringFilter<"ProductCategory"> | string
    categoryId?: StringFilter<"ProductCategory"> | string
  }

  export type StockUpsertWithoutProductInput = {
    update: XOR<StockUpdateWithoutProductInput, StockUncheckedUpdateWithoutProductInput>
    create: XOR<StockCreateWithoutProductInput, StockUncheckedCreateWithoutProductInput>
    where?: StockWhereInput
  }

  export type StockUpdateToOneWithWhereWithoutProductInput = {
    where?: StockWhereInput
    data: XOR<StockUpdateWithoutProductInput, StockUncheckedUpdateWithoutProductInput>
  }

  export type StockUpdateWithoutProductInput = {
    quantityAvailable?: IntFieldUpdateOperationsInput | number
    quantityReserved?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockUncheckedUpdateWithoutProductInput = {
    quantityAvailable?: IntFieldUpdateOperationsInput | number
    quantityReserved?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateWithoutChildrenInput = {
    id?: string
    name: string
    slug: string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    products?: ProductCategoryCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutChildrenInput = {
    id?: string
    name: string
    slug: string
    parentId?: string | null
    products?: ProductCategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutChildrenInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
  }

  export type CategoryCreateWithoutParentInput = {
    id?: string
    name: string
    slug: string
    children?: CategoryCreateNestedManyWithoutParentInput
    products?: ProductCategoryCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutParentInput = {
    id?: string
    name: string
    slug: string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    products?: ProductCategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutParentInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryCreateManyParentInputEnvelope = {
    data: CategoryCreateManyParentInput | CategoryCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type ProductCategoryCreateWithoutCategoryInput = {
    product: ProductCreateNestedOneWithoutCategoriesInput
  }

  export type ProductCategoryUncheckedCreateWithoutCategoryInput = {
    productId: string
  }

  export type ProductCategoryCreateOrConnectWithoutCategoryInput = {
    where: ProductCategoryWhereUniqueInput
    create: XOR<ProductCategoryCreateWithoutCategoryInput, ProductCategoryUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCategoryCreateManyCategoryInputEnvelope = {
    data: ProductCategoryCreateManyCategoryInput | ProductCategoryCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutChildrenInput = {
    update: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutChildrenInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    products?: ProductCategoryUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    products?: ProductCategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUpsertWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
  }

  export type CategoryUpdateManyWithWhereWithoutParentInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutParentInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    parentId?: StringNullableFilter<"Category"> | string | null
  }

  export type ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductCategoryWhereUniqueInput
    update: XOR<ProductCategoryUpdateWithoutCategoryInput, ProductCategoryUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCategoryCreateWithoutCategoryInput, ProductCategoryUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductCategoryWhereUniqueInput
    data: XOR<ProductCategoryUpdateWithoutCategoryInput, ProductCategoryUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductCategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductCategoryScalarWhereInput
    data: XOR<ProductCategoryUpdateManyMutationInput, ProductCategoryUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductCreateWithoutCategoriesInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    stock?: StockCreateNestedOneWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoriesInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    stock?: StockUncheckedCreateNestedOneWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoriesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoriesInput, ProductUncheckedCreateWithoutCategoriesInput>
  }

  export type CategoryCreateWithoutProductsInput = {
    id?: string
    name: string
    slug: string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    slug: string
    parentId?: string | null
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type ProductUpsertWithoutCategoriesInput = {
    update: XOR<ProductUpdateWithoutCategoriesInput, ProductUncheckedUpdateWithoutCategoriesInput>
    create: XOR<ProductCreateWithoutCategoriesInput, ProductUncheckedCreateWithoutCategoriesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutCategoriesInput, ProductUncheckedUpdateWithoutCategoriesInput>
  }

  export type ProductUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUpdateOneWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUncheckedUpdateOneWithoutProductNestedInput
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
  }

  export type ProductCreateWithoutStockInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ProductCategoryCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutStockInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ProductCategoryUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutStockInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutStockInput, ProductUncheckedCreateWithoutStockInput>
  }

  export type ProductUpsertWithoutStockInput = {
    update: XOR<ProductUpdateWithoutStockInput, ProductUncheckedUpdateWithoutStockInput>
    create: XOR<ProductCreateWithoutStockInput, ProductUncheckedCreateWithoutStockInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutStockInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutStockInput, ProductUncheckedUpdateWithoutStockInput>
  }

  export type ProductUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ProductCategoryUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ProductCategoryUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCategoryCreateManyProductInput = {
    categoryId: string
  }

  export type ProductCategoryUpdateWithoutProductInput = {
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductCategoryUncheckedUpdateWithoutProductInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCategoryUncheckedUpdateManyWithoutProductInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryCreateManyParentInput = {
    id?: string
    name: string
    slug: string
  }

  export type ProductCategoryCreateManyCategoryInput = {
    productId: string
  }

  export type CategoryUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    children?: CategoryUpdateManyWithoutParentNestedInput
    products?: ProductCategoryUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    products?: ProductCategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCategoryUpdateWithoutCategoryInput = {
    product?: ProductUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type ProductCategoryUncheckedUpdateWithoutCategoryInput = {
    productId?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCategoryUncheckedUpdateManyWithoutCategoryInput = {
    productId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ProductCountOutputTypeDefaultArgs instead
     */
    export type ProductCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductCategoryDefaultArgs instead
     */
    export type ProductCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StockDefaultArgs instead
     */
    export type StockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StockDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProcessedEventDefaultArgs instead
     */
    export type ProcessedEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProcessedEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OutboxDefaultArgs instead
     */
    export type OutboxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OutboxDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}