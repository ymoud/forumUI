import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { AjaxRequest } from 'rxjs/internal/observable/dom/AjaxObservable';

@Injectable()
export class HttpService {

    constructor(private http: HttpService) {

    }
    
    public post<T>() {
    }
}