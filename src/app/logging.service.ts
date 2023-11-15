import { Injectable } from "@angular/core";

// @Injectable({
//   providedIn: "root",
// })  //Instance of this service will be used across applicaiton, by declaration provided here
export class LoggingService {
  lastlong: string;

  printLog(message: string) {
    console.log(message);
    console.log(this.lastlong);
    this.lastlong = message;
  }
}
