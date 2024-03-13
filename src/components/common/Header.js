import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
            
function Header({ metaData, openModal, addedProductList }) {    

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeModalAndToggleMenu = (modalType) => {
        openModal(modalType);
        setIsMenuOpen(false); 
    };

    return (
        <>
            <header className="header con_center">
                <h1 className="logo">
                    <a href="/">
                        <img src={logo} alt={`${metaData.title} LOGO`} />
                    </a>
                </h1>
                <div className="util">
                    <div className="cart_wrap">
                        <button className="cart" onClick={() => closeModalAndToggleMenu('cart')}></button>
                        {addedProductList.cartList.length > 0 && 
                            <span className="count">{addedProductList.cartList.length}</span>
                        }
                    </div>
                    <button className="fav" onClick={() => closeModalAndToggleMenu('favorite')}></button>
                </div>
                <button className={`mobile_menu ${isMenuOpen ? 'on' : ''}`} onClick={toggleMenu}></button>
            </header>
            <div className={`mobile_navigator ${isMenuOpen ? 'on' : ''}`}>
                <ul>
                    <li onClick={() => closeModalAndToggleMenu('cart')}>
                        장바구니
                        <span></span>
                    </li>
                    <li onClick={() => closeModalAndToggleMenu('favorite')}>
                        찜목록
                        <span></span>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Header;