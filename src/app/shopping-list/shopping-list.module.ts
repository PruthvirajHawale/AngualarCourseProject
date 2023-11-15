import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListRouterModule } from "./shopping-list.router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoggingService } from "../logging.service";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [ShoppingListRouterModule, FormsModule, CommonModule],
  // providers: [LoggingService], //Different instance because this is lazily loaded component
})
export class ShoppingListModule {}
