import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import { UserModel } from "./user.model";

export interface AuthResponseData{
    kind : string,
    idToken : string,
    email : string,
    refreshToken : string,
    expiresIn : string,
    localId : string,
    registered ?: boolean         //for login response format
}

@Injectable({providedIn: 'root'})
export class AuthService{
    user = new Subject<UserModel>();

    constructor(private httpClient : HttpClient){}
    
    signUp(email : string, password: string){
        return this.httpClient.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcRZKBbIwsDnRA6SznVfzh0DWfBiDUIC0',
            {
                email : email,
                password : password,
                returnSecureToken : true
            }
        ).pipe(catchError(this.handleError), 
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken,resData.expiresIn)
            })
        );
    }

    login(email : string , password : string){
        return this.httpClient.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcRZKBbIwsDnRA6SznVfzh0DWfBiDUIC0',
            {
                email : email,
                password : password,
                returnSecureToken : true
            }
        ).pipe(catchError(this.handleError),tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken,resData.expiresIn)
        }));
    }

    private handleAuthentication(email:string, localId:string,token:string,expiresIn:string){
        const user = new UserModel(
            email, 
            localId, 
            token,
            expiresIn
            );
            this.user.next(user);
    }

    private handleError(errorRes : HttpErrorResponse){
        console.log(errorRes);
        let errorMessage = 'An unknown error has occured'
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage = 'The email already exists';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Invalid password';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'Email not registered';
                    break;
                case 'EMAIL_EXISTS':
                    errorMessage = 'Email already registered';
                    break;
                case 'INVALID_LOGIN_CREDENTIALS':
                    errorMessage = 'Invalid Credentials'
                    break;
            }
            return throwError(errorMessage);
    }
}
