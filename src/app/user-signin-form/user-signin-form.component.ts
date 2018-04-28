import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../shared/alert.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'signin-form',
  templateUrl: './user-signin-form.component.html',
  styleUrls: ['./user-signin-form.component.css']
})
export class UserSigninFormComponent implements OnInit, OnDestroy {

  private returnUrl: string;
  private userEmail: string;
  private userPass: string;
  private susbcription: ISubscription;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
    let token: string = sessionStorage.getItem('jwt') || '';
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    if (token != '') this.router.navigate([this.returnUrl]);
  }

  private signIn(isValid: boolean): void {
    if (isValid) {
      this.susbcription = this.userService.signIn(this.userEmail, this.userPass).subscribe(
        res => {
          let resultJson:any = <any>res;
          let jwt: string = resultJson.token;
          let userId: string = resultJson.userId;
          sessionStorage.setItem('userId', userId);
          sessionStorage.setItem('jwt', 'Bearer ' + jwt);
          this.router.navigate([this.returnUrl]);
        },
        err => {
          if (err.status == 500) this.alertService.error("An error has occurred in the server");
          else if (err.status == 404) this.alertService.error(err.error);
          else {
            for (let e of err.error) this.alertService.error(e.message)
          }
        },
        () => console.log('completed...')
      );
    }
  }

  ngOnDestroy(): void {
    if (this.susbcription != null) this.susbcription.unsubscribe();
  }

}
