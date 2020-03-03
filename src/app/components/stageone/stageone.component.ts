import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEv } from '../../mockups/mocks';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
declare var jQuery: any;

@Component({
  selector: 'app-stageone',
  templateUrl: './stageone.component.html',
  styleUrls: ['./stageone.component.css']
})
export class StageoneComponent implements OnInit {

  @ViewChild('dt') dt: ElementRef;
  form: FormGroup;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [];
  closeResult: string;
  date7: Date;

  constructor(public datepipe: DatePipe, private formBuidler: FormBuilder) {
    this.form = this.formBuidler.group({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.calendarEvents = CalendarEv;
  }

  handleDateClick(arg: any) {
    this.form.controls['fromDate'].setValue(arg.date);
    this.form.controls['toDate'].setValue(arg.date);
    jQuery(this.dt.nativeElement).modal('show');
  }

  selectDates(arg: any) {
    const tempDate = new Date();
    tempDate.setHours(0, 0, 0);
    tempDate.setDate(arg.end.getDate() - 1);
    console.log('Selected ' + arg.startStr + ' to ' + arg.endStr);
    this.form.controls['fromDate'].setValue(arg.start);
    this.form.controls['toDate'].setValue(tempDate);
    jQuery(this.dt.nativeElement).modal('show');
  }

  onSubmit() {
    console.log('Submitted!');
    console.log('Values are ', this.form.value);
    this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
      title: this.form.value.title,
      start: this.form.value.fromDate,
      end: this.form.value.toDate
    });
    this.form.reset();
    jQuery(this.dt.nativeElement).modal('hide');
  }

  eventClicked(arg: any) {
    const eventObj = arg.event;
    console.log('Object is ', eventObj);
    if (eventObj.end === null) {
      alert(eventObj.title + ' is at ' + this.datepipe.transform(eventObj.start, 'dd/MM/yyyy, h:mm a'));
    } else {
      alert(eventObj.title + ' is at ' + this.datepipe.transform(eventObj.start, 'dd/MM/yyyy, h:mm a') +
        ' - ' + this.datepipe.transform(eventObj.end, 'dd/MM/yyyy, h:mm a'));
    }
  }
  applyChanges() {
    alert('Changes applied! Open console to see the events.');
    console.log('Events are ', this.calendarEvents);
  }
}
