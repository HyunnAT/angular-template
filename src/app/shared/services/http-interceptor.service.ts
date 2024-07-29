import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private jwtTokenService: JwtTokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the JWT token from wherever you have stored it (e.g., local storage, cookie, etc.)
    const token = this.jwtTokenService.getToken();
    if (!token) {
      // If there is no token, just pass the request as it is
      return next.handle(request);
    }

    // Clone the request and add the JWT token to the header
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Pass the modified request to the next interceptor or the HTTP handler
    return next.handle(modifiedRequest);
  }
}
