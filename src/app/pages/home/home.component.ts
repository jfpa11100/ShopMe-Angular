import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  productsService = inject(ProductService);
  products?: Product[] = [];
  copyProducts = signal<Product[]|undefined>([]);
  searchTerm: string = ''

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.copyProducts?.set(this.products)
      },
      error: (err) => {
        this.products = undefined;
      },
    });
  }

  onSearch(){
    console.log('Entre')
    console.log(this.searchTerm)
    if (!this.products) return
    if (!this.searchTerm) this.copyProducts!.set(this.products);
    else
      this.copyProducts.set(
        this.products.filter((product) =>
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
  }
}
