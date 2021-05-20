import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FirstNameStartsWithDiscount } from './model/discounts/firstnamestartswithdiscount';
import { PayrollDeductionService } from './services/payroll-deduction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(payrollDeductionService: PayrollDeductionService) {
    payrollDeductionService.registerDiscount(new FirstNameStartsWithDiscount('a', environment.nameStartsWithADiscount))
  }
  title = 'coding-challenge';
}
