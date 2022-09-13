# Subs

An angular library to manage subscriptions to make our code much cleaner.

## Installation

To install this package, just run the following command in the root directory of your angular project.

```bash
npm i @ng-clown/subs
```

## How to use

To use this service, just inject subs to your component constructor.

```typescript
import { Subs } from '@ng-clown/subs';
@Component({ ...  })
export class AppComponent {
    constructor(private subs: Subs) {}
}
```

After injecting the service we need to keep track of the observables by adding it to subs service instance using the `add()` method.

### Adding observables to subs service

```typescript
import { Subs } from '@ng-clown/subs';
@Component({ ...  })
export class AppComponent {

    sampleObservable$: Observable<any> = ...

    constructor(private subs: Subs) {
      this.subs.add(this.sampleObservable$);
    }
}
```

Now we don't have to worry about the all the subscriptions form `sampleObservable$` as long as we call the `unsubscribeAll()` method of subs service when component is destroyed.

### Unsubscribe all subscriptions

```typescript
import { Subs } from '@ng-clown/subs';
@Component({ ...  })
export class AppComponent {

    sampleObservable$: Observable<any> = ...

    constructor(private subs: Subs) {
      this.subs.add(this.sampleObservable$);
    }

    ngOnDestroy() {
        this.subs.unsubscribeAll();
    }
}
```
