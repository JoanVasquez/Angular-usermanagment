import { Injectable } from "@angular/core";
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject: Subject<any> = new Subject<any>();
  private keepAfterNavigatingChange: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (this.keepAfterNavigatingChange)
        this.keepAfterNavigatingChange = false;
      else
        this.subject.next();
    });
  }

  success(message: string, keepAfterNavigationChange = false):void {
    this.keepAfterNavigatingChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }

  warning(message: string, keepAfterNavigationChange = false):void {
    this.keepAfterNavigatingChange = keepAfterNavigationChange;
    this.subject.next({ type: 'warning', text: message });
  }

  error(message: string, keepAfterNavigationChange = false):void {
    this.keepAfterNavigatingChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
