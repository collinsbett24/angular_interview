import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, retry, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private ServerUrl: string = 'https://randomuser.me/api/';


  constructor(private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request Http Interceptor....');
    // incases of authorization and JWT token use below
    const token = '';
    const reqWithAuth = req.clone({
      setHeaders: {
        Authorization: `Bearer ` + token
      }
    });
    return next.handle(req)
      .pipe(

        //retry on failure
        retry(1),

        //handle Errors
        catchError((error: HttpErrorResponse) => {
          //error handling logic
          Swal.fire('Error', 'HTTP Error: Failed!! Try again later', 'error');

          // alert(`HTTP Error: ${req.url}`);
          return throwError(error);
        }),
        //profilling
        finalize(() => {
          const profilingMessage = `${req.method} "${req.urlWithParams}"`;
          console.log(profilingMessage);
        })
      );
  }
  //subscribe to user information from random.me api server Url
  public getUserInformation(): Observable<any> {
    return this.http.get<any>(this.ServerUrl + '?results=50');
  }
}
