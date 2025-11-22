import { IpRange } from "./ipRange";
import { LengthRange } from "./lengthRange";
import { Protocol } from "./protocol";

export class Filter {
  destinationIpRanges: IpRange[];
  sourceIpRanges: IpRange[];
  destinationIps: string[];
  sourceIps: string[];
  protocols: Protocol[];
  lengthRanges: LengthRange[];

  constructor() {
    this.destinationIpRanges = [];
    this.sourceIpRanges = [];
    this.destinationIps = [];
    this.sourceIps = [];
    this.protocols = [];
    this.lengthRanges = [];
  }
  
}
