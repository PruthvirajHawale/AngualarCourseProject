import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { AppRoutingModule } from "./app-routing.module";
import { AlertComponent } from "./shared/alert/alert.component";
import { CoreModule } from "./core.module";
import { LoggingService } from "./logging.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective, // below this two imports are here because i was lazy enough to not complete the shared module videos
    AlertComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, CoreModule],
  bootstrap: [AppComponent],
  // providers: [LoggingService], //Same instance will be used across app, it is declared in app module
  providers: [LoggingService], //Different instance will be used because same service is provided inside the shopping-list
  //  module and that module is load lazily
})
export class AppModule {}
