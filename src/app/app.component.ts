import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SHARED_MODULES } from './shared/shard.modules';
import { UserInterface } from './interface';
import { AuthService } from './service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterModule,
    ...SHARED_MODULES,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'StoreFront';
  user: UserInterface | null = null;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.authService._$user.subscribe((user: UserInterface | null) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }

}
