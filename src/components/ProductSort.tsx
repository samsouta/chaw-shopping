import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

interface ProductSortProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const ProductSort = ({ sortBy, onSortChange }: ProductSortProps) => {
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating-desc', label: 'Highest Rated' },
  ];

  return (
    <Select
      size="sm"
      label="Sort by"
      selectedKeys={[sortBy]}
      onChange={(e) => onSortChange(e.target.value)}
      className="max-w-xs"
    >
      {sortOptions.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};