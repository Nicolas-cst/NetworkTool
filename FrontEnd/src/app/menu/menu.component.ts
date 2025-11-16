import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from "ng-zorro-antd/icon";
import { NetworkService } from '../Services/network-service';

@Component({
  selector: 'app-menu',
  imports: [NzMenuModule, NzIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  constructor(
    private ns : NetworkService
  ) {}

  @Input() isCollapsed!: boolean;
  @Output() collapsedChange = new EventEmitter<boolean>();

  disponibleIF : string[] = [];

  ngOnInit(){
    this.ns.getAvailableInterfaces().subscribe((interfaces : string[]) => {
      this.disponibleIF = interfaces;
      console.log(this.disponibleIF);
    })
  }

  selectIF(iface: string){
    let index = this.disponibleIF.indexOf(iface);
    this.ns.selectedInterface.next(index);
  }




}
