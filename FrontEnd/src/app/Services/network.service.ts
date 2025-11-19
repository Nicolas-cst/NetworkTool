import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filter.model';
import { IpRange } from '../models/ipRange.model';


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



  // REQUETES HTTP
  getAvailableInterfaces(): Observable<string[]> {
    return this.http.get<string[]>('http://127.0.0.1:8000/network/interfaces');
  }

} 
