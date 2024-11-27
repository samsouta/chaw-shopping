import React from 'react';
import { Slider } from '@nextui-org/react';
import { Filter } from 'lucide-react';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  priceRange: [number, number];
  maxPrice: number;
  onCategoryChange: (category: string) => void;
  onPriceChange: (value: [number, number]) => void;
}

export const ProductFilters = ({
  categories,
  selectedCategory,
  priceRange,
  maxPrice,
  onCategoryChange,
  onPriceChange,
}: ProductFiltersProps) => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
        <Filter className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Filters</h3>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('')}
            className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
              selectedCategory === ''
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
        <Slider
          size="sm"
          step={10}
          minValue={0}
          maxValue={maxPrice}
          value={priceRange}
          onChange={(value) => onPriceChange(value as [number, number])}
          className="max-w-md"
          showSteps={true}
          label="Price"
          formatOptions={{ style: 'currency', currency: 'USD' }}
        />
      </div>
    </div>
  );
};