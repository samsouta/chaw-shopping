import { Product } from '../types';

export const getUniqueCategories = (products: Product[]): string[] => {
  return Array.from(new Set(products.map((product) => product.category)));
};

export const filterProducts = (
  products: Product[],
  category: string,
  priceRange: [number, number]
): Product[] => {
  return products.filter(
    (product) =>
      (!category || product.category === category) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    default:
      return sortedProducts;
  }
};