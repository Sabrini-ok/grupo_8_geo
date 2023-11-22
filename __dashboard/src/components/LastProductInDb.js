import React from 'react';
import imagenFondo from '../assets/images/shampoo.jpg';

function LastProductInDb(){
    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último producto ingresado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={imagenFondo} alt=" Shampoo Frutal"/>
                    </div>
                    <p>Delicioso Aroma Frutal - Ideal para el verano</p>
                    <a className="btn" target="_blank" rel="nofollow" href="/">Ver Detalle</a>
                </div>
            </div>
        </div>
    )
}

export default LastProductInDb;
