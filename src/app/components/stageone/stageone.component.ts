import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEv } from '../../mockups/mocks';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { SubmitService } from 'src/app/services/submitform.service';
import { take } from 'rxjs/operators';
declare var jQuery: any;

@Component({
  selector: 'app-stageone',
  templateUrl: './stageone.component.html',
  styleUrls: ['./stageone.component.css']
})
export class StageoneComponent implements OnInit {

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
    this.calendarEvents = CalendarEv;
  }

  handleDateClick(arg: any) {
    this.form.reset();
    this.form.controls['fromDate'].setValue(arg.date);
    this.form.controls['toDate'].setValue(arg.date);
    jQuery(this.dt.nativeElement).modal('show');
  }

  selectDates(arg: any) {
    this.form.reset();
    const tempDate = new Date();
    tempDate.setHours(0, 0, 0);
    tempDate.setDate(arg.end.getDate() - 1);
    // console.log('Selected ' + arg.startStr + ' to ' + arg.endStr);
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
    if (!foundFlag) {
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

  eventClicked(arg: any) {
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

  eventDragged(event: any) {
    if (event.event.end === null) {
      // alert(event.event.title + ' is at ' + this.datepipe.transform(event.event.start, 'dd/MM/yyyy, h:mm a'));
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
      // alert(event.event.title + ' is at ' + this.datepipe.transform(event.event.start, 'dd/MM/yyyy, h:mm a') +
      //   ' - ' + this.datepipe.transform(event.event.end, 'dd/MM/yyyy, h:mm a'));
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

  eventResize(event: any) {
    if (event.event.end === null) {
      // alert(event.event.title + ' is at ' + this.datepipe.transform(event.event.start, 'dd/MM/yyyy, h:mm a'));
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
      // alert(event.event.title + ' is at ' + this.datepipe.transform(event.event.start, 'dd/MM/yyyy, h:mm a') +
      //   ' - ' + this.datepipe.transform(event.event.end, 'dd/MM/yyyy, h:mm a'));
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

  applyChanges() {
    if (confirm('Are you sure you want to submit?')) {
      // console.log('Events are ', this.calendarEvents);
      this.submitService.updateCalendar(this.calendarEvents)
        .pipe(take(1)).subscribe(response => {
          console.log(response);
        }, (error) => console.log(error));
    }
  }
}
