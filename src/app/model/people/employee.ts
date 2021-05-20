import { environment } from "src/environments/environment";
import { Person } from "./person";

export class Employee extends Person {
    private paycheck = environment.defaultEmployeePaycheckAmount
    private dependents: Person[] = []
    addDependent(dependent: Person) {
        this.dependents.push(dependent)
    }
    getDependents(): Person[] {
        return this.dependents
    }
    setPaycheck(newPaycheck: number): void {
        this.paycheck = newPaycheck
    }
    getPaycheck(): number {
        return this.paycheck
    }
}