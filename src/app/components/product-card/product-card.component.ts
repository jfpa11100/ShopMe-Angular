import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage, CurrencyPipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() deleteProduct = new EventEmitter<number>();
  router = inject(Router);

  goToProductDetail(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  onDeleteProduct(productId: number) {
    this.deleteProduct.emit(productId);
  }
}
