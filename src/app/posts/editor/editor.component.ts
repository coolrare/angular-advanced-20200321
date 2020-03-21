import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

const requiredValidator: ValidatorFn = (control: AbstractControl) => {
  console.log(control.value);
  if(!control.value) {
    return { requiredValidator: true};
  }
  return null;
  // return null;
};

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  titleExsit$: Observable<boolean>;

  customValidator = Validators.compose([
    Validators.required,
    Validators.minLength(10)
  ]);

  form = new FormGroup({
    title: new FormControl('test', requiredValidator),
    // body: new FormControl('', this.test),
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    tags: new FormArray([
      new FormControl('angular'),
      new FormControl('HTML')
    ])
  });

  form2 = this.fb.group({
    title: this.fb.control('')
  });

  get tagControls() {
    return (this.form.get('tags') as FormArray).controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.form.valueChanges.subscribe(data => console.log(data));
    // this.form.get('title').valueChanges.subscribe(title => console.log(title));
    // this.form.get('title').statusChanges.subscribe(status => console.log(status));

    // this.titleExsit$ = this.form.get('title').valueChanges.pipe(
    //   startWith(this.form.get('title').value),
    //   switchMap((title: string) => {
    //     // TODO: API
    //     return of(true);
    //   })
    // );

  }

  addTag(tag: string) {
    if (!tag) {
      return;
    }

    (this.form.get('tags') as FormArray)
      .push(new FormControl(tag));
  }

  removeTag(index: number) {
    (this.form.get('tags') as FormArray)
      .removeAt(index);
  }

  submit() {
    console.log(this.form.value);
  }

}
