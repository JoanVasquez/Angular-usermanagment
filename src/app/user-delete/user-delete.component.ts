import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AlertService } from '../shared/alert.service';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit, OnDestroy {
  
  @Input() userId: number;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();
  private isModalVisible: boolean = true;
  private susbcription:ISubscription;

  constructor(private userService: UserService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
  }

  private onDelete(): void {
    this.susbcription = this.userService.deleteEntity(this.userId).subscribe(
      res => {
        let actualId:string = sessionStorage.getItem('userId');
        if (this.userId == Number.parseInt(actualId)) {
          sessionStorage.removeItem('jwt');
          let returnUrl: string = '/home'
          this.router.navigate([returnUrl]);
        } else this.deleteUser.emit(this.userId);
      },
      err => {
        if(err.status == 500) this.alertService.error("An error has occurred in the server");
        else this.alertService.error("An unknown error has occurred");
      },
      () => {
        this.isModalVisible = false;
      }
    );
  }

  ngOnDestroy(): void {
    if(this.susbcription != null) this.susbcription.unsubscribe();
  }

}
