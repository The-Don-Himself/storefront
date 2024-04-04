import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem(key: string){
    const storedUserData = localStorage.getItem(key)

    return storedUserData? JSON.parse(storedUserData) : null
  }

  storeItem(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value))
  }

  removeItem(key: string){
    localStorage.removeItem(key)
  }

  clear(){
    localStorage.clear()
  }
}
