import { Route, SortState } from '../models/route';

export function ipToLong(ip: string): number {
  const [a, b, c, d] = ip.split('.').map(Number);
  return ((a << 24) | (b << 16) | (c << 8) | d) >>> 0;
}

export function compareIp(a: string, b: string): number {
  return ipToLong(a) - ipToLong(b);
}

export function sortRoutes(routes: Route[], sort: SortState): Route[] {
  const factor = sort.direction === 'asc' ? 1 : -1;
  const comparator =
    sort.column === 'interface'
      ? (a: Route, b: Route) => a.interface.localeCompare(b.interface) * factor
      : (a: Route, b: Route) => compareIp(a[sort.column], b[sort.column]) * factor;
  return [...routes].sort(comparator);
}
