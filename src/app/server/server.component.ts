import { Component } from "@angular/core";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent{
   serverId = 36;
   serverStatus ='offline';

   getServerStatus(){
     return this.serverStatus;
   }
}
