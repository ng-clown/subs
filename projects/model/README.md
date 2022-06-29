# Model

An angular library to manage state of angular projects.
Using this models is very straightforward and very easy to understand and implement than using redux pattern and other state management libraries.

## Installation

To install this package, just run the following command in the root directory of your angular project.

```bash
npm i @ng-clown/model
```

## Create a model

To create a model, we can use create a class and decorate it with `@Injectable` and add `extends BaseModel` from this package.

Example.

```typescript
import { Injectable } from "@angular/core";
import { BaseModel } from "@ng-clown/model";

@Injectable({ providedIn: 'root' })
export class User extends BaseModel {
    firstName: string = 'John';
    lastName: string = 'Doe';
}
```

## Subscribe to changes

To subscribe to changes, we just need to inject the model to our component and subscribe to its observable property.

Example.

```typescript
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({ ... })
export class AppComponent implements OnInit {

  constructor(private user: User) { }

  ngOnInit() {
    this.user.observable.subscribe(state => {
      console.log(state);
    });
  }

}
```

## Emitting changes

Changing a value in the model's property will emit the changes and notify all the subscribers that there is a change in a model's property.

```typescript
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({ ... })
export class AppComponent implements OnInit {

  constructor(private user: User) { }

  ngOnInit() {
    this.user.observable.subscribe(state => {
      console.log(state);
    });

    // Changing the value of a property will emit the changes to the subscribers
    this.user.firstName = 'Johnny';
  }

}
```

Note that changing multiple property will emit the changes multiple times.
To change multiple property and emit the changes one time, we need to change the properties inside a method of the model.
Please check the "Emitting via methods" section for more info.

## Emitting via methods

To change multiple properties and broadcast the change only once, the properties needs to be updated inside a model property.

Example.

#### The model

```typescript
import { Injectable } from "@angular/core";
import { BaseModel } from "@ng-clown/model";

@Injectable({ providedIn: 'root' })
export class User extends BaseModel {
    firstName: string = 'John';
    lastName: string = 'Doe';

    public setName(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
```

#### The component

```typescript
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({ ... })
export class AppComponent implements OnInit {

  constructor(private user: User) { }

  ngOnInit() {
    this.user.observable.subscribe(state => {
      console.log(state);
    });

    // Changing multiple properties inside a model method will broadcast the changes only once.
    this.user.setName('Johnny', 'Smith');
  }

}
```

## Unsubscribe all subscriptions

A model will always keeps track of the subscriptions and we can unsubscribe it all at once using `unsubscribeAll` method.

Example.

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './user.model';

@Component({ ... })
export class AppComponent implements OnInit, OnDestroy {

  constructor(private user: User) { }

  ngOnInit() {
    this.user.observable.subscribe(state => {
      console.log(state);
    });
    this.user.observable.subscribe(state => {
      console.log(state);
    });
  }

  ngOnDestroy() {
    this.user.unsubscribeAll();
  }

}
```

## Unsubscribe a subscriptions

To unsubscribe a single subscription we can do it like how we usually unsubscribe an rxjs subscription.

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './user.model';

@Component({ ... })
export class AppComponent implements OnInit, OnDestroy {
  constructor(private user: User) { }

  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.user.observable.subscribe(state => {
      console.log(state);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
```
