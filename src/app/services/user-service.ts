import { catchError, map, finalize } from "rxjs/operators";
import { HttpService } from "./../../globals/services/http.service";
import { BehaviorSubject, Observable, throwError, of } from "rxjs";
import { IUser } from "../../app/classes/user";
export class UserService {
  protected _http = HttpService;

  protected urls = {
    getAll: "https://my-json-server.typicode.com/ymoud/forumAPI/users"
    // get?: string;
    // create?: string;
    // update?: string;
    // delete?: string;
  };

  protected _model: BehaviorSubject<IUser>;
  public model$: Observable<IUser>;

  protected _list: BehaviorSubject<IUser[]>;
  public list$: Observable<IUser[]>;

  protected _working: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public working$ = this._working.asObservable();

  constructor(
    protected key: keyof IUser = null,
    model?: IUser,
    list?: IUser[]
  ) {
    this._model = new BehaviorSubject<IUser>(model || null);
    this.model$ = this._model.asObservable();

    this._list = new BehaviorSubject<IUser[]>(list || null);
    this.list$ = this._list.asObservable();
  }
  protected _apiCall<Q>(url: string, model: any): Observable<Q> {
    return this._http.get<Q>(url, model).pipe(
      catchError(apiError => {
        return throwError(apiError);
      }),
      map(result => {
        return result;
      })
    );
  }

  public getAll(): Observable<void> {
    this._working.next(true);
    return this._apiCall<IUser[]>(this.urls.getAll, {}).pipe(
      finalize(() => this._working.next(false)),
      map(result => {
        this._list.next(result);
      })
    );
  }
  public createUser(newItem: IUser) {
    let list = [newItem];
    let newList;
    this.list$.subscribe(users => {
      if (!users) {
        return;
      }
      newList =[...list,...users] ;
    });
  
    this._list.next(newList);
  }
}
