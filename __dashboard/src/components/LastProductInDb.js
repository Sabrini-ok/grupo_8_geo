import React, { useState, useEffect } from 'react';

const servidorBase = 'http://localhost:3000';
function LastProductInDb() {
    const [lastProduct, setLastProduct] = useState(null);

    useEffect(() => {
        const fetchLastProduct = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products/lastProduct');
                const data = await response.json();
                setLastProduct(data);
            } catch (error) {
                console.error('Error al buscar el último', error);
            }
        };

        fetchLastProduct();
    }, []);

    return (
        <div className="col-lg-6 mb-4">
            {lastProduct && (
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">Último producto ingresado</h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img
                                className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                                style={{ width: '40rem' }}
                                src={`${servidorBase}/img/prodImages/${lastProduct.image}`}
                                alt={lastProduct.productName}
                            />
                        </div>
                        <h3>{lastProduct.productName}</h3>
                        <p>{lastProduct.description}</p>
                        <a className="btn" target="_blank" rel="nofollow" href="/">
                            Ver Detalle
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LastProductInDb;
