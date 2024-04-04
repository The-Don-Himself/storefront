import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SHARED_MODULES } from './shared/shard.modules';
import { CartInterface, UserInterface } from './interface';
import { AuthService, CartService, ProductService } from './service';
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
  categories: string[] = [];
  carts: CartInterface[] = [];
  number_of_products_in_cart: number = 0

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) {}

  async ngOnInit() {
    if (isPlatformBrowser(this._platformId)) this.authService.setUp()
    this.authService._$user.subscribe((user: UserInterface | null) => {
      this.user = user;
      if(user) {
        this.cartService.getUserCarts(user.id).subscribe((carts: CartInterface[]) => {
          this.carts = carts;

          let number_of_products_in_cart = 0
          for(const cart of carts){
            number_of_products_in_cart = number_of_products_in_cart + cart.products.length
          }
          this.number_of_products_in_cart = number_of_products_in_cart;
        });
      } else {
        this.carts = [];
        this.number_of_products_in_cart = 0;
      }
    });
    this.productService.getAllCategories().subscribe((categories: string[]) => {
      this.categories = categories;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/");
  }

}
