import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((userdata) => {
        if (!userdata) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({
          params: new HttpParams().set("auth", userdata.token),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
