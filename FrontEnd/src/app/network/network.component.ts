import { Component } from '@angular/core';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NetworkService } from '../Services/network-service';
import { Packet } from '../models/packet.module';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-network',
  imports: [NzSpaceModule, NzButtonModule, NzTableModule],
  templateUrl: './network.component.html',
  styleUrl: './network.component.scss'
})
export class NetworkComponent {


  constructor(
    public ns: NetworkService
  ){}

  packets : Packet[] =[];

  startCapture(){
    this.ns.connect((data : Packet[] = []) => { 
      this.packets.push(...data);
    }); 
  }

  stopCapture(){
    this.ns.disconnect();
  }
}


