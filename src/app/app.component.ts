import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Saif';

  loadedFeatue = 'recipe';
  onNavigate(feature:string){
     this.loadedFeatue = feature;
  }
}
