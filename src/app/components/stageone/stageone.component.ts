import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEv } from '../../mockups/mocks';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stageone',
  templateUrl: './stageone.component.html',
  styleUrls: ['./stageone.component.css']
})
export class StageoneComponent implements OnInit {
  form: FormGroup;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [];
  modalOptions: NgbModalOptions;
  closeResult: string;
  modalDate: string;

  constructor(public datepipe: DatePipe, private modalService: NgbModal, private formBuidler: FormBuilder) {
    this.calendarEvents = CalendarEv;
    this.modalOptions = {
      backdrop: true,
      centered: true,
      backdropClass: 'customBackdrop'
    };
    this.form = this.formBuidler.group({
      input: new FormControl(''),
      title: new FormControl('')
    });
  }

  ngOnInit() {
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(modal: any, arg: any) {
    this.modalService.open(modal, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  handleDateClick(modal: any, arg: any) {
    // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
    //   this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
    //     title: 'New Event',
    //     start: arg.date
    //   });
    // }
    this.modalDate = this.datepipe.transform(arg.date, 'dd/MM/yyyy');
    this.form.controls['input'].setValue(this.datepipe.transform(arg.date, 'dd/MM/yyyy, h:mm a'));
    this.open(modal, arg);
  }

  selectDates(arg: any) {
    console.log('Selected ' + arg.startStr + ' to ' + arg.endStr);
  }

  eventClicked(arg: any) {
    const eventObj = arg.event;
    console.log('Object is ', eventObj);
    alert('clicked ' + eventObj.title + ' is at ' + this.datepipe.transform(eventObj.start, 'dd/MM/yyyy, h:mm a'));
  }

}
