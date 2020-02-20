import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StageoneComponent,
    StagetwoComponent,
    StagethreeComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'stageone', component: StageoneComponent },
      { path: 'stagetwo', component: StagetwoComponent },
      { path: 'stagethree', component: StagethreeComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
