import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Route } from '../models/route';
import { ROUTES_MOCK } from '../data/routes.mock';

@Injectable({ providedIn: 'root' })
export class RouteService {
  getRoutes(): Observable<Route[]> {
    return of(ROUTES_MOCK);
  }
}
