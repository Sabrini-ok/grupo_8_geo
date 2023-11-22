import React from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Productos --> */

let productsInDB = {
    title: 'Productos ingresados',
    color: 'primary', 
    cuantity: 21,
    icon: 'fa-clipboard-list'
}

/* <!-- Usuarios --> */

let usersInDB = {
    title:'Usuarios registrados', 
    color:'success', 
    cuantity: '79',
    icon:'fa-award'
}


let cartProps = [productsInDB, usersInDB];

function ContentRowProducts(){
    return (
    
        <div className="row">
            
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowProducts;