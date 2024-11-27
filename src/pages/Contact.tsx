import React from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-gray-600"
        >
          We'd love to hear from you. Please fill out this form or use our contact information.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                label="First Name"
                placeholder="Enter your first name"
                required
              />
              <Input
                type="text"
                label="Last Name"
                placeholder="Enter your last name"
                required
              />
            </div>
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              required
            />
            <Input
              type="tel"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <Textarea
              label="Message"
              placeholder="How can we help you?"
              minRows={4}
              required
            />
            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full"
              endContent={<Send className="w-4 h-4" />}
            >
              Send Message
            </Button>
          </form>
        </motion.div>

        {/* Contact Information & Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a href="mailto:support@shopfuture.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                    support@shopfuture.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <a href="tel:+1234567890" className="text-gray-600 hover:text-blue-600 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">
                    123 Future Street<br />
                    Tech City, TC 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                title="Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25987368715491!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564756836!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};