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

After injecting the service we can now use it to manage our subscriptions.

### Adding subscription

```typescript
import { Subs } from '@ng-clown/subs';
@Component({ ...  })
export class AppComponent {
    constructor(private subs: Subs) {}

    onInit() {
        this.subs.new = this.sampleObservable.subscribe(() => {});
        this.subs.new = this.sampleObservable2.subscribe(() => {});
    }
}
```

### Unsubscribe all subscriptions

```typescript
import { Subs } from '@ng-clown/subs';
@Component({ ...  })
export class AppComponent {
    constructor(private subs: Subs) {}

    ngOnInit() {
        this.subs.new = this.sampleObservable.subscribe(() => {});
        this.subs.new = this.sampleObservable2.subscribe(() => {});
    }

    ngOnDestroy() {
        this.subs.destroy();
    }
}
```

### Unsubscribe one subscription

```typescript
import { Subs } from '@ng-clown/subs';
@Component({ ...  })
export class AppComponent {
    private subscription;
    constructor(private subs: Subs) {}

    ngOnInit() {
        this.subscription = this.sampleObservable.subscribe(() => {});
        this.subs.new = this.subscription;
        this.subs.new = this.sampleObservable2.subscribe(() => {});
    }

    ngOnDestroy() {
        this.subs.destroyOne(this.subscription);
    }
}
```
