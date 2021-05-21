import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetNameComponent } from '../get-name/get-name.component';
import { Employee } from '../model/people/employee';
import { Person } from '../model/people/person';
import { PayrollDeductionService } from '../services/payroll-deduction.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  constructor(private payrollDeductionService: PayrollDeductionService, private modalService: NgbModal) { }

  @Input() employee!: Employee;
  newDependentFirstName: string = ''
  newDependentLastName: string = ''
  ngOnInit(): void {
  }

  getMonthlyDeduction(): number {
    return this.payrollDeductionService.computePaycheckDeductionForEmployee(this.employee)
  }

  getTakeHomePay(): number {
    return this.employee.getPaycheck() - this.payrollDeductionService.computePaycheckDeductionForEmployee(this.employee)
  }

  removeDependent(dependent: Person) {
    this.employee.removeDependent(dependent)
  }

  openModal() {
    const modalRef = this.modalService.open(GetNameComponent)
    modalRef.componentInstance.personType = 'Dependent'
    modalRef.componentInstance.newPersonInfo.subscribe((info: {first: string, last: string}) => {
      this.employee.addDependent(new Person(info.first, info.last))
    })
  }
}
