import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/Header';
import styles from '../../css/category_all.module.css';
import { db } from './api/firebase/firebasedb';
import { collection, getDocs } from 'firebase/firestore';

export default function Category_all() {

    const [isExpanded, setIsExpanded] = useState(true);

    //firestore에서 img 및 name 가져오기
    const [categories, setCategories] = useState([]);

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

    return (
        <div className={styles.background}>
            <Sidebar isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
            <Header />
            <div className={styles.Category_container}
                style={{ paddingLeft: isExpanded ? 270 : 96, paddingTop: isExpanded ? 80 : 80 }}>
                <div className={styles.Category_Header}>
                    <strong className={styles.Category_title}>카테고리</strong>
                </div>
                <ul className={styles.Category_list_container}>
                    {categories.map((category) => (
                        <li className={styles.Category_list_item}>
                            <a href="/category/${tag}" className={styles.Category_list_link}>
                                <div className={styles.Category_list_Thumnail}>
                                    <img src={category.img} alt={category.name} />
                                </div>
                                <div className={styles.Category_name}>{category.name}</div>
                                <div className={styles.Category_viewer}>시청자 {formatViewers(Number(category.total_viewer))}</div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
