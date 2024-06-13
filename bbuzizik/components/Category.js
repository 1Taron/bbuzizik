import React from 'react';
import styles from '../css/category.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../src/pages/api/firebase/firebasedb';
import { collection, getDocs } from 'firebase/firestore';

export default function Category({ isExpanded }) {
    //firestore에서 img 및 name 가져오기
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryRef = collection(db, 'Category');
                const snapshot = await getDocs(categoryRef);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, [db]);

    const formatViewers = viewers => {
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

    function selectRandomCategories(categories, n) {
        const shuffled = [...categories].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }

    useEffect(() => {
        setRandomCategories(selectRandomCategories(categories, 10));
    }, [categories]);

    const adjustDisplayCategories = () => {
        let numberOfCategoriesToShow;
        const width = window.innerWidth;
        if (isExpanded) {
            if (width < 1200) {
                numberOfCategoriesToShow = 4;
            } else if (width < 1350) {
                numberOfCategoriesToShow = 5;
            } else if (width < 1500) {
                numberOfCategoriesToShow = 6;
            } else if (width < 1650) {
                numberOfCategoriesToShow = 7;
            } else if (width < 1800) {
                numberOfCategoriesToShow = 8;
            } else if (width < 1950) {
                numberOfCategoriesToShow = 9;
            } else {
                numberOfCategoriesToShow = 10;
            }
        } else {
            if (width < 1000) {
                numberOfCategoriesToShow = 4;
            } else if (width < 1150) {
                numberOfCategoriesToShow = 5;
            } else if (width < 1300) {
                numberOfCategoriesToShow = 6;
            } else if (width < 1450) {
                numberOfCategoriesToShow = 7;
            } else if (width < 1600) {
                numberOfCategoriesToShow = 8;
            } else if (width < 1750) {
                numberOfCategoriesToShow = 9;
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
                    <Link
                        href={{
                            pathname: '/all_category',
                        }}
                    >
                        <p className={styles.all_category}>전체보기</p>
                    </Link>
                </div>
                <div className={styles.Category_container_112}>
                    {displayCategories.map((category, index) => (
                        <div key={index} className={styles.Category_info}>
                            <div className={styles.category_img}>
                                <img src={category.img} className={styles.category_img} alt={category.name} />
                            </div>
                            <div>
                                <p className={styles.P1}>{category.name}</p>
                                <p className={styles.P}>시청자 {formatViewers(Number(category.total_viewer))}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
