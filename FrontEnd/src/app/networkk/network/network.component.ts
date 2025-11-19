import { Component } from '@angular/core';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NetworkService } from '../../Services/network.service';
import { Packet } from '../../models/packet.model';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { NetworkFilterComponent } from "../network-filter/network-filter.component";

@Component({
  selector: 'app-network',
  imports: [NzSpaceModule, NzButtonModule, NzTableModule, NzIconModule, TranslatePipe, NetworkFilterComponent],
  templateUrl: './network.component.html',
  styleUrl: './network.component.scss'
})

export class NetworkComponent {

  constructor(
    public ns: NetworkService
  ){}

  packets : Packet[] =[];
  ws: WebSocket | null = null;
  setFilter: boolean = false;

  startCapture(){
    if(!this.ws){

      this.ws = new WebSocket('ws://127.0.0.1:8000/network/start');

      this.ws.onopen = () => {
        console.log('WebSocket connection opened');
      };

      this.ws.onmessage = (event) => {
        console.log('Received data:', event.data);
      };

      this.ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }
  }

  stopCapture(){
    if(this.ws){
      this.ws.close();
      this.ws = null;
    }
  }
  
  showFilter(){
    this.setFilter =  !this.setFilter;
    console.log(this.setFilter)
  }
  
}


