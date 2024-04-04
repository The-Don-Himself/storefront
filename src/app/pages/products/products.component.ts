import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductInterface } from '../../interface';
import { ProductService, LoadingService, SnackBarService } from '../../service';
import { isPlatformBrowser } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SHARED_MODULES } from '../../shared/shard.modules';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [...SHARED_MODULES, RouterModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public category!: string;
  public products: ProductInterface[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) { }
  
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const category = params.get('category') as string;
      this.fetchProductsForCategory(category);
    });
  }  

  fetchProductsForCategory(category: string) {
    this.category = category;
    this.loadingService.present();

    if (isPlatformBrowser(this._platformId)) this.productService.getProductsInCategory(category).subscribe((res: ProductInterface[]) => {
      this.loadingService.dismiss();
      this.products = res;
    },
    (err: any) => {
      this.loadingService.dismiss()
      this.snackBarService.presentToast('Failed to fetch products in category', 'danger');
    })
  }
}
