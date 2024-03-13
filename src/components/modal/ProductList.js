import React, { useCallback, useEffect, useState } from 'react';
import Confirm from './Confirm';

function ProductList({ onClose, content, addedProductList, setAddedProductList, handleOpenProductListModal }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [discount, setDiscount] = useState(0); // 할인 금액
    const [shippingFee, setShippingFee] = useState(3000); // 배송비
    const [totalAmount, setTotalAmount] = useState(0); // 결제 예정 금액
    
    const numberWithDots = function (p_value) {
        p_value = p_value + '';
        p_value = parseInt(p_value.replace(/[^0-9]/gm, ''), 10);
        
        return p_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');   
    };

    const initializeCheckedState = useCallback(() => {
        const initialCheckedState = {};
        addedProductList.cartList.forEach(item => {
            initialCheckedState[item.id] = true;
        });
        return initialCheckedState;
    }, [addedProductList.cartList]);

    const [checkedItems, setCheckedItems] = useState(initializeCheckedState);

    const handleDecrease = (id) => {
        const newList = { ...addedProductList };
        if (content === 'cart') {
            newList.cartList = newList.cartList.filter(item => {
                if (item.id === id && item.count === 1) {
                    return false;
                } else if (item.id === id) {
                    item.count -= 1;
                }
                return true;
            });
        }
        setAddedProductList(newList);
    };
    
    const handleIncrease = (id) => {
        const newList = { ...addedProductList };
        if (content === 'cart') {
            newList.cartList = newList.cartList.map(item => {
                if (item.id === id) {
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });
        }
        setAddedProductList(newList);
    };

    const handleFavoriteToggle = (item) => {
        const isFavorited = addedProductList.favoriteList.some(favItem => favItem.id === item.id);
        const newList = { ...addedProductList };
        if (isFavorited) {
            newList.favoriteList = newList.favoriteList.filter(favItem => favItem.id !== item.id);
        } else {
            newList.favoriteList = [...newList.favoriteList, item];
        }
        setAddedProductList(newList);
    };

    const handleAddToCart = (item) => {
        const newList = { ...addedProductList };
        const existingItemIndex = newList.cartList.findIndex(cartItem => cartItem.id === item.id);
    
        if (existingItemIndex >= 0) {
            newList.cartList[existingItemIndex] = {
                ...newList.cartList[existingItemIndex],
                count: newList.cartList[existingItemIndex].count + 1
            };
        } else {
            newList.cartList = [...newList.cartList, { ...item, count: 1 }];
        }
    
        setShowConfirm(true);
        setAddedProductList(newList);
    };

    const handleClose = () => {
        setShowConfirm(false);
    };

    const handleCheckboxChange = (itemId, isChecked, itemPrice, itemCount) => {
        const newCheckedItems = { ...checkedItems, [itemId]: isChecked };
        setCheckedItems(newCheckedItems);
    };
    

    const calculateOrderAmount = () => {
        let total = 0;
        addedProductList.cartList.forEach(item => {
            if (checkedItems[item.id]) {
                total += item.price * item.count;
            }
        });
        return total;
    }

    const orderAmount = calculateOrderAmount();

    useEffect(() => {
        setTotalAmount(orderAmount - discount + shippingFee);
    }, [orderAmount, discount, shippingFee]);

    useEffect(() => {
        setCheckedItems(initializeCheckedState());
    }, [initializeCheckedState]); 
    
    return (
        <>
            <div className="modal_dimmed">
                <div className="modal md">
                    <div className="modal_header">
                        <span className="title">
                            {content === 'cart' ? '장바구니' : '찜목록'}
                        </span>
                    </div>
                    <div className="modal_content">
                        {content === 'cart' ? (
                            addedProductList.cartList.length > 0 ? (
                                addedProductList.cartList.map((item, index) => (
                                    <div className="added_item" key={item.id}>
                                        <div className="checkbox_wrap">
                                        <input type="checkbox" id={`chkItem${item.id}`} checked={!!checkedItems[item.id]} onChange={(e) => handleCheckboxChange(item.id, e.target.checked, item.price, item.count)} />
                                        <label htmlFor={`chkItem${item.id}`}></label>
                                        </div>
                                        <div className="item_detail">
                                        <div className="img_wrap">
                                            <img src={item.image} alt={item.label} />
                                        </div>
                                        <div className="info">
                                            <div className="tit">{item.label}</div>
                                            <div className="price">{numberWithDots(item.price * item.count)}원</div>
                                            <div className="counter">
                                            <button className="decrease" onClick={() => handleDecrease(item.id)}></button>
                                            <span>{item.count}</span>
                                            <button className="increase" onClick={() => handleIncrease(item.id)}></button>
                                            </div>
                                        </div>
                                        <button className={`heart ${addedProductList.favoriteList.some(favItem => favItem.id === item.id) ? 'on' : ''}`} onClick={() => handleFavoriteToggle(item)}></button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty">장바구니가 비었습니다.</div>
                            )
                        ) : (
                            addedProductList.favoriteList.length > 0 ? (
                                addedProductList.favoriteList.map((item, index) => (
                                    <div className="added_item" key={item.id}>
                                        <div className="item_detail">
                                            <div className="img_wrap">
                                                <img src={item.image} alt={item.label} />
                                            </div>
                                            <div className="info">
                                                <div className="tit">{item.label}</div>
                                                <div className="price">{numberWithDots(item.price)}원</div>
                                                <div className="btn_wrap">
                                                    <button onClick={() => handleAddToCart(item)}>장바구니 추가</button>
                                                </div>
                                            </div>
                                            <button className={`heart ${addedProductList.favoriteList.some(favItem => favItem.id === item.id) ? 'on' : ''}`} onClick={() => handleFavoriteToggle(item)}></button>
                                        </div>
                                    </div>
                                ))
                            ):(
                                <div className="empty">찜목록이 비었습니다.</div>
                            )
                        )}
                    </div>
                    {content === 'cart' ? (
                    <div className="modal_footer">
                        <div className="payment payment_list">
                            <span className="tit">결제 예정금액</span>
                            <div className="payment_item">
                                <span>주문금액</span>
                                <span>{numberWithDots(orderAmount)}원</span>
                            </div>
                            <div className="payment_item">
                                <span>할인</span>
                                <span>{numberWithDots(discount)}원</span>
                            </div>
                            <div className="payment_item">
                                <span>배송비</span>
                                <span>{numberWithDots(shippingFee)}원</span>
                            </div>
                        </div>
                        <div className="payment payment_amount">
                            <span>결제 예정금액</span>
                                <span>{numberWithDots(totalAmount)}원</span>
                        </div>
                        <div className="btn_wrap">
                            <button className="btn_white" onClick={onClose}>닫기</button>
                            <button className="btn_green" onClick={onClose}>결제하기</button>
                        </div>
                    </div>) : ""}
                    <button className="btn_close" aria-label="닫기" onClick={onClose}></button>
                </div>
            </div>
            {showConfirm && <Confirm onClose={handleClose} content="cart" onShowProductList={handleOpenProductListModal} />}
        </>
    );
}

export default ProductList;