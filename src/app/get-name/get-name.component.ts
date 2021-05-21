import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-get-name',
  templateUrl: './get-name.component.html',
  styleUrls: ['./get-name.component.css']
})
export class GetNameComponent implements OnInit {

  @Output() newPersonInfo: EventEmitter<any> = new EventEmitter()
  firstName: string = ''
  lastName: string = ''
  personType: string = ''
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.newPersonInfo.emit({first: this.firstName, last: this.lastName})
    this.activeModal.close()
  }
}
