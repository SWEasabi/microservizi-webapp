import { inject, Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from "@angular/router";
import { catchError, firstValueFrom, from, Observable, switchMap } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthService } from "../services/auth.service";

@Injectable()
export class ApiGatewayInterceptor implements HttpInterceptor {

  constructor() {}
  authService = inject(AuthService);
  router = inject(Router);
  static registryPrefix = "/registry";
  static authPrefix = "/auth";

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const url = request.url;
    // se sono in ambiente di sviluppo, non faccio nulla ed uso il proxy

    const gateway = () => {
      if (!environment.production) return next.handle(request);
      if (url.startsWith(ApiGatewayInterceptor.registryPrefix)) {
        return next.handle(request.clone({ url: this.directToRegistry(url) }));
      } else if (url.startsWith(ApiGatewayInterceptor.authPrefix)) {
        return next.handle(request.clone({ url: this.directToAuth(url) }));
      } else {
        return next.handle(request);
      }
    };

    return gateway().pipe(
      catchError((err) => {
        if (err.status === 401) {
           this.authService.logout();
            return from(this.router.navigate(['/login'])).pipe(
              switchMap (() => next.handle(request))
            )
        } else {
          return next.handle(request);
        }
      })
    );

  }

  public directToRegistry(url: string): string {
    return this.redirect(url, "registry");
  }
  public directToAuth(url: string): string {
    return this.redirect(url, "auth");
  }

  private redirect(url: string, microService: "auth" | "registry"): string {
    url = url.startsWith("/") ? url.substring(1) : url;
    url = url.startsWith(microService) ? url.substring(microService.length) : url;
    if (environment.api[microService]) {
      let prefixUrl = environment.api[microService];
      if (!prefixUrl.endsWith("/")) { prefixUrl += "/"; }
      return prefixUrl + url;
    } else {
      return url;
    }
  }
}
