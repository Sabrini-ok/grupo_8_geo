import React, { useState, useEffect } from 'react';

function Chart() {
  const [productData, setProductData] = useState({ products: [] });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products/');
        const data = await response.json();
        setProductData(data); 
      } catch (error) {
        console.error('Error buscando la información', error);
      }
    };
  
    fetchProductData(); 
  }, []);

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Producto</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Categoría ID</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(productData.products) && productData.products.length > 0 ? (
                productData.products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.image}</td>
                    <td>{product.categoryId}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No hay datos disponibles</td>
                </tr>
              )}
            </tbody>

            {Array.isArray(productData.products) && productData.products.length > 0 && (
              <tfoot>
                <tr>
                  <th>ID</th>
                  <th>Nombre del Producto</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th>Categoría ID</th>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Chart;
