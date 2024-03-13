import Confirm from 'components/modal/Confirm';
import React, { useState } from 'react';

function Products({productList, setAddedProductList, handleOpenProductListModal}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const numberWithDots = function (p_value) {
        p_value = p_value + '';
        p_value = parseInt(p_value.replace(/[^0-9]/gm, ''), 10);
        
        return p_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');   
    };

    const openConfirmModal = (content, item) => {
        setModalContent(content);
        
        setAddedProductList(prevList => {
            // 찜리스트에 상품 추가
            if (content === 'favorite') {
                const isExist = prevList.favoriteList.find(favoriteItem => favoriteItem.id === item.id);
                if (isExist) {
                    return prevList;
                }
                return {
                    ...prevList,
                    favoriteList: [...prevList.favoriteList, item]
                };
            }
    
            // 장바구니에 상품 추가
            if (content === 'cart') {
                const existingItemIndex = prevList.cartList.findIndex(cartItem => cartItem.id === item.id);
                if (existingItemIndex !== -1) {
                    const newCartList = [...prevList.cartList];
                    const existingItem = newCartList[existingItemIndex];
                    const updatedItem = {
                        ...existingItem,
                        count: existingItem.count ? existingItem.count + 1 : 1
                    };
                    newCartList[existingItemIndex] = updatedItem;
                    return {
                        ...prevList,
                        cartList: newCartList
                    };
                } else {
                    return {
                        ...prevList,
                        cartList: [...prevList.cartList, { ...item, count: 1 }]
                    };
                }
            }
    
            return prevList;
        });
    
        setIsModalOpen(true);
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <h4 className="title">PROUDUCT LIST</h4>
            <div className="product_container">
            {productList && (
                productList.map((item, index) => {
                    return (
                        <div className="product_item" key={item.id}>
                            <div className="img_wrap">
                                <img src={item.image} alt={item.label} />
                                <div className="dimmed">
                                    <div className="btn_wrap">
                                        <button className="btn_add add_cart" onClick={() => openConfirmModal('cart', item)}>장바구니</button>
                                        <button className="btn_add add_favorite" onClick={() => openConfirmModal('favorite', item)}>찜리스트</button>
                                    </div>
                                </div>
                            </div>
                            <div className="detail_info">
                                <div className="tit">{item.label}</div>
                                <div className="price">{numberWithDots(item.price)}원</div>
                            </div>
                        </div>
                    );
                })
            )}
            </div>
            {isModalOpen && (
                <Confirm onClose={closeModal} content={modalContent} onShowProductList={handleOpenProductListModal} /> 
            )}
        </>
    );
}

export default Products;