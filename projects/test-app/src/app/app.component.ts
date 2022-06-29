import { Component } from '@angular/core';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'test-app';

  constructor(private user: User) {
    this.user.observable.subscribe(value => {
      console.log(value);
    });
    this.user.firstName = 'hi';
    this.user.unsubscribeAll();
    this.user.lastName = 'hi';
  }

}