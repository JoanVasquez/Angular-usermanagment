import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/alert.service';

@Component({
  moduleId: module.id,
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  private message:string;

  constructor(private alertService:AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(
      message => {
      this.message = message;
    }
  );
  }

  private closeAlert():void {
    this.message = undefined;
  }

}
