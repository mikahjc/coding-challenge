import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PayrollDeductionService } from './services/payroll-deduction.service';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { GetNameComponent } from './get-name/get-name.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeViewComponent,
    GetNameComponent,
    EmployeeManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    PayrollDeductionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
