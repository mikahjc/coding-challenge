import { Component } from '@angular/core';
import { PayrollDeductionService } from './services/payroll-deduction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(payrollDeductionService: PayrollDeductionService) {
  }
  title = 'coding-challenge';
}
