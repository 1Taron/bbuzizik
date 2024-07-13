import React, { useState, useEffect } from 'react';
import styles from '../css/swiper.module.css';
import Player from './Player';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../src/pages/api/firebase/firebasedb';

export default function MySwiper() {
    const API_KEY = process.env.NEXT_PUBLIC_SERVER_IP;

    const [loading, setLoading] = useState(true);
    const [streamingUsers, setStreamingUsers] = useState([]);
    const [streamingStudios, setStreamingStudios] = useState([]);
    const [filteredStreamingUsers, setFilteredStreamingUsers] = useState([]);
    const [slides, setSlides] = useState([]);
    const [visibleSlides, setVisibleSlides] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        // User 데이터
        const q = query(collection(db, 'User'));
        // Studio 데이터
        const qs = query(collection(db, 'Studio'));
        const unsubscribeUsers = onSnapshot(
            q,
            snapshot => {
                const allUserDoc = snapshot.docs.map(doc => doc.data());

                setStreamingUsers(allUserDoc);
            },
            error => {
                console.error('Error fetching chat document:', error);
            }
        );
        const unsubscribeStudios = onSnapshot(
            qs,
            snapshot => {
                const allStudioDoc = snapshot.docs.map(doc => doc.data());

                setStreamingStudios(allStudioDoc);
            },
            error => {
                console.error('Error fetching chat document:', error);
            }
        );

        return () => {
            unsubscribeUsers();
            unsubscribeStudios();
        };
    }, []);

    useEffect(() => {
        if (streamingUsers.length > 0 && streamingStudios.length > 0) {
            setLoading(false);
        }
    }, [streamingUsers, streamingStudios]);

    useEffect(() => {
        if (!loading) {
            const activeStudios = streamingStudios.filter(studio => studio.isOn);
            const combinedData = activeStudios.flatMap(studio => {
                return streamingUsers
                    .filter(user => user.UID === studio.UID)
                    .map(user => ({
                        ...user,
                        studioInfo: studio,
                    }));
            });
            setFilteredStreamingUsers(combinedData);
        }
    }, [streamingUsers, streamingStudios, loading]);

    useEffect(() => {
        const updatedSlides =
            filteredStreamingUsers.length > 5 ? getRandomSlides(filteredStreamingUsers, 5) : filteredStreamingUsers;
        setSlides(updatedSlides);
    }, [filteredStreamingUsers]);

    useEffect(() => {
        if (slides.length > 0) {
            const updateVisibleSlides = () => {
                const newVisibleSlides = [
                    slides[(slideIndex - 2 + slides.length) % slides.length], // 왼쪽에서 두 번째
                    slides[(slideIndex - 1 + slides.length) % slides.length], // 왼쪽에서 첫 번째
                    slides[slideIndex], // 중앙
                    slides[(slideIndex + 1) % slides.length], // 오른쪽에서 첫 번째
                    slides[(slideIndex + 2) % slides.length], // 오른쪽에서 두 번째
                ];
                // 중복된 슬라이드를 제거
                const uniqueVisibleSlides = Array.from(new Set(newVisibleSlides.map(slide => slide?.UID))).map(uid =>
                    newVisibleSlides.find(slide => slide?.UID === uid)
                );
                setVisibleSlides(uniqueVisibleSlides);
            };
            updateVisibleSlides();
        }
    }, [slideIndex, slides]); // slides를 의존성 배열에 추가

    // Streamer 배열에서 최대 5개의 무작위 요소를 선택
    const getRandomSlides = (arr, num) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    const prevSlide = () => {
        setSlideIndex(slideIndex === 0 ? slides.length - 1 : slideIndex - 1);
    };

    const nextSlide = () => {
        setSlideIndex(slideIndex === slides.length - 1 ? 0 : slideIndex + 1);
    };

    const computeStyle = index => {
        const centerIndex = Math.floor(visibleSlides.length / 2);
        const offset = Math.abs(index - centerIndex);
        const zIndex = visibleSlides.length - offset;

        let opacity = 1 - offset * 0.3; // 중앙 슬라이드를 더 돋보이게 하고, 양옆 슬라이드는 점점 흐리게
        if (opacity < 0) opacity = 0; // opacity가 음수가 되지 않도록 조정

        const slideGap = 10;

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
            <button className={styles.left_right_button} onClick={prevSlide}>
                ◀
            </button>
            {visibleSlides.map((slide, index) => {
                const isCenter = index === Math.floor(visibleSlides.length / 2);
                return (
                    <div
                        key={slide?.UID}
                        className={`${styles.slide} ${isCenter ? styles.slide1 : ''}`}
                        style={computeStyle(index)}
                    >
                        {isCenter && (
                            <>
                                <Player
                                    src={`http://${API_KEY}:8080/hls/${slide?.newStreamKey}/index.m3u8`}
                                    type="m3u8"
                                    className={styles.hlsplayer}
                                />
                                <div className={styles.player_info}>
                                    <div>
                                        <p>{slide?.ID}님의 </p>
                                        <p>LIVE</p>
                                    </div>
                                    <p className={styles.player_title}>{slide?.studioInfo?.title}</p>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
            <button className={styles.left_right_button} onClick={nextSlide}>
                ▶
            </button>
            <div className={styles.backgroud}></div>
        </div>
    );
}
