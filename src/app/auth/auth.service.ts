import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { UserModel } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean; //for login response format
}

@Injectable({ providedIn: "root" })
export class AuthService {
  // user = new Subject<UserModel>();
  user = new BehaviorSubject<UserModel>(null);
  private tokenExpriationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          environment.firebaseApiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          environment.firebaseApiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          console.log(resData);
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    localId: string,
    token: string,
    expiresIn: any
  ) {
    const user = new UserModel(email, localId, token, expiresIn);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = "An unknown error has occured";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "The email already exists";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Invalid password";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Email not registered";
        break;
      case "EMAIL_EXISTS":
        errorMessage = "Email already registered";
        break;
      case "INVALID_LOGIN_CREDENTIALS":
        errorMessage = "Invalid Credentials";
        break;
    }
    return throwError(errorMessage);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }

    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      userData._tokenExpirationDate
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      console.log(
        "userData :" +
          userData._tokenExpirationDate +
          " time :" +
          new Date(userData._tokenExpirationDate).getTime()
      );
      console.log("new Date :" + new Date() + " time :" + new Date().getTime());
      console.log("AutoLogin :" + expirationDuration);
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpriationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpriationTimer) {
      clearTimeout(this.tokenExpriationTimer);
    }
    this.tokenExpriationTimer = null;
  }
}
