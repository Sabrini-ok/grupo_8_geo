import React from 'react';
import LastProductInDb from './LastProductInDb';
import ProductCategories from './ProductCategories';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastProductInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <ProductCategories />

        </div>
    )
}

export default ContentRowCenter;