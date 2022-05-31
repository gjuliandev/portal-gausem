import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  public htmlContent: any;
  @Input() observaciones: any;
  @Output() readonly guardarClicked = new EventEmitter<any>();

  @ViewChild('editor', {static: false}) obeditor: ElementRef;

  modulesBubble = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link'],
      ['clean']
    ]
  };
  formQuill: FormGroup = Object.create(null);


  constructor(private fb: FormBuilder) {
  } 

  ngOnInit(): void {
    console.log(this.observaciones); 
    this.formQuill = this.fb.group({
      richEditor: [this.observaciones],
    });
  }


  mostrar(e: any) {
    if (e.html) {
      this.observaciones = e.html;
    }
  }

  guardar(e: any) {
    this.guardarClicked.emit(this.observaciones);
    
  }

}
