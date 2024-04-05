import { Component, Input } from '@angular/core';
import { ProductService } from '../../service';
import { ProductInterface } from '../../interface';
import { SHARED_MODULES } from '../../shared/shard.modules';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [...SHARED_MODULES],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() product_id!: number
  product!: ProductInterface;

  constructor(
    private productService: ProductService,
  ) {}

  async ngOnInit() {
    this.productService.getProduct(this.product_id).subscribe((product: ProductInterface) => {
      this.product = product;
    });
  }
}
