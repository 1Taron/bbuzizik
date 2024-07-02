import React from 'react';
import styles from '../css/streaming.module.css';
import Link from 'next/link';

export default function Streaming({ USER }) {
    // USER 객체에 studioInfo가 존재하고, studioInfo 안에 category 배열이 있으면 그 배열을 사용하고, 그렇지 않으면 빈 배열
    const categories = USER.studioInfo?.category || [];
    const roomTitle = USER.studioInfo?.title || '';
    const Section_List = [{ name: `${USER.ID}`, category: categories, viewers: 1000, title: roomTitle }];

    return (
        <>
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
                                    data-tooltip={item.title}
                                >
                                    <p>{item.title}</p>
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
                                    {item.category.map((tag, index) => (
                                        <Link
                                            href={{
                                                pathname: `/category/${tag}`,
                                            }}
                                            key={index}
                                            className={styles.video_card_tag_link}
                                        >
                                            <span className={styles.video_card_tag1}>{tag}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </>
    );
}
