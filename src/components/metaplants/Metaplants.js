import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import jsonMetaData from '../../variables/meta.json';
import Notice from './Notice';
import Products from './Products';
import { Footer, Header } from 'components/common';
import ProductList from 'components/modal/ProductList';

function Metaplants(props) {
    const [metaData, setMetaData] = useState([]);
    const [addedProductList, setAddedProductList] = useState({
        cartList: [],
        favoriteList: []
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleOpenProductListModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    useEffect(() => {
        setMetaData(jsonMetaData);
    }, []);

    useEffect(() => {
        //console.log("업데이트된 metaData:", metaData);
    }, [metaData]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isModalOpen]);

    return (
        <>
            <Header metaData={metaData} openModal={handleOpenProductListModal} addedProductList={addedProductList} />
            <div className="contents">
                <div className="contents-inner">
                    {metaData && metaData.slideList && <Banner slideList={metaData.slideList}/>}
                    {metaData && metaData.noticeList && <Notice noticeList={metaData.noticeList}/>}
                    <section className="product_section con_center">
                        {metaData && metaData.productList && <Products productList={metaData.productList} setAddedProductList={setAddedProductList} handleOpenProductListModal={handleOpenProductListModal} />}
                    </section>
                </div>
            </div>
            <Footer />
            {isModalOpen && <ProductList onClose={() => setIsModalOpen(false)} content={modalContent} addedProductList={addedProductList} setAddedProductList={setAddedProductList} handleOpenProductListModal={handleOpenProductListModal} />}
        </>
    );
}

export default Metaplants;
