import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap, filter, debounceTime, distinct, distinctUntilChanged } from 'rxjs/operators';
import { PostService } from '../post.service';

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
  titleExist$: Observable<boolean>;

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

  constructor(private fb: FormBuilder, private postService: PostService) { }

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

    this.titleExist$ = this.form.get('title').valueChanges.pipe(
      filter((title: string) => title.length >= 3),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((title: string) => this.postService.titleExist(title)),
      map(result => result.titleExist)
    );

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

    this.postService.createArticle(this.form.value).subscribe(() => {
      // TODO: 回到 /posts
    });

  }

}
