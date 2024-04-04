import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../interface';
import { SHARED_MODULES } from '../../shared/shard.modules';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [...SHARED_MODULES],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: ProductInterface
}
