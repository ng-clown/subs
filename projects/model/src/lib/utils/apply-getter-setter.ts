import { BehaviorSubject } from "rxjs";
import { flattenObject } from "./flatten-object";

export function applyGetterSetter(
    model: any,
    subject: BehaviorSubject<any>,
    canBroadcast: () => boolean,
    getState: () => any
) {
    const obj = flattenObject(getState());
    for (let key in obj) {
        let value = obj[key];
        Object.defineProperty(model, key, {
            get: () => value,
            set: val => {
                if (val !== value) {
                    value = val;
                    if (canBroadcast()) {
                        subject.next(flattenObject(getState()));
                    }
                }
            }
        });
    }
}
