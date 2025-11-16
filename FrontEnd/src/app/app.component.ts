import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuComponent } from "./pages/menu/menu.component";
import { HeaderComponent } from "./pages/header/header.component";
import { NetworkComponent } from "./pages/network/network.component";

@Component({
  selector: 'app-root',
  imports: [NzIconModule, NzLayoutModule, NzMenuModule, MenuComponent, HeaderComponent, NetworkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  isCollapsed = false;

  changeCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
