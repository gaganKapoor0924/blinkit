
import React from 'react';
import perfora from '../../assets/brandSection/perfora.png';
import ss from '../../assets/brandSection/ss.png';
import caret from '../../assets/brandSection/caret.png';
import './style.scss';

const BrandSection = () =>{
    return(
        <div className="brand_section">
                <div className='brand_logo'>
                    <img src={perfora} alt="pefora"/>
                </div>
                <div className='brand_text'>
                    <div className='brand_main'>
                        <img src={ss} alt="ss"/>
                        <span>Test Brand</span>
                        </div>
                        <div className="caret">
                            <img src={caret} alt=""/>
                        </div>
                </div>
        </div>
    )
}

export default BrandSection;