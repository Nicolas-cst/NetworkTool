import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuComponent } from "./menu/menu.component";
import { NetworkComponent } from "./networkk/network/network.component";
import { SavedCapturesListComponent } from './networkk/saved-captures-list/saved-captures-list.component';

@Component({
  selector: 'app-root',
  imports: [NzIconModule, NzLayoutModule, NzMenuModule, MenuComponent, NetworkComponent, SavedCapturesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  isCollapsed = false;

  changeCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
