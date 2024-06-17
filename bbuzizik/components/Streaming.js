import React from 'react';
import styles from '../css/streaming.module.css';
import Link from 'next/link';

export default function Streaming({ USER }) {
    const Section_List = [{ name: `${USER.ID}`, category: 'talk', viewers: 1000, title: '반갑꼬리' }];

    return (
        <>
            <div className={styles.Section_container}>
                <div className={styles.Section}>
                    <h2 className={styles.h2}>추천</h2>
                    <Link
                        href={{
                            pathname: '/',
                        }}
                    >
                        <p className={styles.all_category}>전체보기</p>
                    </Link>
                </div>
                <ul className={styles.Section_List}>
                    {Section_List.map((item, index) => (
                        <li key={index} className={styles.Section_Item}>
                            <div className={styles.Video_card_container}>
                                <Link
                                    className={styles.Video_card}
                                    href={{
                                        pathname: `/live/${USER.newStreamKey}`,
                                    }}
                                >
                                    <img src="/images/thumnail.jpeg" alt="thumnail" className={styles.Img} />
                                </Link>
                                <div className={styles.video_card_wrapper}>
                                    <div className={styles.video_card_img}>
                                        <img
                                            className={styles.video_card_title}
                                            src="/images/profile_img.svg"
                                            alt="video_card_img"
                                        />
                                    </div>
                                    <div className={styles.video_card_title_container}>
                                        <Link
                                            className={styles.video_card_title_link}
                                            href={{
                                                pathname: `/live/${USER.newStreamKey}`,
                                            }}
                                        >
                                            {item.title}
                                        </Link>
                                        <div className={styles.video_card_name}>
                                            <Link
                                                href={{
                                                    pathname: '/',
                                                }}
                                            >
                                                <div className={styles.video_card_name1}>{item.name}</div>
                                            </Link>
                                        </div>
                                        <div className={styles.video_card_tag}>
                                            <Link
                                                href={{
                                                    pathname: '/',
                                                }}
                                            >
                                                <span className={styles.video_card_tag1}>{item.category}</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
