import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
 
export class HttpService {
    private static _afMetaTagName: string;
    private static _httpEvent: Subject<string> = new Subject();

    public static post<T>(actionUrl: string,postData: any,headers = { 'Content-Type': 'application/json' }): Observable<T> {
        const requestBody =  postData;
        return ajax.post(actionUrl, JSON.stringify(requestBody), headers).pipe(
            catchError(HttpService.handleHttpError),
            map(response => HttpService.resolve<T>(response)),
            tap(() => this._httpEvent.next(actionUrl))
        );
    }

    public static get<T>(actionUrl: string,isInternal: boolean = true,headers = { 'Content-Type': 'application/json' }): Observable<T> {
        return ajax.get(actionUrl, headers).pipe(
            catchError(HttpService.handleHttpError),
            map(response => HttpService.resolve<T>(response)),
            tap(() => this._httpEvent.next(actionUrl))
        );
    }

    private static resolve<T>(response: AjaxResponse): T {

        const locationUrl = response.xhr.getResponseHeader('x-signedout');

        if (!!locationUrl && locationUrl.length > 0) {
            window.location.replace(locationUrl);
            return;
        }
        if (!response || !response.response) return;
        const body = response.response;

        if (body.exception) {
            throw body.exception as any;
        } else {
            return body.payload ? (body.payload as T) : (body as T);
        }
    }

    private static handleHttpError(error: any) {
        console.log(error)
        const customError='Oooops something went wrong...'
        return throwError(error);
    }
}


