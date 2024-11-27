import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { ProductSort } from '../components/ProductSort';
import {
  getUniqueCategories,
  filterProducts,
  sortProducts,
} from '../utils/productUtils';

export const Products = () => {
  const products = useStore((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');

  const categories = getUniqueCategories(products);
  const maxPrice = Math.max(...products.map((p) => p.price));

  const filteredProducts = filterProducts(products, selectedCategory, priceRange);
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            priceRange={priceRange}
            maxPrice={maxPrice}
            onCategoryChange={setSelectedCategory}
            onPriceChange={setPriceRange}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedCategory || 'All Products'}
            </h1>
            <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};