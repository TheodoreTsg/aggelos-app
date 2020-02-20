import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-stageone',
  templateUrl: './stageone.component.html',
  styleUrls: ['./stageone.component.css']
})
export class StageoneComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, timeGridPlugin];

  constructor() { }

  ngOnInit() {
  }

}
