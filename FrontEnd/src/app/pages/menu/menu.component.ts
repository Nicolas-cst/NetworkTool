import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { NzSiderComponent } from "ng-zorro-antd/layout";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from "ng-zorro-antd/icon";

@Component({
  selector: 'app-menu',
  imports: [NzMenuModule, NzIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  @Input() isCollapsed!: boolean;
  @Output() collapsedChange = new EventEmitter<boolean>();

  ngOnInit(){}

}
