import React, { useState, useEffect } from 'react';

function ProductCategories() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/categories'); // Cambia la URL según donde esté alojada tu API
        const datos = await respuesta.json();
        setCategorias(datos);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    obtenerCategorias();
  }, []);

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Categorías de productos
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {categorias.map((categoria, index) => (
              <div className="col-lg-6 mb-4" key={index}>
                <div className="card bg-dark text-white shadow">
                  <div className="card-body">{categoria}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCategories;
