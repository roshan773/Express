import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [form, setForm] = useState({ name: '', price: '', description: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/products', form);
      alert('Product Added: ' + res.data.product.name);
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="price" placeholder="Price" onChange={handleChange} required />
      <input name="description" placeholder="Description" onChange={handleChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;
