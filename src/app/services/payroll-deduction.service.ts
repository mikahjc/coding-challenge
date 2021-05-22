import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Discount } from '../model/discounts/discount';
import { FirstNameStartsWithDiscount } from '../model/discounts/firstnamestartswithdiscount';
import { Employee } from '../model/people/employee';
import { Person } from '../model/people/person';

@Injectable({
  providedIn: 'root'
})
export class PayrollDeductionService {
  private employeeAnnualBenefitsCost = environment.employeeAnnualBenefitsCost
  private dependentAnnualBenefitsCost = environment.dependentAnnualBenefitsCost
  private paychecksPerYear = environment.paychecksPerYear
  private discounts: Discount<Person>[] = []
  constructor() {}

  computePaycheckDeductionForEmployee(employee: Employee) {
    const baseDeduction = this.employeeAnnualBenefitsCost / this.paychecksPerYear
    const discountedDeduction = baseDeduction - this.computeAllDiscountsForPerson(employee, baseDeduction)

    const dependentDeduction = employee.getDependents().map(d => this.computePaycheckDeductionForDependent(d)).reduce((acc, curr) => acc + curr, 0)

    return discountedDeduction + dependentDeduction;
  }

  computePaycheckDeductionForDependent(person: Person): number {
    let deduction = this.dependentAnnualBenefitsCost / this.paychecksPerYear
    deduction -= this.computeAllDiscountsForPerson(person, deduction)
    return deduction
  }

  computeAllDiscountsForPerson(person: Person, startingDeduction: number): number {
    return this.discounts.map(discount => discount.computeDiscount(person, startingDeduction)).reduce((p, c) => p + c, 0)
  }

  registerDiscount(newDiscount: Discount<Person>) {
    this.discounts.push(newDiscount)
  }

  getEmployeeAnnualBenefitsCost(): number {
    return this.employeeAnnualBenefitsCost
  }

  setEmployeeAnnualBenefitsCost(newCost: number) {
    this.employeeAnnualBenefitsCost = newCost
  }

  getDependentAnnualBenefitsCost(): number {
    return this.dependentAnnualBenefitsCost
  }

  setDependentAnnualBenefitsCost(newCost: number) {
    this.dependentAnnualBenefitsCost = newCost
  }

  getPaychecksPerYear(): number {
    return this.paychecksPerYear
  }
  
  setPaychecksPerYear(numOfPaychecks: number) {
    this.paychecksPerYear = numOfPaychecks
  }
}
