import React from 'react';
import styles from '../css/category.module.css';

export default function Category() {

    const Category_commend = [
        { img: "/image/category/category_poster_talk.png", name: "talk", total_viewers: 1000, total_live: "544" },
        { img: "/image/category/category_league_of_legends.jpg", name: "리그 오브 레전드", total_viewers: 2000, total_live: "1299" },
        { img: "/image/category/category_escape_from_tarkov.jpg", name: "타르코프", total_viewers: 3000, total_live: "500" },
        { img: "/image/category/category_apex_legends.jpg", name: "에이펙스 레전드", total_viewers: 1000, total_live: "1290" },
        { img: "/image/category/category_lostark.jpg", name: "로스트아크", total_viewers: 2000, total_live: "9999" },
        { img: "/image/category/category_maplestory.jpg", name: "메이플스토리", total_viewers: 3000, total_live: "50000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치2", total_viewers: 2000, total_live: "1000" },
    ];

    return (
        <>
            <div className={styles.Category_container}>
                <div className={styles.Category_container_112}>
                    <h2 className={styles.h2}>카테고리</h2>
                </div>
            </div>
        </>
    )
}