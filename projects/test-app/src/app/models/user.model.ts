import { Injectable } from "@angular/core";
import { BaseModel } from "projects/model/src/lib/base-model";

@Injectable({ providedIn: 'root' })
export class User extends BaseModel {

    public firstName = 'testing';
    public lastName = 'testing';

    setUsername(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
