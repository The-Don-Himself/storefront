import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../../components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private dialog: MatDialog) { }

  public present(){
    this.dialog.open(LoadingComponent, {
      width: '250px',
      disableClose: true,
    });
  }

  public dismiss(){
    this.dialog.closeAll();
  }
  
}
