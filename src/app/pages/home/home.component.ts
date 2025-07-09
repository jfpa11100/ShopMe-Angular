import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, FormsModule, NgOptimizedImage],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  productsService = inject(ProductService);
  router = inject(Router);
  allProducts: Product[] = [];
  products = signal<Product[]>([]);
  searchTerm: string = '';

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.products.set(products);
      },
      error: (err) => {},
    });
  }

  onSearch() {
    if (!this.products) return;
    if (!this.searchTerm) this.products!.set(this.allProducts);
    else
      this.products.set(
        this.products().filter((product) =>
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
  }

  onDeleteProduct(productId:number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will erase the product and it's content",
      icon: 'warning',
      confirmButtonColor: '#00c350',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (!result.isConfirmed) return;
      this.productsService.deleteProduct(productId).subscribe({
        next: () => {
          let index = this.products().findIndex(
            (product) => product.id === productId
          );
          let _products = this.products()
          _products.splice(index, 1)
          this.products.set(_products);

          index = this.allProducts.findIndex(
            (product) => product.id === productId
          );
          this.allProducts.splice(index, 1);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Product couldn't be deleted",
          });
        },
      });
    });
  }

  goToCreateProduct() {
    this.router.navigate(['/new-product']);
  }
}
