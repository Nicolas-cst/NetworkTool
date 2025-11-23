import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from "ng-zorro-antd/icon";
import { NetworkService } from '../Services/network.service';
import { TranslatePipe } from "../shared/pipes/translate.pipe";

@Component({
  selector: 'app-menu',
  imports: [NzMenuModule, NzIconModule, TranslatePipe],
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
    })
  }
  
  selectIF(iface: string){
    let index = this.disponibleIF.indexOf(iface);
    if(index >= 0 ){
      this.ns.selectedInterface.next(index);
    }
  }




}
