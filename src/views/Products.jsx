import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    quantity: '',
    waste_percentage: '',
    labour_percentage: '',
    other_percentage: '',
    margin_percentage: '',
    equipment_cost: '',
  });

  const [productMaterials, setProductMaterials] = useState([]);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axiosClient.get('/products')
      .then(({ data }) => {
        setProducts(data.data || []);
        setError('');
      })
      .catch(err => {
        setError('Error fetching products.');
      });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleMaterialChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMaterials = [...productMaterials];
    updatedMaterials[index][name] = value;
    setProductMaterials(updatedMaterials);
  };

  const addProductMaterial = () => {
    setProductMaterials([
      ...productMaterials,
      {
        description: '',
        quantity: '',
        rate: '',
      },
    ]);
  };

  const removeProductMaterial = (index) => {
    const updatedMaterials = productMaterials.filter((_, i) => i !== index);
    setProductMaterials(updatedMaterials);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axiosClient.post('/products', product)
      .then(({ data }) => {
        const productId = data.id;

        const materialRequests = productMaterials.map((material) => ({
          product_id: productId,
          description: material.description,
          quantity: material.quantity,
          rate: material.rate,
        }));

        return Promise.all(
          materialRequests.map((materialRequest) => 
            axiosClient.post(`/products/${productId}/materials`, materialRequest)
          )
        );
      })
      .then(() => {
        fetchProducts();
        setProduct({
          name: '',
          description: '',
          quantity: '',
          waste_percentage: '',
          labour_percentage: '',
          other_percentage: '',
          margin_percentage: '',
          equipment_cost: '',
        });
        setProductMaterials([]);
        setErrors({});
      })
      .catch(err => {
        if (err.response && err.response.status === 422) {
          setErrors(err.response.data.errors);
        }
      });
  };

  return (
    <div className="products-container" style={{ width: '80%', margin: '0 auto' }}>
      <h2>Create New Product</h2>
      <form className="product-form" onSubmit={onSubmit} style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div className="form-group" style={{ flex: '1 1 100%', marginBottom: '10px' }}>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleProductChange}
            required
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name[0]}</p>}
        </div>

        <div className="form-group" style={{ flex: '1 1 100%', marginBottom: '10px' }}>
          <label>Product Description:</label>
          <input
            name="description"
            value={product.description}
            onChange={handleProductChange}
            required
          />
        </div>

        <div className="form-group" style={{ flex: '1 1 50%', marginBottom: '10px' }}>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleProductChange}
            required
          />
        </div>

        <div className="form-group" style={{ flex: '1 1 50%', marginBottom: '10px' }}>
          <label>Waste %:</label>
          <input
            type="number"
            name="waste_percentage"
            value={product.waste_percentage}
            onChange={handleProductChange}
            required
          />
        </div>

        <div className="form-group" style={{ flex: '1 1 50%', marginBottom: '10px' }}>
          <label>Labour Cost %:</label>
          <input
            type="number"
            name="labour_percentage"
            value={product.labour_percentage}
            onChange={handleProductChange}
            required
          />
        </div>

        <div className="form-group" style={{ flex: '1 1 50%', marginBottom: '10px' }}>
          <label>Other Cost %:</label>
          <input
            type="number"
            name="other_percentage"
            value={product.other_percentage}
            onChange={handleProductChange}
            required
          />
        </div>

        <div className="form-group" style={{ flex: '1 1 50%', marginBottom: '10px' }}>
          <label>Margin %:</label>
          <input
            type="number"
            name="margin_percentage"
            value={product.margin_percentage}
            onChange={handleProductChange}
            required
          />
        </div>

        <div className="form-group" style={{ flex: '1 1 50%', marginBottom: '10px' }}>
          <label>Equipment Cost:</label>
          <input
            type="number"
            name="equipment_cost"
            value={product.equipment_cost}
            onChange={handleProductChange}
            required
          />
        </div>

        <h3 style={{ flex: '1 1 100%', marginTop: '20px' }}>Product Materials</h3>
        {productMaterials.map((material, index) => (
          <div key={index} className="card" style={{ flex: '1 1 100%', marginBottom: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
            <h4>Material {index + 1}</h4>
            <div className="form-group" style={{ marginBottom: '10px' }}>
              <label>Material Description:</label>
              <input
                type="text"
                name="description"
                value={material.description}
                onChange={(e) => handleMaterialChange(index, e)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '10px' }}>
              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={material.quantity}
                onChange={(e) => handleMaterialChange(index, e)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '10px' }}>
              <label>Rate:</label>
              <input
                type="number"
                name="rate"
                value={material.rate}
                onChange={(e) => handleMaterialChange(index, e)}
                required
              />
            </div>

            <button type="button" className="btn btn-delete" onClick={() => removeProductMaterial(index)}>
              Remove Material
            </button>
          </div>
        ))}

        <button type="button" className="btn btn-add" onClick={addProductMaterial} style={{ flex: '1 1 100%', marginBottom: '20px' }}>
          Add Product Material
        </button>

        <button type="submit" className="btn btn-block" style={{ flex: '1 1 100%' }}>
          Create Product
        </button>
      </form>

      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
      <h2 style={{ marginTop: '40px' }}>Product List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Waste %</th>
            <th>Labour %</th>
            <th>Other %</th>
            <th>Margin %</th>
            <th>Equipment Cost</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product2 => (
            <tr key={product2.id}>
              <td>{product2.id}</td>
              <td>{product2.name}</td>
              <td>{product2.description}</td>
              <td>{product2.quantity}</td>
              <td>{product2.waste_percentage}</td>
              <td>{product2.labour_percentage}</td>
              <td>{product2.other_percentage}</td>
              <td>{product2.margin_percentage}</td>
              <td>{product2.equipment_cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
