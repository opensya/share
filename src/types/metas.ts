export type Metas = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type WithMetas<T> = {
  [P in keyof T]: T[P];
} & Metas;

// export type Collection<T> = Metas & T;

export type PaginateOptions = {
  offset: number;
  page: number;
  pageSize: number;
  all: boolean;
  sortBy: string;
  sortOrder: 1 | -1;
};
