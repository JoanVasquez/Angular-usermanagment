import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../shared/alert.service';
import { Error } from '../model/error';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'signup-form',
  templateUrl: './user-signup-form.component.html',
  styleUrls: ['./user-signup-form.component.css']
})
export class UserSignupFormComponent implements OnInit, OnDestroy {

  private user: User;
  private returnUrl: string;
  private susbcriptions: Array<ISubscription> = new Array<ISubscription>();

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.user = new User();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  private saveUser(isValid: boolean): void {
    if (isValid) {
      let subscrption: ISubscription = this.userService.saveEntity(this.user).subscribe(
        res => {
          let user: User = <any>res;
          this.autoSignIn(user);
        },
        err => {
          console.log(err)
          if (err.status == 500) this.alertService.error("An error has occurred in the server");
          else {
            let error: any = JSON.parse(err);
            for (let e of error) this.alertService.error(e.message);
          }
        },
        () => console.log('finished')
      );
      this.susbcriptions.push(subscrption);
    }
  }

  private autoSignIn(user: User): void {
    let subscrption: ISubscription = this.userService.signIn(user.email, user.tempPass).subscribe(
      res => {
        let resultJson: any = <any>res;
        let jwt: string = resultJson.token;
        let userId: string = resultJson.userId;
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('jwt', 'Bearer ' + jwt);
        this.router.navigate([this.returnUrl]);
      },
      err => {
        if (err.status == 500) this.alertService.error("An error has occurred in the server");
        else if (err.status == 404) this.alertService.error(err);
        else {
          for (let e of err.error) this.alertService.error(e.message);
        }
      },
      () => console.log('Completed...')
    );
    this.susbcriptions.push(subscrption);
  }

  ngOnDestroy(): void {
    if (this.susbcriptions.length > 0)
      for (let sub of this.susbcriptions)
        sub.unsubscribe();
  }
}
