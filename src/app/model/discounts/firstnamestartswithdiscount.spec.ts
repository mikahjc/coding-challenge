import { Person } from "../people/person"
import { FirstNameStartsWithDiscount } from "./firstnamestartswithdiscount"

describe('"First name starts with" discount', () => {
    let discount: FirstNameStartsWithDiscount
    const qualifier = 'a'
    const discountAmount = 0.1
    beforeEach(() => {
        discount = new FirstNameStartsWithDiscount(qualifier, discountAmount)
    })

    it('should give a discount when the name starts with the provided qualifier', () => {
        const baseCost = 100
        const personWithNameThatStartsWithQualifier = new Person(qualifier + 'first', 'last')
        const computedDiscount = discount.computeDiscount(personWithNameThatStartsWithQualifier, baseCost)
        expect(computedDiscount).toEqual(baseCost * discountAmount)
    })

    it('should not give a discount when the name does not start with the provided qualifier', () => {
        const personWithNonMatchingName = new Person('1first', 'last')
        const discountAmount = discount.computeDiscount(personWithNonMatchingName, 100)
        expect(discountAmount).toEqual(0)
    })
})