import { BehaviorSubject, Observable, Subject } from "rxjs";

export class DataSource {

    private static instance: DataSource;
    private data: Map<any, BehaviorSubject<any>> = new Map();

    constructor() {
        if (DataSource.instance) {
            return DataSource.instance;
        }
        DataSource.instance = this;
    }

    getData(target: any) {
        return this.data.get(target);
    }

    setData(target: any, data: BehaviorSubject<any>) {
        this.data.set(target, data);
    }
}