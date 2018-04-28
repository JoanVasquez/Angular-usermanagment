import { User } from "../model/user";
import { Observable } from "rxjs/Observable";
import { Response } from '@angular/http';

export interface Crud<Entity> {

    readEntity(): Observable<Response>;

    saveEntity(entity: Entity): Observable<Response>;

    updateEntity(entity: Entity): Observable<Response>;

    deleteEntity(userId: number): Observable<Response>;

    signIn(email: string, pass: string): Observable<Response>;

}
