export class PaginatedExameDto<T> {
  data!: T[] | null;
  meta!: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}