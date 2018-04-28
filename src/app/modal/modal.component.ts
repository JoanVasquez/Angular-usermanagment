import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class Modal implements OnInit {
  
  @Input() isVisible:boolean = false;
  @Input() title:string;
  @Input() cancelLabel:string;
  @Input() confirmLabel:string;
  @Output() confirmNotify = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  private onConfirm():void{
    this.confirmNotify.emit();
  }

  private onCancel():void{
    this.isVisible = false;
  }

}
