import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Filter } from '../../entities/filter';
import { NetworkService } from '../../Services/network.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IpRange } from '../../entities/ipRange';
import { Protocol } from '../../entities/protocol';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { LengthRange } from '../../entities/lengthRange';

@Component({
  selector: 'app-network-filter',
  imports: [NzModalModule, TranslatePipe, NzCheckboxModule, FormsModule, NzFormModule, NzSpaceModule, NzButtonModule, NzIconModule, NzSelectModule, NzTagModule],
  templateUrl: './network-filter.component.html',
  styleUrl: './network-filter.component.scss',
})
export class NetworkFilterComponent implements OnInit {

  constructor(
    public ns: NetworkService,
    public cdr: ChangeDetectorRef
  ) { }

  showIpRange: boolean = false;
  isVisible: boolean = false;
  newFilter: Filter = new Filter();

  // IP RANGE
  ipRangeIsAlreadyInSource: boolean = false;
  ipRangeIsAlreadyInDestination: boolean = false;
  ipRangeFormatIsValid: boolean = false;
  startIp: string = "";
  endIp: string = "";

  //IP SIMPLE
  ipAlreadyInSource: boolean = true;
  ipAlreadyInDestination: boolean = true;
  ip: string = "";
  ipFormatIsValid: boolean = false;

  // PROTOCOLS
  protocolsInFilter: Protocol[] = [];
  
  // LENGTH RANGE
  minLength: number = 0;
  maxLength: number = 100000;
  isLengthRangeValid: boolean = true;

  ngOnInit() {
    this.newFilter = this.ns.filter; // On ajoute l'ancien filtre au filtre courant et on fera les modifs dessus.
    this.isVisible = true;
  }

  ngOnDestroy() {
    this.isVisible = false;
  }

  handleSaveFilter() {
    // 
    this.handleCloseModal();
  }

  handleCloseModal() {
    this.isVisible = false;
  }

  // IP SIMPLE VALIDATION

  onIpChange() {
    // Vérifier à chaque nouvelle entrée si : le format est valide, et si l'ip est déjà dans les filtres
    if (this.isValidIp(this.ip)) {
      this.ipAlreadyInSource = this.newFilter.sourceIps.indexOf(this.ip) != -1;
      this.ipAlreadyInDestination = this.newFilter.destinationIps.indexOf(this.ip) != -1;
      this.ipFormatIsValid = true;
    } else {
      this.ipFormatIsValid = false;
    }
  }

  addIpFilter(type: string, isRange: boolean) {
    if (isRange) {
      let ipRange = new IpRange(this.startIp, this.endIp);
      if (type == 'both' || type == "source") {
        this.newFilter.sourceIpRanges.push(ipRange);
      }
      if (type == 'both' || type == "destination") {
        this.newFilter.destinationIpRanges.push(ipRange);
      }
    } else {
      if (type == 'both' || type == "source") {
        this.newFilter.sourceIps.push(this.ip)
      }
      if (type == 'both' || type == "destination") {
        this.newFilter.destinationIps.push(this.ip)
      }
    }

    this.ip = "";
    this.startIp = "";
    this.endIp = "";
    this.onIpRangeChange();
    this.onIpChange();
  }

  removeIpFilter(type: string, ip: string) {
    if (type == 'both' || type == "source") {
      const index = this.newFilter.sourceIps.indexOf(ip);
      if (index > -1) {
        this.newFilter.sourceIps.splice(index, 1);
      }
    }
    if (type == 'both' || type == "destination") {
      const index = this.newFilter.destinationIps.indexOf(ip);
      if (index > -1) {
        this.newFilter.destinationIps.splice(index, 1);
      }
    }
    this.cdr.markForCheck();
  }

  isValidIp(ip: string): boolean {
    const regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!regex.test(ip)) {
      return false;
    }

    const parts = ip.split('.');
    return parts.every(part => {
      const num = Number(part);
      return num >= 0 && num <= 255;
    });
  }

  // IP RANGE VALIDATION

  onIpRangeChange() {
    // Vérifier à chaque nouvelle entrée si : le format est valide, et si l'ip est déjà dans les filtres
    if (this.isIpRangeValid(new IpRange(this.startIp, this.endIp))) {
      this.ipRangeIsAlreadyInSource = this.newFilter.sourceIpRanges.findIndex((range: IpRange) => range.start === this.startIp && range.end === this.endIp) != -1;
      this.ipRangeIsAlreadyInDestination = this.newFilter.destinationIpRanges.findIndex((range: IpRange) => range.start === this.startIp && range.end === this.endIp) != -1;
      this.ipRangeFormatIsValid = true;
    } else {
      this.ipRangeFormatIsValid = false;
    }
  }

  removeIpRangeFilter(type: string, ipRange: IpRange) {
    if (type == 'both' || type == "source") {
      const index = this.newFilter.sourceIpRanges.indexOf(ipRange);
      if (index > -1) {
        this.newFilter.sourceIpRanges.splice(index, 1);
      }
    }
    if (type == 'both' || type == "destination") {
      const index = this.newFilter.destinationIpRanges.indexOf(ipRange);
      if (index > -1) {
        this.newFilter.destinationIpRanges.splice(index, 1);
      }
    }
    this.cdr.markForCheck();
  }

  isIpRangeValid(ipRange: IpRange) {
    if (this.isValidIp(ipRange.start) && this.isValidIp(ipRange.end)) {
      if (this.ipToNumber(ipRange.start) < this.ipToNumber(ipRange.end)) {
        return true;
      }
    }
    return false;
  }

  ipToNumber(ip: string) {
    const parts = ip.split('.').map(Number);
    const result = (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
    console.log(result);
    return result;
  }

  // Length RANGE

  addLengthRange() {
    let newRange = new LengthRange(this.cleanLength(this.minLength), this.cleanLength(this.maxLength));
    this.newFilter.lengthRanges.push(newRange);
    this.minLength = 0;
    this.maxLength = 100000;
    this.onLengthChange();
  }

  onLengthChange() {
    const rangeAlreadyExists = this.newFilter.lengthRanges.some(
      range => range.min === this.minLength && range.max === this.maxLength
    );

    const hasValidBounds = 
      this.minLength >= 0 && 
      this.maxLength >= 0 && 
      this.maxLength <= 100000 && 
      this.minLength < this.maxLength;

    this.isLengthRangeValid = !rangeAlreadyExists && hasValidBounds;
  }

  removeLengthRange(lengthRange: LengthRange) {
    const index = this.newFilter.lengthRanges.indexOf(lengthRange);
    if (index >= 0) {
      this.newFilter.lengthRanges.splice(index, 1);
    }
    this.cdr.markForCheck();
  }

  cleanLength(n: number): number{
    let s = String(n);
    s = s.replace(/^0+/, "");
    if (s === "" || s === ".") return 0;
    if (s.includes(".")) {
        s = s.replace(/0+$/, "");
        s = s.replace(/\.$/, "");
    }
    return Number(s);
  }
}