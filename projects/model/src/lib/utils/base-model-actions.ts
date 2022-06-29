import { BehaviorSubject, Subject } from "rxjs";
import { BaseModel } from "../base-model";
import { DataSource } from "../data-source";

export class BaseModelActions {

    private dataSource = new DataSource();
    private model: Function;

    constructor(baseModel: BaseModel) {
        this.model = baseModel.constructor;
    }

    setSourceData(value: any) {
        this.dataSource.setData(this.model, new BehaviorSubject(value));
    }

    getSourceData(): BehaviorSubject<any> {
        return this.dataSource.getData(this.model)!;
    }
}
