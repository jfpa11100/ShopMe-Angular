import { Category } from "./category.interface";

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  category: Category;
  images: string[];
  description?: string;
}
