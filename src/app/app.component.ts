import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SHARED_MODULES } from './shared/shard.modules';
import { UserInterface } from './interface';
import { AuthService } from './service';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) {}

  async ngOnInit() {
    if (isPlatformBrowser(this._platformId)) this.authService.setUp()
    this.authService._$user.subscribe((user: UserInterface | null) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/");
  }

}
