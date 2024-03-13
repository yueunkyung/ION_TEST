import React from 'react';
import logo from '../../assets/images/logo.png';
            
function Header({ metaData, openModal, addedProductList }) {    
    return (
        <header className="header con_center">
            <h1 className="logo">
                <a href="/">
                    <img src={logo} alt={`${metaData.title} LOGO`} />
                </a>
            </h1>
            <div className="util">
                <div className="cart_wrap">
                    <button className="cart" onClick={() => openModal('cart')}></button>
                    <span className="count">{addedProductList.cartList.length}</span>
                </div>
                <button className="fav" onClick={() => openModal('favorite')}></button>
            </div>
        </header>
    );
}

export default Header;