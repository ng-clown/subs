import { Component, OnInit } from '@angular/core';
import { Subs } from 'projects/subs/src/public-api';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'test-app';
  counter = 0;

  constructor(private user: User, private subs: Subs) {
    this.subs.add(this.user.observable);
  }

  ngOnInit(): void {
    this.user.observable.subscribe((value) => {
      this.counter++;
      console.log(value);
      if (this.counter >= 10) {
        this.subs.unsubscribeAll();
      }
    });

    setInterval(() => {
      this.user.firstName = new Date().getTime().toString();
    }, 1000);
  }

}
