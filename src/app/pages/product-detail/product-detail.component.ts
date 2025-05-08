import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [NgOptimizedImage],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  productService = inject(ProductService)
  route = inject(ActivatedRoute)
  product?: Product;

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(productId!).subscribe({
      next: (product) => {
        this.product = product 
      },
      error: () => {} ,
    });
  }

}
