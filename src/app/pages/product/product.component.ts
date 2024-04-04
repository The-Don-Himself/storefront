import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { LoadingService, ProductService, SnackBarService } from '../../service';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '../../interface';
import { isPlatformBrowser } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SHARED_MODULES } from '../../shared/shard.modules';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [...SHARED_MODULES, ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  public product_id!: number;
  public product!: ProductInterface;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) { }
  
  ngOnInit() {
    this.product_id = this.activatedRoute.snapshot.paramMap.get('product_id') as unknown as number;
    this.loadingService.present();

    if (isPlatformBrowser(this._platformId)) this.productService.getProduct(this.product_id).subscribe((res) => {
      this.loadingService.dismiss();
      this.product = res;
    },
    (err: any) => {
      this.loadingService.dismiss()
      this.snackBarService.presentToast('Failed to fetch product', 'danger');
    })
  }
}
