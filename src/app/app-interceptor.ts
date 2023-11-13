import { HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";

export class HttpInterceptor implements HttpInterceptor{
    intercept(req : HttpRequest<any>, next : HttpHandler){
        console.log("request was made");
        return next.handle(req);
    }
}