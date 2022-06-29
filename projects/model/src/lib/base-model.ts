import { Subscription } from "rxjs";
import { applyGetterSetter } from "./utils/apply-getter-setter";
import { BaseModelActions } from "./utils/base-model-actions";
import { flattenObject } from "./utils/flatten-object";
import { getMethodNames } from "./utils/get-method-names";

export class BaseModel {
    static namespace?: string;
    #baseModelActions: BaseModelActions;
    #runningMethodCounter: number = 0;
    #methodNames: string[] = [];
    #subscribers: Subscription[] = [];

    constructor() {
        this.#baseModelActions = new BaseModelActions(this);
        this.#methodNames = getMethodNames(this);
        this.#methodNames.filter(name => name !== 'constructor').forEach(method => {
            const originalMethod = (this as any)[method];
            const self = this;
            (this as any)[method] = function() {
                self.#runningMethodCounter++;
                originalMethod.apply(this, arguments);
                self.#runningMethodCounter--;
                if (this.canBroadcast()) {
                    const subject = this.#baseModelActions.getSourceData();
                    subject.next(flattenObject(this.getState()));
                }
            }
        });
    }

    public unsubscribeAll() {
        this.#subscribers.forEach(item => item.unsubscribe());
    }

    private canBroadcast(): boolean {
        return this.#runningMethodCounter === 0;
    }

    private getState(): { [key: string]: any; } {
        const obj = { ...this };
        this.#methodNames.forEach(key => {
            delete (obj as any)[key];
        });
        return obj;
    }

    public get observable() {
        if (!this.#baseModelActions.getSourceData()) {
            this.#baseModelActions.setSourceData(flattenObject(this.getState()));
            applyGetterSetter(
                this,
                this.#baseModelActions.getSourceData(),
                () => this.canBroadcast(),
                () => this.getState()
            );
        }

        /**
         * Save subscriptions to easily unsubscribe all on unsubscribe one
         */
        const self = this;
        const observable = this.#baseModelActions.getSourceData();
        const originalMethod = observable.subscribe;
        (observable as any).subscribe = function() {
            const subscription = originalMethod.apply(this, arguments as any);
            self.#subscribers.push(subscription);
            return subscription;
        }
        return observable;
    }
}
