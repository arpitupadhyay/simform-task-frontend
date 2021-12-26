import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()


export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem("token");
        console.log("request", request)
        const isLoggedIn = localStorage.getItem("token") ? true : false;
        if (isLoggedIn && token) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        } else {
            this.router.navigate(['/homepage'])
            localStorage.clear()
        }
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        console.log('this is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                        alert(`Error Interceptor! ${errorMsg}`)
                    }
                    else {
                        console.log('this is server side error');
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                        console.log("errorMsg", errorMsg)
                        alert(`Error Interceptor! ${errorMsg}`)
                    }
                    console.log(errorMsg);
                    return throwError(errorMsg);
                })
            )
    }
}