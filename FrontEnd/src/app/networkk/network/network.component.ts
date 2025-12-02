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
import { NzTooltipDirective } from "ng-zorro-antd/tooltip";
import { Capture } from '../../entities/capture';

@Component({
  selector: 'app-network',
  imports: [NzSpaceModule, NzButtonModule, NzTableModule, NzIconModule, TranslatePipe, NetworkFilterComponent, NzPopconfirmModule, NzTooltipDirective],
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
  startDate: Date = new Date();
  endDate: Date = new Date();

  saved: boolean = false;


  startCapture(){
    this.ns.startCapture().subscribe({
      next: () => {
        this.isCapturing = true;
        this.startDate = new Date();
      }
    });
    this.intervalId = setInterval(() => {
      this.ns.getPackets().subscribe(data => {
        this.filteredData.push(...data);
      });
    }, 1000);
  }

  stopCapture(){
    clearInterval(this.intervalId);
    this.ns.stopCapture().subscribe({
      next: () => {
        this.isCapturing = false;
        this.endDate = new Date();
      }
    });
  }

  resetData(){
    this.filteredData = [];
  }

  saveData(){
    let capture = new Capture()

    capture.startDate = this.startDate;
    capture.endDate = this.endDate;
    capture.filter = this.ns.filter;
    capture.data = this.filteredData;
    capture.interfaceId = this.ns.selectedInterface.getValue();

    this.ns.saveCapture(capture).subscribe((id: number) => {
      capture.id = id;
      this.ns.savedCaptures.push(capture);
      this.saved = true;
    });
  }
  
  showFilter(){
    this.setFilter =  !this.setFilter;
  }
  
}


