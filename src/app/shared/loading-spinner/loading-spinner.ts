import { Component } from "@angular/core";

@Component({
   selector : 'app-loader-spinner',
   template : '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>' ,
    styleUrls : ['./loading-spinner.css']
})
export class LoadingSpinnerComponent{

}