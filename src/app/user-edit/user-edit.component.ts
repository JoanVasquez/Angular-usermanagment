import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../shared/user.service';
import { AlertService } from '../shared/alert.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  private isModalVisible: boolean = true;
  @Input() user: User;
  @Output() updatedUser: EventEmitter<User> = new EventEmitter<User>();
  private susbcription:ISubscription;

  constructor(private userService: UserService,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  private onSave(isValid: boolean): void {
    if (isValid) {
      this.isModalVisible = false;
      this.susbcription = this.userService.updateEntity(this.user).subscribe(
        res => this.updatedUser.emit(this.user),
        err => {
          if(err.status == 500) this.alertService.error("An error has occurred in the server");
          else{
          for(let e of err.error) this.alertService.error(e.message);
          }
        },
        () => console.log('Completed...')
      );
    }
  }

  ngOnDestroy(): void {
    if(this.susbcription != null) this.susbcription.unsubscribe();
  }
}
