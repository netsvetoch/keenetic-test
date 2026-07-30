import { TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { RouteTableComponent } from './route-table.component';

async function setup() {
  await TestBed.configureTestingModule({ imports: [RouteTableComponent] }).compileComponents();
  const fixture = TestBed.createComponent(RouteTableComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

function columnValues(fixture: { nativeElement: HTMLElement }, colIndex: number): string[] {
  return Array.from(
    fixture.nativeElement.querySelectorAll(`tbody tr td:nth-child(${colIndex})`),
  ).map((td) => td.textContent!.trim().split(' / ')[0]);
}

describe('RouteTableComponent', () => {
  beforeEach(() => TestBed.resetTestingModule());

  it('renders all 9 routes', async () => {
    const fixture = await setup();
    expect(fixture.nativeElement.querySelectorAll('tbody tr')).toHaveLength(9);
  });

  it('sorts by address ascending by default (numeric IP order)', async () => {
    const fixture = await setup();
    const addresses = columnValues(fixture, 1);
    expect(addresses[0]).toBe('0.0.0.0');
    expect(addresses.indexOf('8.8.8.8')).toBeLessThan(addresses.indexOf('10.0.0.0'));
  });

  it('toggles direction when clicking the active column header', async () => {
    const fixture = await setup();
    const headers = fixture.nativeElement.querySelectorAll('th button');
    (headers[0] as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const desc = columnValues(fixture, 1);
    expect(desc[0]).toBe('203.0.113.0');
  });

  it('sorts by gateway with numeric IP comparison', async () => {
    const fixture = await setup();
    const headers = fixture.nativeElement.querySelectorAll('th button');
    (headers[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(columnValues(fixture, 2)[0]).toBe('0.0.0.0');
  });

  it('sorts by interface as a string', async () => {
    const fixture = await setup();
    const headers = fixture.nativeElement.querySelectorAll('th button');
    (headers[2] as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(columnValues(fixture, 3)[0]).toBe('GigabitEthernet0');
  });
});
