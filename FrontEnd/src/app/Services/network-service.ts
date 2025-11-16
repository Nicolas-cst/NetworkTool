import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(
    private http: HttpClient
  ) { }

  
  private socket: WebSocket | null = null;
  public selectedInterface = new BehaviorSubject<number>(0);
  selectedInterface$ = this.selectedInterface.asObservable();


  // WEBSOCKET
  connect(onMessage: (packet: any) => void) {
    this.socket = new WebSocket(`ws://127.0.0.1:8000/network/start`);
    
    this.socket.onopen = () => {
      console.log("Connexion WebSocket ouverte");
    };

    this.socket.onmessage = (event) => {
      const packet = JSON.parse(event.data);
      console.log("Packet reçu:", packet);
      onMessage(packet);
    };

    this.socket.onclose = () => {
      console.log("Connexion WebSocket fermée");
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

// REQUETES HTTP
  getAvailableInterfaces(): Observable<string[]> {
    return this.http.get<string[]>('http://127.0.0.1:8000/network/interfaces');
  }

} 
