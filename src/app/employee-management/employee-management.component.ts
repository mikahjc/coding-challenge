import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { GetNameComponent } from '../get-name/get-name.component';
import { FirstNameStartsWithDiscount } from '../model/discounts/firstnamestartswithdiscount';
import { Employee } from '../model/people/employee';
import { PayrollDeductionService } from '../services/payroll-deduction.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  employees: Employee[] = []
  constructor(private payrollDeductionService: PayrollDeductionService, private modalService: NgbModal) {
    payrollDeductionService.registerDiscount(new FirstNameStartsWithDiscount('a', environment.nameStartsWithADiscount))
  }

  ngOnInit(): void {
  }

  openModal() {
    const modalRef = this.modalService.open(GetNameComponent)
    modalRef.componentInstance.personType = 'Employee'
    modalRef.componentInstance.newPersonInfo.subscribe((info: {first: string, last: string}) => {
      this.employees.push(new Employee(info.first, info.last))
    })
  }
}
