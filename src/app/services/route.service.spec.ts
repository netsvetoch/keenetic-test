import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';
import { RouteService } from './route.service';
import { ROUTES_MOCK } from '../data/routes.mock';

describe('RouteService', () => {
  it('emits the mock routes', async () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(RouteService);
    const routes = await firstValueFrom(service.getRoutes());
    expect(routes).toEqual(ROUTES_MOCK);
    expect(routes).toHaveLength(9);
  });
});
