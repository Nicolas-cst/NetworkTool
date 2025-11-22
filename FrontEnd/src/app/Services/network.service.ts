import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../entities/filter';
import { Protocol } from '../entities/protocol';


@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(
    private http: HttpClient
  ) { }

  public selectedInterface = new BehaviorSubject<number>(0);
  selectedInterface$ = this.selectedInterface.asObservable();
  
  public filter: Filter = new Filter();

  // TODO : trouver une liste exhaustive des protocoles
  allProtocols : Protocol[] = [{"id":1, "name":"Ethernet"},
  {"id":2, "name":"IPv4"},
  {"id":3, "name":"IPv6"},
  {"id":4, "name":"TCP"},
  {"id":5, "name":"UDP"},
  {"id":6, "name":"ICMP"},
  {"id":7, "name":"ICMPv6"},
  {"id":8, "name":"ARP"},
  {"id":9, "name":"DNS"},
  {"id":10, "name":"DHCP"},
  {"id":11, "name":"BOOTP"},
  {"id":12, "name":"HTTP"},
  {"id":13, "name":"HTTP/2"},
  {"id":14, "name":"HTTP/3"},
  {"id":15, "name":"TLS/SSL"},
  {"id":16, "name":"QUIC"},
  {"id":17, "name":"FTP"},
  {"id":18, "name":"TFTP"},
  {"id":19, "name":"SSH"},
  {"id":20, "name":"Telnet"},
  {"id":21, "name":"SMTP"},
  {"id":22, "name":"POP3"},
  {"id":23, "name":"IMAP"},
  {"id":24, "name":"SNMP"},
  {"id":25, "name":"NTP"},
  {"id":26, "name":"SIP"},
  {"id":27, "name":"RTP"},
  {"id":28, "name":"RTCP"},
  {"id":29, "name":"SDP"},
  {"id":30, "name":"WebSocket"},
  {"id":31, "name":"MQTT"},
  {"id":32, "name":"CoAP"},
  {"id":33, "name":"Modbus"},
  {"id":34, "name":"OPC-UA"},
  {"id":35, "name":"BACnet"},
  {"id":36, "name":"ZigBee"},
  {"id":37, "name":"Bluetooth"},
  {"id":38, "name":"BLE"},
  {"id":39, "name":"USB"},
  {"id":40, "name":"PPP"},
  {"id":41, "name":"PPPoE"},
  {"id":42, "name":"MPLS"},
  {"id":43, "name":"STP"},
  {"id":44, "name":"RSTP"},
  {"id":45, "name":"LLDP"},
  {"id":46, "name":"CDP"},
  {"id":47, "name":"OSPF"},
  {"id":48, "name":"BGP"},
  {"id":49, "name":"RIP"},
  {"id":50, "name":"IS-IS"},
  {"id":51, "name":"VRRP"},
  {"id":52, "name":"HSRP"},
  {"id":53, "name":"IGMP"},
  {"id":54, "name":"MLD"},
  {"id":55, "name":"GRE"},
  {"id":56, "name":"IPsec ESP"},
  {"id":57, "name":"IPsec AH"},
  {"id":58, "name":"IKEv1"},
  {"id":59, "name":"IKEv2"},
  {"id":60, "name":"Kerberos"},
  {"id":61, "name":"LDAP"},
  {"id":62, "name":"RADIUS"},
  {"id":63, "name":"TACACS+"},
  {"id":64, "name":"SMB"},
  {"id":65, "name":"SMB2"},
  {"id":66, "name":"SMB3"},
  {"id":67, "name":"CIFS"},
  {"id":68, "name":"NFS"},
  {"id":69, "name":"AFP"},
  {"id":70, "name":"NetBIOS"},
  {"id":71, "name":"Syslog"},
  {"id":72, "name":"DHCPv6"},
  {"id":73, "name":"mDNS"},
  {"id":74, "name":"SSDP"},
  {"id":75, "name":"H.323"},
  {"id":76, "name":"MGCP"},
  {"id":77, "name":"Diameter"},
  {"id":78, "name":"GTP"},
  {"id":79, "name":"SCTP"},
  {"id":80, "name":"IEEE 802.11"},
  {"id":81, "name":"Radiotap"},
  {"id":82, "name":"802.1X"},
  {"id":83, "name":"EAP"},
  {"id":84, "name":"QUIC"},
  {"id":85, "name":"CARP"},
  {"id":86, "name":"WireGuard"},
  {"id":87, "name":"OpenVPN"},
  {"id":88, "name":"DNS-SD"},
  {"id":89, "name":"DTP"},
  {"id":90, "name":"VTP"},
  {"id":91, "name":"FCoE"},
  {"id":92, "name":"iSCSI"},
  {"id":93, "name":"TLS 1.3"},
  {"id":94, "name":"JSON (décodage)"},
  {"id":95, "name":"XML (décodage)"},
  {"id":96, "name":"SMB Direct"},
  {"id":97, "name":"DHCP Relay"},
  {"id":98, "name":"L2TP"},
  {"id":99, "name":"SCTP"},
  {"id":100, "name":"RTP Event"}];



  // REQUETES HTTP
  getAvailableInterfaces(): Observable<string[]> {
    return this.http.get<string[]>('http://127.0.0.1:8000/network/interfaces');
  }

} 
