import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewservers = false;
  serverCreationStatus ='No Server created';
  constructor() {
    setTimeout(()=>{
      this.allowNewservers = true;
    },2000);
  }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreationStatus = 'Server Created Successfully';
  }

}
