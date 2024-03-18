import React from 'react';
import styles from '../css/category.module.css';

export default function Category() {
    const Category_commend = [
        { img: "/image/category/category_poster_talk.png", name: "talk", total_viewers: 1000, total_live: "544" },
        { img: "/image/category/category_league_of_legends.jpg", name: "리그 오브 레전드", total_viewers: 2000, total_live: "1299" },
        { img: "/image/category/category_escape_from_tarkov.jpg", name: "타르코프", total_viewers: 3000, total_live: "500" },
        { img: "/image/category/category_apex_legends.jpg", name: "에이펙스 레전드", total_viewers: 1000, total_live: "1290" },
        { img: "/image/category/category_lostark.png", name: "로스트아크", total_viewers: 2000, total_live: "9999" },
        { img: "/image/category/category_maplestory.jpg", name: "메이플스토리", total_viewers: 3000, total_live: "50000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치2", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치2", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치2", total_viewers: 2000, total_live: "1000" },
        { img: "/image/category/category_overwatch_2.jpg", name: "오버워치2", total_viewers: 2000, total_live: "1000" },
    ];

    const formatViewers = (viewers) => {
        const numViewers = Number(viewers);
        if (numViewers >= 10000) {
            return `${(numViewers / 10000).toFixed(1)}만명`;
        } else {
            // 1000자리 단위마다 쉼표를 찍어서 반환
            return `${numViewers.toLocaleString()}명`;
        }
    };

    return (
        <>
            <div className={styles.Category_container}>
                <div className={styles.Category}>
                    <h2 className={styles.h2}>카테고리</h2>
                </div>
                <div className={styles.Category_container_112}>
                    {Category_commend.map((item, index) => (
                        <div key={index} className={styles.Category_info}>
                            <img src={item.img} className={styles.category_img} alt={item.name} />
                            <div>
                                <p className={styles.P1}>{item.name}</p>
                                {/* total_live값을 formatViewers 함수를 통해 포맷팅 */}
                                <p className={styles.P}>시청자 {formatViewers(Number(item.total_live))}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}