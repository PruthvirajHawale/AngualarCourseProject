import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner";

@NgModule({
  declarations: [AuthComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "auth", component: AuthComponent }]),
  ],
  exports: [RouterModule],
})
export class AuthModule {}
