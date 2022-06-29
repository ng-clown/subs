import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Subs {

  #subscriptions: Subscription[] = [];

  constructor() { }

  public set new(subscription: Subscription) {
    this.#subscriptions.push(subscription);
  }

  public unsubscribeAll() {
    this.#subscriptions.forEach(item => {
      if (item.unsubscribe && typeof item.unsubscribe === 'function') {
        item.unsubscribe();
      }
    });
  }
}
