import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProductInterface } from '../../interface';
import { ProductService, LoadingService, SnackBarService } from '../../service';
import { SHARED_MODULES } from '../../shared/shard.modules';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [...SHARED_MODULES, RouterModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products: ProductInterface[] = [];

  constructor(
    private productService: ProductService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) {}

  async ngOnInit() {
    this.loadingService.present();
    if (isPlatformBrowser(this._platformId)) this.productService.getAllProducts().subscribe((res: ProductInterface[]) => {
      this.loadingService.dismiss();
      this.products = res;
    },
    (err: any) => {
      this.loadingService.dismiss()
      this.snackBarService.presentToast('Failed to fetch products', 'danger');
    })
  }
}
