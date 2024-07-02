import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/Header';
import styles from '../../css/main.module.css';
import MySwiper from '../../components/MySwiper';
import Category from '../../components/Category';
import Streaming from '../../components/Streaming';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from './api/firebase/firebasedb';
import Link from 'next/link';

export default function Home() {
    const [isExpanded, setIsExpanded] = useState(true);

    // 스트리밍 목록
    const [streamingUsers, setStreamingUsers] = useState([]);
    const [streamingStudios, setStreamingStudios] = useState([]);
    const [filteredStreamingUsers, setFilteredStreamingUsers] = useState([]);
    const [inactiveStreamingUsers, setInactiveStreamingUsers] = useState([]);

    useEffect(() => {
        // User 데이터
        const q = query(collection(db, 'User'));
        // Studio 데이터
        const qs = query(collection(db, 'Studio'));
        const unsubscribeUsers = onSnapshot(
            q,
            snapshot => {
                const allUserDoc = snapshot.docs.map(doc => doc.data());

                console.log('AllUserDoc document data:', allUserDoc);

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

                console.log('AllStudioDoc document data:', allStudioDoc);

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
        const activeStudios = streamingStudios.filter(studio => studio.isOn);
        const inactiveStudios = streamingStudios.filter(studio => !studio.isOn);

        const combinedData = activeStudios.flatMap(studio => {
            return streamingUsers
                .filter(user => user.UID === studio.UID)
                .map(user => ({
                    ...user,
                    studioInfo: studio,
                }));
        });
        setFilteredStreamingUsers(combinedData);
        console.log('filteredStreamingUsers :', combinedData);

        const combinedInactiveData = inactiveStudios.flatMap(studio => {
            return streamingUsers
                .filter(user => user.UID === studio.UID)
                .map(user => ({
                    ...user,
                    studioInfo: studio,
                }));
        });
        setInactiveStreamingUsers(combinedInactiveData);
        console.log('inactiveStreamingUsers:', combinedInactiveData);
    }, [streamingUsers, streamingStudios]);
    // user.studioInfo.가져올 데이터

    return (
        <>
            <Sidebar isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
            <Header />
            <div
                className={styles.Contents_container}
                style={{ paddingLeft: isExpanded ? 240 : 66, paddingTop: isExpanded ? 50 : 50 }}
            >
                <div className={styles.homecontainer}>
                    <MySwiper />
                </div>
                <div className={styles.Layout_contents}>
                    <Category isExpanded={isExpanded} />
                </div>
                <div className={styles.Section_contents}>
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
                        {filteredStreamingUsers.length > 0 ? (
                            filteredStreamingUsers.map((user, index) => (
                                <div key={index} className={styles.Section_ListLayout}>
                                    <Streaming USER={user} />
                                </div>
                            ))
                        ) : (
                            <div style={{ width: '100%', height: '300px' }}>no streamKeys</div>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
}
