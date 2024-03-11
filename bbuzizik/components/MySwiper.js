import React, { useState, useEffect } from 'react';
import styles from '../css/swiper.module.css';

export default function MySwiper() {
    // 총 슬라이드 수를 5개로 확장
    const slides = Array.from({ length: 7 }, (_, i) => i);
    const [visibleSlides, setVisibleSlides] = useState([]);

    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const updateVisibleSlides = () => {
            // 중앙 슬라이드를 기준으로 양옆 슬라이드를 계산하여 배열 업데이트
            setVisibleSlides([
                slides[(slideIndex + 5) % slides.length], // 왼쪽에서 첫 번째
                slides[(slideIndex + 6) % slides.length], // 왼쪽에서 첫 번째
                slides[slideIndex], // 중앙, 여기를 수정했습니다.
                slides[(slideIndex + 1) % slides.length], // 오른쪽에서 첫 번째
                slides[(slideIndex + 2) % slides.length], // 오른쪽에서 두 번째
            ]);
        };

        updateVisibleSlides();
    }, [slideIndex, slides]);

    const prevSlide = () => {
        setSlideIndex(slideIndex === 0 ? slides.length - 1 : slideIndex - 1);
    };

    const nextSlide = () => {
        setSlideIndex(slideIndex === slides.length - 1 ? 0 : slideIndex + 1);
    };

    const computeStyle = (index) => {
        const centerIndex = Math.floor(visibleSlides.length / 2);
        const offset = Math.abs(index - centerIndex);
        const zIndex = visibleSlides.length - offset;

        let opacity = 1 - offset * 0.3; // 중앙 슬라이드를 더 돋보이게 하고, 양옆 슬라이드는 점점 흐리게
        if (opacity < 0) opacity = 0; // opacity가 음수가 되지 않도록 조정

        const slideGap = 15;

        return {
            display: 'block',
            zIndex: `${zIndex}`,
            position: 'absolute',
            left: `${50 + (index - centerIndex) * slideGap}%`,
            transform: `translateX(-50%) scale(${1 - offset * 0.2})`,
            opacity: opacity,
        };
    };

    return (
        <div className={styles.slider}>
            <button className={styles.left_right_button} onClick={prevSlide}>◀</button>
            {visibleSlides.map((slide, index) => (
                <div
                    key={slide}
                    className={styles.slide}
                    style={computeStyle(index)}
                >
                    <h2>채널 {slide + 1}</h2>
                    <p>게임 {slide + 1}</p>
                    <span>시청자수 {slide + 1}</span>
                </div>
            ))}
            <button className={styles.left_right_button} onClick={nextSlide}>▶</button>
        </div>
    );
}
