import { TestBed } from '@angular/core/testing';
import { Discount } from '../model/discounts/discount';
import { Employee } from '../model/people/employee';
import { Person } from '../model/people/person';

import { PayrollDeductionService } from './payroll-deduction.service';

describe('PayrollDeductionService', () => {
  let service: PayrollDeductionService;
  const testEmployeeBenefitsCost = 1000
  const testDependentBenefitsCost = 500
  const testPaychecksPerYear = 12
  const expectedMonthlyEmployeeDeduction = testEmployeeBenefitsCost / testPaychecksPerYear
  const expectedMonthlyDependentDeduction = testDependentBenefitsCost / testPaychecksPerYear

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollDeductionService);
    service.setDependentAnnualBenefitsCost(testDependentBenefitsCost)
    service.setEmployeeAnnualBenefitsCost(testEmployeeBenefitsCost)
    service.setPaychecksPerYear(testPaychecksPerYear)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should compute base deduction for employee with no dependents', () => {
    const employee = new Employee('first', 'last')
    const deduction = service.computePaycheckDeductionForEmployee(employee)
    expect(deduction).toEqual(expectedMonthlyEmployeeDeduction)
  })

  it('should compute base deduction for employee with 1 dependent', () => {
    const employee = new Employee('first', 'last')
    employee.addDependent(new Person('first', 'last'))
    const deduction = service.computePaycheckDeductionForEmployee(employee)
    expect(deduction).toEqual(expectedMonthlyEmployeeDeduction + expectedMonthlyDependentDeduction)
  })

  it('should compute deduction for employee with a matching discount', () => {
    const employeeFirstName = 'first'
    const employee = new Employee(employeeFirstName, 'last')
    const halfOffIfFirstNameIsFirstDiscount: Discount<Person> = {
      computeDiscount(person: Person, baseValue: number): number {
        if (person.getFirstName() === employeeFirstName) {
          return baseValue * 0.5
        } else {
          return 0
        }
      }
    }
    service.registerDiscount(halfOffIfFirstNameIsFirstDiscount)
    const deduction = service.computePaycheckDeductionForEmployee(employee)
    const expectedDiscount = halfOffIfFirstNameIsFirstDiscount.computeDiscount(employee, expectedMonthlyEmployeeDeduction)
    expect(deduction).toEqual(expectedMonthlyEmployeeDeduction - expectedDiscount)
  })

  // Value of this test is questionable
  it('should compute base deduction for employee that does not match registered discounts', () => {
    const employee = new Employee('first', 'last')
    const noOneMatchesThisDiscount: Discount<Person> = {
      computeDiscount(person: Person, baseValue: number): number {
        if (person.getFirstName() == null) {
          return baseValue
        } else {
          return 0
        }
      }
    }
    service.registerDiscount(noOneMatchesThisDiscount)
    const deduction = service.computePaycheckDeductionForEmployee(employee)
    expect(deduction).toEqual(expectedMonthlyEmployeeDeduction)
  })

  it('should apply discounts to dependents', () => {
    const lastName = 'last'
    const employee = new Employee('first', lastName)
    employee.addDependent(new Person('second', lastName))
    const discountForLastNameLast: Discount<Person> = {
      computeDiscount(person: Person, baseValue: number): number {
        if (person.getLastName() === lastName) {
          return baseValue * 0.5
        } else {
          return 0
        }
      }
    }
    service.registerDiscount(discountForLastNameLast)
    const deduction = service.computePaycheckDeductionForEmployee(employee)
    expect(deduction).toEqual((expectedMonthlyDependentDeduction + expectedMonthlyEmployeeDeduction) * 0.5)
  })
});
