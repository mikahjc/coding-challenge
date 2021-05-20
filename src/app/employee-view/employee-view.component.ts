import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../model/people/employee';
import { PayrollDeductionService } from '../services/payroll-deduction.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  constructor(private payrollDeductionService: PayrollDeductionService) { }

  @Input() employee!: Employee;
  ngOnInit(): void {
  }

  getMonthlyDeduction(): number {
    return this.payrollDeductionService.computePaycheckDeductionForEmployee(this.employee)
  }

  getTakeHomePay(): number {
    return this.employee.getPaycheck() - this.payrollDeductionService.computePaycheckDeductionForEmployee(this.employee)
  }
}
