export interface Route {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}

export type SortColumn = 'address' | 'gateway' | 'interface';

export type SortDirection = 'asc' | 'desc';

export interface SortState {
  column: SortColumn;
  direction: SortDirection;
}
