import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule],
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  newProductForm!: FormGroup;

  ngOnInit() {
    this.newProductForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      price: [
        null,
        [Validators.required, Validators.min(0.1), Validators.max(20000)],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(99999),
        ],
      ],
      imageUrl1: ['', Validators.required],
      imageUrl2: [''],
      imageUrl3: [''],
    });
  }

  onSubmit() {
    if (!this.newProductForm.valid) {
      Swal.fire({
        icon: 'error',
        text: 'Formulario inválido, completa todos los campos correctamente',
      });
      return;
    }

    const newProduct: Product = {
      id: Math.random()*100000,
      title: this.newProductForm.value.title,
      price: this.newProductForm.value.price,
      description: this.newProductForm.value.description,
      slug: this.newProductForm.value.title.replaceAll(' ', '-'),
      images:
        this.newProductForm.value.imageUrl1 +
        this.newProductForm.value.imageUrl2 +
        this.newProductForm.value.imageUrl3,
      
    };

    try {
      this.productService.createProduct(newProduct);
      Swal.fire({
        icon: 'success',
        text: 'Propiedad guardada',
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: "Product couldn't be loaded",
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
