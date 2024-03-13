import React, { useCallback, useEffect, useState } from 'react';

function Banner({slideList}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const goToNext = useCallback(() => {
        const nextIndex = (currentIndex + 1) % slideList.length;
        setCurrentIndex(nextIndex);
    }, [currentIndex, slideList.length]);

    const goToPrev = useCallback(() => {
        const prevIndex = (currentIndex - 1 + slideList.length) % slideList.length;
        setCurrentIndex(prevIndex);
    }, [currentIndex, slideList.length]);

    useEffect(() => {
        const interval = setInterval(goToNext, 4000); 
        return () => clearInterval(interval);
    }, [goToNext]);

    return (
        <section className="banner_slider">
            <button onClick={goToPrev} className="arrow prev"></button>
            <div className="banner_wrap" >
                <img src={slideList[currentIndex].image} alt={slideList[currentIndex].title} />
                <div className="banner">
                    <div className="banner_info con_center">
                        <div className="tit">{slideList[currentIndex].title}</div>
                        <p className="content">{slideList[currentIndex].content}</p>
                        <button className="btn_more" onClick={() => window.open(slideList[currentIndex].url, '_blank', 'noopener,noreferrer')}>
                            {slideList[currentIndex].buttonLabel}
                        </button>
                    </div>
                </div>
            </div>
            <button onClick={goToNext} className="arrow next"></button>
            <div className="paging">
                {slideList.map((slide, index) => (
                    <button
                        className={`page ${currentIndex === index ? "current" : ""}`}
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                    >
                        {slide.id}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default Banner;