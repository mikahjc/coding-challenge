import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayrollDeductionService } from './services/payroll-deduction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employeeDeductionCost: number;
  dependentDeductionCost: number;
  paychecks: number;
  constructor(private payrollDeductionService: PayrollDeductionService, private modalService: NgbModal) {
    this.employeeDeductionCost = this.payrollDeductionService.getEmployeeAnnualBenefitsCost()
    this.dependentDeductionCost = this.payrollDeductionService.getDependentAnnualBenefitsCost()
    this.paychecks = this.payrollDeductionService.getPaychecksPerYear()
  }

  openConfig(content: any) {
    this.modalService.open(content).result.then((result) => {
      this.payrollDeductionService.setEmployeeAnnualBenefitsCost(this.employeeDeductionCost)
      this.payrollDeductionService.setDependentAnnualBenefitsCost(this.dependentDeductionCost)
      this.payrollDeductionService.setPaychecksPerYear(this.paychecks)
    })
  }
}
