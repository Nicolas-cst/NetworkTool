import { IpRange } from "./ipRange.model";
import { LengthRange } from "./lengthRange.model";

export class Filter {
  destinationIpRanges: IpRange[];
  sourceIpRanges: IpRange[];
  destinationIps: string[];
  sourceIps: string[];
  protocols: string[];
  lengthRange: LengthRange[];

  constructor() {
    this.destinationIpRanges = [];
    this.sourceIpRanges = [];
    this.destinationIps = [];
    this.sourceIps = [];
    this.protocols = [];
    this.lengthRange = [];
  }
  
}
