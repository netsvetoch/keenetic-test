import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { SortColumn, SortState } from '../models/route';
import { RouteService } from '../services/route.service';
import { sortRoutes } from '../utils/route-sort';

@Component({
  selector: 'app-route-table',
  imports: [AsyncPipe],
  templateUrl: './route-table.component.html',
  styleUrl: './route-table.component.css',
})
export class RouteTableComponent {
  private readonly routeService = inject(RouteService);

  protected readonly sortState$ = new BehaviorSubject<SortState>({
    column: 'address',
    direction: 'asc',
  });

  protected readonly sortedRoutes$ = combineLatest([
    this.routeService.getRoutes(),
    this.sortState$,
  ]).pipe(map(([routes, sort]) => sortRoutes(routes, sort)));

  protected toggleSort(column: SortColumn): void {
    const current = this.sortState$.value;
    this.sortState$.next({
      column,
      direction: current.column === column && current.direction === 'asc' ? 'desc' : 'asc',
    });
  }

  protected arrow(state: SortState, column: SortColumn): string {
    if (state.column !== column) return '';
    return state.direction === 'asc' ? '▲' : '▼';
  }
}
