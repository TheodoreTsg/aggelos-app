import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SubmitService } from 'src/app/services/submitform.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-stagetwo',
  templateUrl: './stagetwo.component.html',
  styleUrls: ['./stagetwo.component.css']
})
export class StagetwoComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuidler: FormBuilder, private _submitService: SubmitService) {
    this.form = this.formBuidler.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
  }

  submitForm() {
    console.log('Form Submitted!', this.form.value);
    this._submitService.getAllUsers()
      .pipe(take(1)).subscribe(data => {
        console.log(data);
      }, (error) => {
        console.log(error);
      });
  }

}
