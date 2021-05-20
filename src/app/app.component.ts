import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FirstNameStartsWithDiscount } from './model/discounts/firstnamestartswithdiscount';
import { Employee } from './model/people/employee';
import { Person } from './model/people/person';
import { PayrollDeductionService } from './services/payroll-deduction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  testEmployee = new Employee("Archibald", "Jones")
  constructor(payrollDeductionService: PayrollDeductionService) {
    payrollDeductionService.registerDiscount(new FirstNameStartsWithDiscount('a', environment.nameStartsWithADiscount))
    this.testEmployee.addDependent(new Person("Anna", "Jones"))
  }
  title = 'coding-challenge';
}
