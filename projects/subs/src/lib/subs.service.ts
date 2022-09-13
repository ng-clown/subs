import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Subs {

  #subscriptions: Subscription[] = [];

  constructor() { }

  public add(observable: Observable<any>) {
    const originalSubscription = observable.subscribe;
    const self = this;
    observable.subscribe = function() {
      // @ts-ignore
      const subscription = originalSubscription.apply(this, arguments);
      self.#subscriptions.push(subscription);
      return subscription;
    }
  }

  public unsubscribeAll() {
    this.#subscriptions.forEach(item => {
      if (item.unsubscribe && typeof item.unsubscribe === 'function') {
        item.unsubscribe();
      }
    });
  }
}
