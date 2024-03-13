import React from 'react';

function Confirm({ onClose, content, onShowProductList }) {
    return (
        <div className="modal_dimmed">
            <div className="modal sm">
                <div className="modal_header">
                    <span className="title">
                        {content === 'cart' ? '장바구니 추가' : '찜리스트 추가'}
                    </span>
                </div>
                <p className="modal_content">
                    {content === 'cart' ? '장바구니에 정상적으로 추가되었습니다.' : '찜리스트에 정상적으로 추가되었습니다.'}
                </p>
                <div className="modal_footer">
                    <div className="btn_wrap">
                        {content === 'cart' ? (
                            <button className="btn_white" onClick={() => {onShowProductList('cart'); onClose();}}>장바구니 더보기</button>
                        ) : (
                            <button className="btn_white" onClick={() => {onShowProductList('favorite'); onClose();}}>찜리스트 더보기</button>
                        )}
                        <button className="btn_green" onClick={onClose}>쇼핑 더 하기</button>
                    </div>
                </div>
                <button className="btn_close" aria-label="닫기" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default Confirm;
