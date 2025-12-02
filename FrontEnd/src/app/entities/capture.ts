import { Filter } from "./filter";
import { Packet } from "./packet";

export class Capture {
  id: number;
  filter: Filter;
  startDate : Date;
  endDate : Date;
  data : Packet[];
  interfaceId : number;
  
  constructor() {
    this.id = 0;
    this.filter = new Filter();
    this.startDate = new Date();
    this.endDate = new Date();
    this.data = [];
    this.interfaceId = -1;
  }
}

