import { Category } from "./category.interface";

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  images: string[];
  description?: string;
}
