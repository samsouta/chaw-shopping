import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Avatar, Tabs, Tab } from '@nextui-org/react';
import { User, Package, Settings, LogOut, Edit2, Save } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const mockOrders = [
    {
      id: '1',
      date: '2024-02-20',
      status: 'Delivered',
      total: 299.99,
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 299.99 }
      ]
    },
    {
      id: '2',
      date: '2024-02-15',
      status: 'Processing',
      total: 179.98,
      items: [
        { name: 'Smart Fitness Watch', quantity: 1, price: 179.98 }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-8"
      >
        <div className="flex items-center gap-6">
          <Avatar
            className="w-24 h-24 text-large"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            showFallback
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">Member since February 2024</p>
          </div>
          <Button
            color="danger"
            variant="light"
            startContent={<LogOut className="w-4 h-4" />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </motion.div>

      {/* Profile Content */}
      <Tabs aria-label="Profile sections" color="primary" className="mb-8">
        <Tab
          key="account"
          title={
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Account</span>
            </div>
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
              <Button
                color={isEditing ? "success" : "primary"}
                variant="flat"
                startContent={isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                value={editedUser?.name}
                onChange={(e) => setEditedUser({ ...editedUser!, name: e.target.value })}
                isDisabled={!isEditing}
              />
              <Input
                label="Email"
                value={editedUser?.email}
                onChange={(e) => setEditedUser({ ...editedUser!, email: e.target.value })}
                isDisabled={!isEditing}
              />
              <Input
                label="Phone"
                placeholder="Add phone number"
                isDisabled={!isEditing}
              />
              <Input
                label="Location"
                placeholder="Add location"
                isDisabled={!isEditing}
              />
            </div>
          </motion.div>
        </Tab>

        <Tab
          key="orders"
          title={
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Orders</span>
            </div>
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-blue-600">
                      ${order.total.toFixed(2)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </Tab>

        <Tab
          key="settings"
          title={
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </div>
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-600">
                    Receive emails about your orders and account activity
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button color="primary" variant="flat" size="sm">
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Delete Account</h3>
                  <p className="text-sm text-gray-600">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button color="danger" variant="flat" size="sm">
                  Delete Account
                </Button>
              </div>
            </div>
          </motion.div>
        </Tab>
      </Tabs>
    </div>
  );
};