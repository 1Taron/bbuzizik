import React, { useState, useEffect } from 'react';
import styles from '../css/swiper.module.css';

export default function MySwiper() {
    const slides = Array(3).fill(0);
    const [slideIndex, setSlideIndex] = useState(0);

    const prevSlide = () => {
        setSlideIndex(slideIndex === 0 ? slides.length - 1 : slideIndex - 1);
    };

    const nextSlide = () => {
        setSlideIndex(slideIndex === slides.length - 1 ? 0 : slideIndex + 1);
    };

    return (
        <div className={styles.slider}>
            <button className={styles.left_right_button} onClick={prevSlide}>◀</button>
            {slides.map((_, index) => (
                <div
                    key={index}
                    className={styles.slide}
                    style={{ display: index === slideIndex ? 'block' : 'none' }}
                >
                    <h2>채널 {index + 1}</h2>
                    <p>게임 {index + 1}</p>
                    <span>시청자수 {index + 1}</span>
                </div>
            ))}
            <button className={styles.left_right_button} onClick={nextSlide}>▶</button>
        </div>
    );
}