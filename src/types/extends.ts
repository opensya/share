export type MaybeArray<T> = T | T[];

export type Nullable<T> = T | null;

export type Nil<T> = T | null | undefined;

export type Undefinedable<T> = T | undefined;

export interface IDataResult<T = any> {
  items: T[];
  page: number;
  pageSize: number;
  totalPages: number;

  /** le total des items récupéré */
  total: number;

  /** le total des items qui coccrespond à la rechche */
  totalItems: number;
}

export type Result<T> = IDataResult<T>;

/** @deprecated use instead of MayBePromise */
export type Promisable<T> = Promise<T> | T;

export type MayBePromise<T> = Promise<T> | T;

export type Join<T, K> = T & K;

export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined
  | Function;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredKey<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
