import React, { useState } from 'react';

function CheckoutForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) newErrors.zipCode = 'Invalid ZIP code';
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Invalid card number';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expirationDate)) newErrors.expirationDate = 'Invalid expiration date (MM/YY)';
    if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'Invalid CVV';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const inputClass = "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="address" className="block mb-1 text-sm">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.address && <p className={errorClass}>{errors.address}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block mb-1 text-sm">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.city && <p className={errorClass}>{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="zipCode" className="block mb-1 text-sm">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.zipCode && <p className={errorClass}>{errors.zipCode}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="cardNumber" className="block mb-1 text-sm">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          className={inputClass}
        />
        {errors.cardNumber && <p className={errorClass}>{errors.cardNumber}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expirationDate" className="block mb-1 text-sm">Expiration Date</label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            placeholder="MM/YY"
            className={inputClass}
          />
          {errors.expirationDate && <p className={errorClass}>{errors.expirationDate}</p>}
        </div>
        <div>
          <label htmlFor="cvv" className="block mb-1 text-sm">CVV</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="123"
            className={inputClass}
          />
          {errors.cvv && <p className={errorClass}>{errors.cvv}</p>}
        </div>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 text-sm">
        Place Order
      </button>
    </form>
  );
}

export default CheckoutForm;