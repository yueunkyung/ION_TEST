import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
            
function Header({ metaData, openModal, addedProductList }) {    

    // 메뉴 상태를 관리하는 state를 추가합니다. 초기값은 false입니다.
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 메뉴 버튼을 클릭했을 때 호출되는 함수입니다.
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // 현재 상태를 반전시킵니다.
    };

    // 메뉴 상태를 닫는 함수입니다.
    const closeModalAndToggleMenu = (modalType) => {
        openModal(modalType);
        setIsMenuOpen(false); // 메뉴 상태를 false로 설정하여 닫습니다.
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