import { TestBed } from '@angular/core/testing';

import { IsconnectedGuard } from './isconnected.guard';

describe('IsconnectedGuard', () => {
  let guard: IsconnectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsconnectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
