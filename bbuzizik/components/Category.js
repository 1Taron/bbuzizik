import React from 'react';
import styles from '../css/category.module.css';
import { useState, useEffect } from 'react';

export default function Category({ isExpanded }) {
    const Category_commend = [
        { img: "/image/category/category_poster_talk.png", name: "talk", total_viewers: 1000, total_live: "544" },
        { img: "/image/category/category_league_of_legends.jpg", name: "리그 오브 레전드", total_viewers: 2000, total_live: "1299" },
        { img: "/image/category/category_escape_from_tarkov.jpg", name: "타르코프", total_viewers: 3000, total_live: "500" },
        { img: "/image/category/category_apex_legends.jpg", name: "에이펙스 레전드", total_viewers: 1000, total_live: "1290" },
        { img: "/image/category/category_lostark.png", name: "로스트아크", total_viewers: 2000, total_live: "9999" },
        { img: "/image/category/category_maplestory.jpg", name: "메이플스토리", total_viewers: 3000, total_live: "50000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치21", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치22", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치23", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치24", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치25", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치26", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치27", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치28", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치29", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치20", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치211", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치222", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치233", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치244", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치255", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치266", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치277", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치288", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치299", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치200", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치212", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치213", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치214", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치215", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치216", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치217", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치218", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치219", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치201", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치2123", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치2313", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치2333", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치2444", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치2555", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치2666", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치2777", total_viewers: 2000, total_live: "1000" },
    ];

    function selectRandomCategories(categories, n) {
        const shuffled = [...categories].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }

    const formatViewers = (viewers) => {
        const numViewers = Number(viewers);
        if (numViewers >= 10000) {
            return `${(numViewers / 10000).toFixed(1)}만명`;
        } else {
            // 1000자리 단위마다 쉼표를 찍어서 반환
            return `${numViewers.toLocaleString()}명`;
        }
    };

    const [randomCategories, setRandomCategories] = useState([]);
    const [displayCategories, setDisplayCategories] = useState([]); // displayCategories 상태 추가

    useEffect(() => {
        setRandomCategories(selectRandomCategories(Category_commend, 10));
    }, []);

    const adjustDisplayCategories = () => {
        let numberOfCategoriesToShow;

        const width = window.innerWidth;

        if (isExpanded) {
            if (width < 1400) {
                numberOfCategoriesToShow = 4;
            } else if (width < 1500) {
                numberOfCategoriesToShow = 5;
            } else if (width < 1600) {
                numberOfCategoriesToShow = 6;
            } else if (width < 1700) {
                numberOfCategoriesToShow = 7;
            } else if (width < 1800) {
                numberOfCategoriesToShow = 8;
            } else if (width < 1900) {
                numberOfCategoriesToShow = 9; // 주의: 요청에는 1500일 때 7개로 되어 있으나, 증가하는 순서가 자연스러워지도록 9개로 설정했습니다.
            } else {
                numberOfCategoriesToShow = 10;
            }
        } else {
            if (width < 1200) {
                numberOfCategoriesToShow = 4;
            } else if (width < 1300) {
                numberOfCategoriesToShow = 5;
            } else if (width < 1400) {
                numberOfCategoriesToShow = 6;
            } else if (width < 1500) {
                numberOfCategoriesToShow = 7;
            } else if (width < 1600) {
                numberOfCategoriesToShow = 8;
            } else if (width < 1700) {
                numberOfCategoriesToShow = 9; // 주의: 요청에는 1500일 때 7개로 되어 있으나, 증가하는 순서가 자연스러워지도록 9개로 설정했습니다.
            } else {
                numberOfCategoriesToShow = 10;
            }
        }




        setDisplayCategories(randomCategories.slice(0, numberOfCategoriesToShow));
    };

    useEffect(() => {
        window.addEventListener('resize', adjustDisplayCategories);
        adjustDisplayCategories();

        return () => {
            window.removeEventListener('resize', adjustDisplayCategories);
        };
    }, [randomCategories]); // 의존성 배열에 randomCategories 추가

    return (
        <>
            <div className={styles.Category_container}>
                <div className={styles.Category}>
                    <h2 className={styles.h2}>카테고리</h2>
                </div>
                <div className={styles.Category_container_112}>
                    {displayCategories.map((category, index) => (
                        <div key={index} className={styles.Category_info}>
                            <img src={category.img} className={styles.category_img} alt={category.name} />
                            <div>
                                <p className={styles.P1}>{category.name}</p>
                                <p className={styles.P}>시청자 {formatViewers(Number(category.total_live))}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}