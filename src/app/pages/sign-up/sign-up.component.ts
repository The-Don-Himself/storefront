import { Component } from '@angular/core';
import { SHARED_MODULES } from '../../shared/shard.modules';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { LoadingService, SnackBarService, UserService } from '../../service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ...SHARED_MODULES,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
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

  signupForm: FormGroup = this.formBuilder.group({
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
    private userService: UserService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService
  ) {

  }

  submit() {
    this.loadingService.present();

    const signupData = this.signupForm.value
    this.userService.signUp(signupData).subscribe(
      async () => {
        this.snackBarService.presentToast('User created successfully!', "success");

        this.router.navigateByUrl("/");
        this.loadingService.dismiss();
      },
      (err) => {
        this.snackBarService.presentToast(err.error.message, "danger");
        this.loadingService.dismiss();
      }
    );
  }

}
