import { describe, expect, it } from 'vitest';
import { compareIp, ipToLong, sortRoutes } from './route-sort';
import { Route } from '../models/route';

const r = (address: string, gateway: string, iface: string): Route => ({
  uuid: address,
  address,
  mask: '255.255.255.0',
  gateway,
  interface: iface,
});

describe('ipToLong', () => {
  it('converts dotted IPv4 to a 32-bit number', () => {
    expect(ipToLong('0.0.0.0')).toBe(0);
    expect(ipToLong('0.0.0.1')).toBe(1);
    expect(ipToLong('10.0.0.1')).toBe(167772161);
    expect(ipToLong('255.255.255.255')).toBe(4294967295);
  });
});

describe('compareIp', () => {
  it('compares numerically, not lexicographically', () => {
    expect(compareIp('10.0.0.2', '10.0.0.10')).toBeLessThan(0);
    expect(compareIp('192.168.1.1', '10.0.0.1')).toBeGreaterThan(0);
    expect(compareIp('8.8.8.8', '8.8.8.8')).toBe(0);
  });
});

describe('sortRoutes', () => {
  const routes = [
    r('10.0.0.10', '192.168.1.1', 'GigabitEthernet0'),
    r('10.0.0.2', '10.0.0.1', 'ISP'),
    r('192.168.1.0', '0.0.0.0', 'Bridge0'),
  ];

  it('sorts by address ascending using numeric IP comparison', () => {
    const sorted = sortRoutes(routes, { column: 'address', direction: 'asc' });
    expect(sorted.map((x) => x.address)).toEqual(['10.0.0.2', '10.0.0.10', '192.168.1.0']);
  });

  it('sorts by gateway descending using numeric IP comparison', () => {
    const sorted = sortRoutes(routes, { column: 'gateway', direction: 'desc' });
    expect(sorted.map((x) => x.gateway)).toEqual(['192.168.1.1', '10.0.0.1', '0.0.0.0']);
  });

  it('sorts by interface as a string', () => {
    const sorted = sortRoutes(routes, { column: 'interface', direction: 'asc' });
    expect(sorted.map((x) => x.interface)).toEqual(['Bridge0', 'GigabitEthernet0', 'ISP']);
  });

  it('does not mutate the input array', () => {
    const before = routes.map((x) => x.address);
    sortRoutes(routes, { column: 'address', direction: 'asc' });
    expect(routes.map((x) => x.address)).toEqual(before);
  });
});
