import { Route } from '../models/route';

export const ROUTES_MOCK: Route[] = [
  { uuid: 'r1', address: '0.0.0.0', mask: '0.0.0.0', gateway: '203.0.113.1', interface: 'ISP' },
  {
    uuid: 'r2',
    address: '192.168.1.0',
    mask: '255.255.255.0',
    gateway: '0.0.0.0',
    interface: 'Home',
  },
  {
    uuid: 'r3',
    address: '10.0.0.0',
    mask: '255.0.0.0',
    gateway: '192.168.1.1',
    interface: 'GigabitEthernet0',
  },
  {
    uuid: 'r4',
    address: '172.16.0.0',
    mask: '255.240.0.0',
    gateway: '192.168.1.1',
    interface: 'GigabitEthernet1',
  },
  {
    uuid: 'r5',
    address: '192.168.100.0',
    mask: '255.255.255.0',
    gateway: '0.0.0.0',
    interface: 'Guest',
  },
  {
    uuid: 'r6',
    address: '8.8.8.8',
    mask: '255.255.255.255',
    gateway: '203.0.113.1',
    interface: 'ISP',
  },
  {
    uuid: 'r7',
    address: '10.10.10.0',
    mask: '255.255.255.0',
    gateway: '10.0.0.254',
    interface: 'GigabitEthernet0',
  },
  {
    uuid: 'r8',
    address: '192.168.2.0',
    mask: '255.255.255.0',
    gateway: '192.168.1.2',
    interface: 'Home',
  },
  {
    uuid: 'r9',
    address: '203.0.113.0',
    mask: '255.255.255.128',
    gateway: '0.0.0.0',
    interface: 'ISP',
  },
];
