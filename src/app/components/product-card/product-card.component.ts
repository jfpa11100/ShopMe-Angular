import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!:Product;
  router = inject(Router)

  goToProductDetail(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
