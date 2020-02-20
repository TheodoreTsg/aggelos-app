import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-stageone',
  templateUrl: './stageone.component.html',
  styleUrls: ['./stageone.component.css']
})
export class StageoneComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];

  constructor() { }

  ngOnInit() {
  }

}
