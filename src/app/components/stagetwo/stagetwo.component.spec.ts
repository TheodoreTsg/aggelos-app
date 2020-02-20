import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagetwoComponent } from './stagetwo.component';

describe('StagetwoComponent', () => {
  let component: StagetwoComponent;
  let fixture: ComponentFixture<StagetwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagetwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagetwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
