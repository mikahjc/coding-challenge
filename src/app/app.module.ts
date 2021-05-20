import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PayrollDeductionService } from './services/payroll-deduction.service';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    PayrollDeductionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
