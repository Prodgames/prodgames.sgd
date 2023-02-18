import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  deviceInfo = null;
  ipAdress: any;
  token: any;

  constructor(
    private authenticationService: AuthService) {
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      // this.openDialogInfo(
      // 	'Sesión caducada  !',
      // 	'Vuelva a iniciar sesión',
      // 	'error'
      // );
      sessionStorage.removeItem('token');
      Swal.fire('Ocurrió un problema !', err.error.message, 'error')
      setTimeout(() => {
        this.authenticationService.logout();
      }, 500);
      return of(err.error.message);
    }
    return throwError(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('amazonaws')) {
      this.token = (this.authenticationService.getToken() !== undefined) ? this.authenticationService.getToken() : '';
      const tokenizeReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.token,
        }
      });
      return next.handle(tokenizeReq).pipe(catchError(x => this.handleAuthError(x)));
    } else{
      const tokenizeReq = req.clone();
      // tokenizeReq.headers.set('Accept', '*/*');
      // tokenizeReq.headers.set('x-ms-blob-type', 'BlockBlob');
      // tokenizeReq.headers.set('Content-Length', '0');
      // return next.handle(tokenizeReq);
      return next.handle(tokenizeReq).pipe(catchError(x => this.handleAuthError(x)));
    }
  }

  // openDialogInfo(title: string, subtitle: any, type: string) {
  //   const dialogref = this.dialog.open(ModalInfoComponent, {
  //     width: '350px',
  //     data: { title, subtitle, type }
  //   });
  //   dialogref.afterClosed().subscribe(reponse => {
  //   });
  // }

}
