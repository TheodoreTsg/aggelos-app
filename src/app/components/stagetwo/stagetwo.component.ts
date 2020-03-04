import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEventTwo } from '../../mockups/mocks';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { SubmitService } from 'src/app/services/submitform.service';
import { take } from 'rxjs/operators';
declare var jQuery: any;

@Component({
  selector: 'app-stagetwo',
  templateUrl: './stagetwo.component.html',
  styleUrls: ['./stagetwo.component.css']
})
export class StagetwoComponent implements OnInit {

  @ViewChild('dt') dt: ElementRef;
  @ViewChild('myCalendar') myCalendar: FullCalendarComponent;
  form: FormGroup;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [];
  closeResult: string;
  date7: Date;

  constructor(public datepipe: DatePipe, private formBuidler: FormBuilder, private submitService: SubmitService) {
    this.form = this.formBuidler.group({
      id: new FormControl(''),
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.calendarEvents = CalendarEventTwo;
  }

  handleDateClick(arg: any) { // called when user clicks in a Date box
    this.form.reset();
    this.form.controls['fromDate'].setValue(arg.date);
    this.form.controls['toDate'].setValue(arg.date);
    jQuery(this.dt.nativeElement).modal('show');
  }

  selectDates(arg: any) { // called when user selects a period of time
    this.form.reset();
    const tempDate = new Date();
    tempDate.setHours(0, 0, 0);
    tempDate.setDate(arg.end.getDate() - 1);
    this.form.controls['fromDate'].setValue(arg.start);
    this.form.controls['toDate'].setValue(tempDate);
    jQuery(this.dt.nativeElement).modal('show');
  }

  onSubmit() {
    let foundFlag = false;
    for (let i = 0; i < this.calendarEvents.length; i++) {
      if (this.form.value.id === this.calendarEvents[i].id) {
        foundFlag = true;
        const calendarEvents = this.calendarEvents.slice();       // update an existing event by creating clone and reassign the array
        const singleEvent = Object.assign({}, calendarEvents[i]);
        singleEvent.title = this.form.value.title;
        singleEvent.start = this.form.value.fromDate;
        singleEvent.end = this.form.value.toDate;
        calendarEvents[i] = singleEvent;
        this.calendarEvents = calendarEvents;
      }
    }
    if (!foundFlag) { // if there is no existing event, enter for creation
      const eventIndex = +this.calendarEvents[this.calendarEvents.length - 1].id + 1; // create new id
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new arra
        id: eventIndex.toString(),
        title: this.form.value.title,
        start: this.form.value.fromDate,
        end: this.form.value.toDate
      });
    }
    this.form.reset();
    jQuery(this.dt.nativeElement).modal('hide');
  }

  eventClicked(arg: any) { // called when user clicks on an existing event in order to see details/modify
    this.form.reset();
    const eventObj = arg.event;
    if (eventObj.end === null) {
      this.form.controls['id'].setValue(eventObj.id);
      this.form.controls['title'].setValue(eventObj.title);
      this.form.controls['fromDate'].setValue(eventObj.start);
      this.form.controls['toDate'].setValue(eventObj.start);
      jQuery(this.dt.nativeElement).modal('show');
    } else {
      this.form.controls['id'].setValue(eventObj.id);
      this.form.controls['title'].setValue(eventObj.title);
      this.form.controls['fromDate'].setValue(eventObj.start);
      this.form.controls['toDate'].setValue(eventObj.end);
      jQuery(this.dt.nativeElement).modal('show');
    }
  }

  eventDragged(event: any) { // called when user drags an event
    if (event.event.end === null) {
      for (let i = 0; i < this.calendarEvents.length; i++) {
        if (event.event.id === this.calendarEvents[i].id) {
          const calendarEvents = this.calendarEvents.slice();       // update an existing event by creating clone and reassign the array
          const singleEvent = Object.assign({}, calendarEvents[i]);
          singleEvent.title = event.event.title;
          singleEvent.start = event.event.start;
          calendarEvents[i] = singleEvent;
          this.calendarEvents = calendarEvents;
        }
      }
    } else {
      for (let i = 0; i < this.calendarEvents.length; i++) {
        if (event.event.id === this.calendarEvents[i].id) {
          const calendarEvents = this.calendarEvents.slice();       // update an existing event by creating clone and reassign the array
          const singleEvent = Object.assign({}, calendarEvents[i]);
          singleEvent.title = event.event.title;
          singleEvent.start = event.event.start;
          singleEvent.end = event.event.end;
          calendarEvents[i] = singleEvent;
          this.calendarEvents = calendarEvents;
        }
      }
    }
  }

  eventResize(event: any) {  // called when user resizes an event
    if (event.event.end === null) {
      for (let i = 0; i < this.calendarEvents.length; i++) {
        if (event.event.id === this.calendarEvents[i].id) {
          const calendarEvents = this.calendarEvents.slice();       // update an existing event by creating clone and reassign the array
          const singleEvent = Object.assign({}, calendarEvents[i]);
          singleEvent.title = event.event.title;
          singleEvent.start = event.event.start;
          calendarEvents[i] = singleEvent;
          this.calendarEvents = calendarEvents;
        }
      }
    } else {
      for (let i = 0; i < this.calendarEvents.length; i++) {
        if (event.event.id === this.calendarEvents[i].id) {
          const calendarEvents = this.calendarEvents.slice();       // update an existing event by creating clone and reassign the array
          const singleEvent = Object.assign({}, calendarEvents[i]);
          singleEvent.title = event.event.title;
          singleEvent.start = event.event.start;
          singleEvent.end = event.event.end;
          calendarEvents[i] = singleEvent;
          this.calendarEvents = calendarEvents;
        }
      }
    }
  }

  applyChanges() { // apply all the changes that have been made in the calendar
    if (confirm('Are you sure you want to submit?')) {
      this.submitService.updateCalendar(this.calendarEvents)
        .pipe(take(1)).subscribe(response => {
          console.log(response);
        }, (error) => console.log(error));
    }
  }
}
