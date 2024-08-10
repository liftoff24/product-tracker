import React, { useState } from 'react';
import axiosClient from '../axios-client';

const BillOfQuantity = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState('');
  const [calculatedData, setCalculatedData] = useState(null);

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const fetchProductDetails = async () => {
    setError('');
    try {
      const { data: productData } = await axiosClient.get(`/products/${productId}`);
      if (!productData.data) {
        throw new Error('Product data not found');
      }
      setProduct(productData.data);

      const { data: materialsData } = await axiosClient.get(`/products/${productId}/materials`);
      if (!materialsData.data) {
        throw new Error('Product materials not found');
      }
      setMaterials(materialsData.data);

      
      performCalculations(productData.data, materialsData.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setProduct(null);
      setMaterials([]);
      setError('Error fetching product details or materials.');
      setCalculatedData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productId) {
      fetchProductDetails();
    } else {
      setError('Please enter a product ID.');
    }
  };

  const performCalculations = (product, materials) => {
    if (!product || !materials) return; 

    
    const equipmentCost = Number(product.equipment_cost) || 0;
    const wastePercentage = Number(product.waste_percentage) || 0;
    const labourPercentage = Number(product.labour_percentage) || 0;
    const otherPercentage = Number(product.other_percentage) || 0;
    const marginPercentage = Number(product.margin_percentage) || 0;

    const materialCost = materials.reduce((sum, material) => sum + (material.quantity * material.rate), 0);
    const wasteAmount = (wastePercentage / 100) * materialCost;
    const labourCost = (labourPercentage / 100) * (materialCost + wasteAmount);
    const otherCost = (otherPercentage / 100) * (materialCost + wasteAmount + labourCost);
    const marginAmount = (marginPercentage / 100) * (materialCost + wasteAmount + labourCost + otherCost);
    const subTotal = materialCost + wasteAmount + labourCost + equipmentCost + otherCost + marginAmount;
    const total = subTotal * product.quantity;

    setCalculatedData({
      materialCost,
      wasteAmount,
      labourCost,
      otherCost,
      marginAmount,
      subTotal,
      total,
      equipmentCost
    });
  };

  return (
    <div className="bill-of-quantity-container" style={{ width: '80%', margin: '0 auto' }}>
      <h2>Bill of Quantity</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={handleProductIdChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-block">Fetch Product Details</button>
      </form>

      {error && <p className="error">{error}</p>}

      {product && (
        <div className="product-details" style={{ display: 'flex', justifyContent: 'space-between', margin: '25px 0' }}>
          <div style={{ flex: 1 }}>
            <h3>Product Details</h3>
            <table>
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{product.name}</td>
                </tr>
                <tr>
                  <th>Description:</th>
                  <td>{product.description}</td>
                </tr>
                <tr>
                  <th>Quantity:</th>
                  <td>{product.quantity}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ flex: 1 }}>
            <h3>Costs</h3>
            <table>
              <tbody>
                <tr>
                  <th>Waste %:</th>
                  <td>{product.waste_percentage}%</td>
                </tr>
                <tr>
                  <th>Labour Cost %:</th>
                  <td>{product.labour_percentage}%</td>
                </tr>
                <tr>
                  <th>Other Cost %:</th>
                  <td>{product.other_percentage}%</td>
                </tr>
                <tr>
                  <th>Margin %:</th>
                  <td>{product.margin_percentage}%</td>
                </tr>
                <tr>
                  <th>Equipment Cost:</th>
                  <td>{(calculatedData && calculatedData.equipmentCost.toFixed(2)) || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {materials.length > 0 && (
        <div className="product-materials" style={{ margin: '60px 0' }}>
          <h3>Product Materials</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {materials.map(material => (
                <tr key={material.id}>
                  <td>{material.id}</td>
                  <td>{material.description}</td>
                  <td>{material.quantity}</td>
                  <td>{material.rate}</td>
                  <td>{(material.quantity * material.rate).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {calculatedData && (
        <div className="cost-calculations" style={{ margin: '60px 0' }}>
          <h3>Bill of Quantity</h3>
          <table>
            <tbody>
              <tr>
                <th>Material Cost:</th>
                <td>{calculatedData.materialCost.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Waste Amount:</th>
                <td>{calculatedData.wasteAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Labour Cost:</th>
                <td>{calculatedData.labourCost.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Equipment Cost:</th>
                <td>{calculatedData.equipmentCost.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Other Cost:</th>
                <td>{calculatedData.otherCost.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Margin Amount:</th>
                <td>{calculatedData.marginAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <th>SUB TOTAL:</th>
                <td>{calculatedData.subTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <th>TOTAL:</th>
                <td><b>{calculatedData.total.toFixed(2)}</b></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BillOfQuantity;
