import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@nextui-org/react';
import { useStore } from '../store/useStore';

export const Cart = () => {
  const { cart, removeFromCart } = useStore();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="text-gray-600">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products">
            <Button
              color="primary"
              variant="flat"
              className="mt-4"
              endContent={<ArrowRight className="w-4 h-4" />}
            >
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 space-y-4"
        >
          {cart.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-blue-600 font-medium">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-gray-600">
                    Quantity: {item.quantity}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <Button
                  isIconOnly
                  color="danger"
                  variant="light"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 h-fit space-y-6"
        >
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-gray-900">Free</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-base font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-xl font-bold text-blue-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <Button
            color="primary"
            size="lg"
            className="w-full"
            endContent={<ArrowRight className="w-4 h-4" />}
          >
            Proceed to Checkout
          </Button>

          <Link to="/products">
            <Button
              variant="light"
              size="lg"
              className="w-full"
            >
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};