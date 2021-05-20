export class Person {
    constructor(private firstName: string, private lastName: string) {}

    getFirstName(): string {
        return this.firstName
    }
    getLastName(): string {
        return this.lastName
    }
}