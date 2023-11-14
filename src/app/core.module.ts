import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthServiceGuard } from "./auth/auth-guardService";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { RecipeService } from "./recipes/recipe.service";

@NgModule({
  providers: [
    ShoppingListService,
    AuthServiceGuard,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
