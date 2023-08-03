import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  delay,
  dematerialize,
  materialize,
  Observable,
  of,
  throwError,
} from 'rxjs';

const users: any[] = [
  {
    id: 0,
    username: 'user@demo.com',
    password: '123456',
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        default:
          return next.handle(request);
      }
    }

    function authenticate() {
      console.log('Im here. Authenticate')
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.username,
      });
    }

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }

    function error(message: any) {
      return throwError({ status: 400, error: { message } }).pipe(
        materialize(),
        delay(500),
        dematerialize()
      );
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
