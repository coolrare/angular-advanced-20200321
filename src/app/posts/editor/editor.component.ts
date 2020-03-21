import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl('test'),
    body: new FormControl(),
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


  }

  addTag(tag: string) {
    if(!tag) {
      return;
    }

    (this.form.get('tags') as FormArray)
      .push(new FormControl(tag));
  }

  removeTag(index: number) {
    (this.form.get('tags') as FormArray)
      .removeAt(index);
  }

}
