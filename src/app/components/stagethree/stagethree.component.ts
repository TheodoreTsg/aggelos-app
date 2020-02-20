import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stagethree',
  templateUrl: './stagethree.component.html',
  styleUrls: ['./stagethree.component.css']
})
export class StagethreeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  stageClicked(alt: string) {
    console.log('Stage Clicked -> ', alt);
  }

}
