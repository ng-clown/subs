import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubsService {

  private subscriptions: Subscription[] = [];

  constructor() { }

  public set new(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  public destroy() {
    this.subscriptions.forEach(item => {
      if (item.unsubscribe && typeof item.unsubscribe === 'function') {
        item.unsubscribe();
      }
    });
  }

  public destroyOne(subscription: Subscription) {
    this.subscriptions.forEach(item => {
      if (item === subscription && item.unsubscribe && typeof item.unsubscribe === 'function') {
        item.unsubscribe();
      }
    });
  }
}
