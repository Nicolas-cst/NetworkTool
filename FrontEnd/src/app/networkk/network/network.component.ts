import { Component } from '@angular/core';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NetworkService } from '../../Services/network.service';
import { Packet } from '../../entities/packet';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { NetworkFilterComponent } from "../network-filter/network-filter.component";
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-network',
  imports: [NzSpaceModule, NzButtonModule, NzTableModule, NzIconModule, TranslatePipe, NetworkFilterComponent, NzPopconfirmModule],
  templateUrl: './network.component.html',
  styleUrl: './network.component.scss'
})

export class NetworkComponent {

  constructor(
    public ns: NetworkService
  ){}

  filteredData : Packet[] =[];
  setFilter: boolean = false;
  intervalId: any;
  isCapturing: boolean = false;


  startCapture(){
    this.ns.startCapture().subscribe({
      next: () => {
        this.isCapturing = true;
      }
    });
    this.intervalId = setInterval(() => {
      this.ns.getPackets().subscribe(data => {
        this.filteredData.push(...data);
        console.log(this.filteredData);
      });
    }, 1000);
  }

  stopCapture(){
    clearInterval(this.intervalId);
    this.ns.stopCapture().subscribe({
      next: () => {
        this.isCapturing = false;
      }
    });
  }

  resetData(){
    this.filteredData = [];
  }
  
  showFilter(){
    this.setFilter =  !this.setFilter;
  }
  
}


