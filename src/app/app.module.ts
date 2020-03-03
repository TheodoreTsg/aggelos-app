import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StageoneComponent } from './components/stageone/stageone.component';
import { StagetwoComponent } from './components/stagetwo/stagetwo.component';
import { StagethreeComponent } from './components/stagethree/stagethree.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StageoneComponent,
    StagetwoComponent,
    StagethreeComponent,
    HomeComponent,
    FooterComponent,
    NoPageFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    CalendarModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'stageone', component: StageoneComponent },
      { path: 'stagetwo', component: StagetwoComponent },
      { path: 'stagethree', component: StagethreeComponent },
      { path: '**', component: NoPageFoundComponent }
    ])
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
