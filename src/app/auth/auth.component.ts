import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  authObs: Observable<AuthResponseData>;

  onSubmit(form: NgForm) {
    this.isLoading = true;

    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authObs = this.authService.login(email, password);
    } else {
      this.authObs = this.authService.signUp(email, password);
    }

    this.authObs.subscribe(
      (responseData) => {
        this.isLoading = false;
        console.log(responseData);

        this.router.navigate(["/recipes"]);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
        console.log(errorMessage);
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
