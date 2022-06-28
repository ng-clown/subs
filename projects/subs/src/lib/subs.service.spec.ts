import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { SubsService } from './subs.service';

describe('SubsService', () => {
  let service: SubsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a subscription', () => {
    const obs$ = of([]);
    expect(service['subscriptions'].length).toBe(0);
    service.new = obs$.subscribe(() => {});
    service.new = obs$.subscribe(() => {});
    service.new = obs$.subscribe(() => {});
    expect(service['subscriptions'].length).toBe(3);
  });

  it('should unsubscribe all subscriptions', () => {
    const obs$ = new Subject();
    expect(service['subscriptions'].length).toBe(0);
    service.new = obs$.subscribe(() => {});
    service.new = obs$.subscribe(() => {});
    service.new = obs$.subscribe(() => {});
    expect(service['subscriptions'].length).toBe(3);

    service['subscriptions'].forEach(item => {
      expect(item.closed).toBeFalse();
    });

    service.destroy();

    service['subscriptions'].forEach(item => {
      expect(item.closed).toBeTrue();
    });
  });

  it('should unsubscribe one subscription', () => {
    const obs$ = new Subject();
    expect(service['subscriptions'].length).toBe(0);
    const subs = obs$.subscribe(() => {});;
    service.new = obs$.subscribe(() => {});
    service.new = subs;
    service.new = obs$.subscribe(() => {});
    expect(service['subscriptions'].length).toBe(3);

    service['subscriptions'].forEach(item => {
      expect(item.closed).toBeFalse();
    });

    service.destroyOne(subs);

    service['subscriptions'].forEach(item => {
      if (item !== subs) {
        expect(item.closed).toBeFalse();
      } else {
        expect(item.closed).toBeTrue();
      }
    });
  });
});
