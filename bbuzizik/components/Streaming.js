import React from "react"
import styles from '../css/streaming.module.css';
import Link from 'next/link';

export default function Streaming() {

    const Section_List = [
        { name: "괴물쥐", category: "talk", viewers: 1000, title: "반갑꼬리" },
    ];

    return (
        <>
            <div className={styles.Section_container}>
                <div className={styles.Section}>
                    <h2 className={styles.h2}>
                        추천
                    </h2 >
                    <Link
                        href={{
                            pathname: '/',
                        }}
                    >
                        <p className={styles.all_category}>전체보기</p>
                    </Link>
                </div>
                <ul className={styles.Section_List}>
                    <li className={styles.Section_Item}>
                        <div className={styles.Video_card_container}>
                            <Link
                                className={styles.Video_card}
                                href={{
                                    pathname: '/'
                                }}
                            >
                                <img src="/image/thumnail.jpeg" alt="thumnail" className={styles.Img} />
                            </Link>
                            <div className={styles.video_card_wrapper}>
                                <div className={styles.video_card_img}>
                                    <img className={styles.video_card_title} src="/image/profile_img.svg" alt="video_card_img" />
                                </div>
                                <Link
                                    className={styles.video_card_title_link}
                                    href={{
                                        pathname: '/'
                                    }}
                                >
                                    반갑습니다.
                                </Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        </>
    );
}