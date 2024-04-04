import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  async presentToast(
    message: string, 
    color: "danger" | "dark" | "light" | "medium" | "primary" | "secondary" | "success" | "tertiary" | "warning" | undefined = undefined,
    showDismissButton: boolean = false, 
    duration: number = 3000, 
    position: 'top' | 'middle' | 'bottom' = 'bottom',
  ) {
    this.snackBar.open(message, undefined, {
      duration: duration
    });
  }

}
