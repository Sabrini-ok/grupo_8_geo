import React, { useState, useEffect } from 'react';
import SmallCard from './SmallCard';

function ContentRowProducts() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const productCountResponse = await fetch('http://localhost:3000/api/products/count');
        const productCountData = await productCountResponse.json();
        setProductCount(productCountData.count);

        const userCountResponse = await fetch('http://localhost:3000/api/users/count');
        const userCountData = await userCountResponse.json();
        setUserCount(userCountData.count);

      } catch (error) {
        console.error('Error buscando la información', error);
      }
    };

    fetchData();
  }, []);

  let cartProps = [
    {
      title: 'Productos ingresados',
      color: 'primary',
      cuantity: productCount,
      icon: 'fa-clipboard-list',
    },
    {
      title: 'Usuarios registrados',
      color: 'success',
      cuantity: userCount,
      icon: 'fa-award',
    },
  ];

  return (
    <div className="row">
      {cartProps.map((item, index) => (
        <SmallCard {...item} key={index} />
      ))}
    </div>
  );
}

export default ContentRowProducts;
