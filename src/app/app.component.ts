import { Component } from '@angular/core';
import { HttpClient, HttpBackend, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { TokenService } from './services/token.service';

const URL = 'https://jsonplaceholder.typicode.com/todos';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  private readonly showReq = new BehaviorSubject<boolean>(false);
  showReq$ = this.showReq.asObservable();
  resOne$: Observable<any>;
  resTwo$: Observable<any>;
  resThree$: Observable<any>;

  constructor(
    private http: HttpClient,
    private httpWithoutInterceptors: HttpBackend,
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    this.tokenService.token$
      .pipe(
        take(1),
      ).subscribe(token => {
        console.log(token)

        const resOneReq = new HttpRequest('GET', `${URL}/1`, undefined, {
          headers: new HttpHeaders({token: `Bearer ${token}`})
        });

        this.resOne$ = this.httpWithoutInterceptors.handle(resOneReq)
          .pipe(
            map((res: any) => res.body),
          );
      });
    

    this.resTwo$ = this.http.get(`${URL}/2`);


    this.resThree$ = this.tokenService.token$
    .pipe(
      take(1),
      map(token => {
        console.log('req 3:',token)
        return new HttpRequest('GET', `${URL}/3`, undefined, {
          headers: new HttpHeaders({token: `Bearer ${token}`})
        });
      }),
      switchMap(req => this.httpWithoutInterceptors.handle(req)
        .pipe(map((res: any) => res.body))
      )
    );
  }

  callApis(): void {
    this.showReq.next(true);
  }
}
