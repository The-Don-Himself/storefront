import { Component } from '@angular/core';
import { CartInterface, UserInterface } from '../../interface';
import { AuthService, CartService } from '../../service';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { SHARED_MODULES } from '../../shared/shard.modules';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [...SHARED_MODULES, RouterModule, ProductListComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  carts: CartInterface[] = [];

  constructor(
    private authService: AuthService,
    private cartService: CartService,
  ) {}

  async ngOnInit() {
    this.authService._$user.subscribe((user: UserInterface | null) => {
      if(user) {
        this.cartService.getUserCarts(user.id).subscribe((carts: CartInterface[]) => {
          this.carts = carts;
        });
      } else {
        this.carts = [];
      }
    });
  }

}
