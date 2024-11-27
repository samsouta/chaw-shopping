import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button, Progress } from '@nextui-org/react';
import { useStore } from '../store/useStore';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <Button
          color="primary"
          variant="light"
          onClick={() => navigate('/products')}
          className="mt-4"
        >
          Return to Products
        </Button>
      </div>
    );
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const stockStatus = (stock: number) => {
    if (stock > 50) return { color: 'success', text: 'In Stock' };
    if (stock > 0) return { color: 'warning', text: 'Low Stock' };
    return { color: 'danger', text: 'Out of Stock' };
  };

  const status = stockStatus(product.stock);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
          <div className="absolute top-4 right-4 space-y-2">
            <Button
              isIconOnly
              className="bg-white/80 backdrop-blur-md hover:bg-white transition-colors"
              size="sm"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              className="bg-white/80 backdrop-blur-md hover:bg-white transition-colors"
              size="sm"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl font-semibold text-blue-600 mt-2">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600">({product.rating} / 5)</span>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Availability
              </span>
              <span
                className={`text-sm font-medium text-${status.color}-600`}
              >
                {status.text}
              </span>
            </div>
            <Progress
              value={(product.stock / 100) * 100}
              color={status.color as "success" | "warning" | "danger"}
              className="max-w-md"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-900">Quantity</span>
              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              color="primary"
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              startContent={<ShoppingCart className="w-5 h-5" />}
            >
              Add to Cart
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-sm font-medium text-gray-900">Product Details</h3>
            <dl className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Category</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {product.category}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">SKU</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {`SKU-${product.id.padStart(6, '0')}`}
                </dd>
              </div>
            </dl>
          </div>
        </motion.div>
      </div>
    </div>
  );
};