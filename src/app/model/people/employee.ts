import { environment } from "src/environments/environment";
import { Person } from "./person";

export class Employee extends Person {
    private paycheck = environment.defaultEmployeePaycheckAmount
    private dependents: Person[] = []
    addDependent(dependent: Person) {
        this.dependents.push(dependent)
    }
    removeDependent(dependent: Person) {
        const index = this.dependents.indexOf(dependent)
        console.log(index)
        if (index >= 0) {
            this.dependents.splice(index, 1)
        }
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