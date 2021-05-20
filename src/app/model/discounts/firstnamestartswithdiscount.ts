import { Person } from "../people/person";
import { Discount } from "./discount";

export class FirstNameStartsWithDiscount implements Discount<Person> {
    constructor(private qualifier: string, private discountPercent: number) {}
    computeDiscount(person: Person, baseValue: number): number {
        if (person.getFirstName().toLowerCase().startsWith(this.qualifier)) {
            return baseValue * this.discountPercent
        } else {
            return 0
        }
    }
}