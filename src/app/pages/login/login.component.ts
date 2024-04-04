import { Component } from '@angular/core';
import { SHARED_MODULES } from '../../shared/shard.modules';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoadingService, SnackBarService } from '../../service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ...SHARED_MODULES,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;

  cols$: Observable<number> = this.breakpointObserver
  .observe([Breakpoints.Small, Breakpoints.XSmall])
  .pipe(
    map((result) => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        return 1;
      } else if (result.breakpoints[Breakpoints.Small]) {
        return 2;
      } else {
        return 3;
      }
    }),
    shareReplay()
  );

  loginForm: FormGroup = this.formBuilder.group({
    username: [
      "",
      [
        Validators.required,
      ],
    ],
    password: [
      "",
      [
        Validators.required,
      ],
    ],
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService
  ) {

  }

  submit() {
    this.loadingService.present();

    const loginData = this.loginForm.value
    this.authService.login(loginData).subscribe(
      async (res: any) => {
        this.authService.postLoginToken(res.token);

        this.router.navigateByUrl("/");
        this.loadingService.dismiss();
      },
      (err) => {
        this.snackBarService.presentToast('username or password is incorrect', "danger");
        this.loadingService.dismiss();
      }
    );
  }

}
