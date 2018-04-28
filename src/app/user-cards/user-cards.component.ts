import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Crud } from '../crud/crud';
import { User } from '../model/user';
import { Error } from '../model/error';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/alert.service';
import { PaginationInstance } from 'ngx-pagination';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit, OnDestroy {
  @ViewChild('edit', { read: ViewContainerRef }) edit: ViewContainerRef;
  private users:User[];
  private susbcriptions:Array<ISubscription> = new Array<ISubscription>();
  private search:string = '';
  private maxSize:number = 5;
  private directionLinks:boolean = true;
  private autoHide:boolean = true;

  private config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 3,
    currentPage: 1
  };

  private labels: any = {
    previousLabel: 'Back',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  private onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private viewContainerRef:ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    let susbcription:ISubscription = this.userService.readEntity().subscribe(
      res => this.users = <any>res,
      err => {
        if(err.error.status == 401) this.alertService.error(err.error.message)
        else for (let e of err.error) this.alertService.error(e.message);
      },
      () => console.log('Completed... ')
    );
    this.susbcriptions.push(susbcription);
  }

  private onShowEditModal(user: User): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserEditComponent);
    this.edit.clear();
    const component = this.edit.createComponent(componentFactory);
    let userToEdi:User = JSON.parse(JSON.stringify(user));
    component.instance.user = userToEdi;
    this.susbcriptions.push(component.instance.updatedUser.subscribe(event => this.onUpdate(event)));
  }

  private onShowDeleteModal(userId:number):void{
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserDeleteComponent);
    this.edit.clear();
    const component = this.edit.createComponent(componentFactory);
    component.instance.userId = userId;
    this.susbcriptions.push(component.instance.deleteUser.subscribe(event => this.onDelete(event)));
  }

  private onLogout(): void {
    sessionStorage.removeItem('jwt');
    let returnUrl: string = '/home'
    this.router.navigate([returnUrl]);
  }

  private onUpdate(user:User):void{
    for(var i = 0; i < this.users.length; i++)
        if(this.users[i].userId == user.userId)
            this.users[i] = user;
        this.alertService.success('User updated successfully');
  }

  private onDelete(userId:number):void {
    for(var i = 0; i < this.users.length; i++)
      if(this.users[i].userId == userId)
        this.users.splice(i, 1);
  }

  ngOnDestroy(): void {
    if(this.susbcriptions.length > 0)
      for(let sub of this.susbcriptions)
        sub.unsubscribe();
  }

}
