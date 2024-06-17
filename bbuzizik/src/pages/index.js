import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/Header';
import styles from '../../css/main.module.css';
import MySwiper from '../../components/MySwiper';
import Category from '../../components/Category';
import Streaming from '../../components/Streaming';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from './api/firebase/firebasedb';

export default function Home() {
    const [isExpanded, setIsExpanded] = useState(true);

    // 스트리밍 목록

    const [nicknames, setNicknames] = useState([]);
    const [streamKeys, setStreamKeys] = useState([]);

    const [streamingUsers, setStreamingUsers] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'User'));
        const unsubscribe = onSnapshot(
            q,
            snapshot => {
                const allUserDoc = snapshot.docs.map(doc => doc.data());

                console.log('AllUserDoc document data:', allUserDoc);

                setStreamingUsers(allUserDoc);
                // const nicknamesArray = allUserDoc.map(user => user.ID);
                // const streamKeysArray = allUserDoc.map(user => user.newStreamKey);

                // setNicknames(nicknamesArray);
                // setStreamKeys(streamKeysArray);
                // console.log('streamKeys :', streamKeysArray);
            },
            error => {
                console.error('Error fetching chat document:', error);
            }
        );
        return () => unsubscribe();
    }, []);

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
                    {streamingUsers ? (
                        <>
                            {streamingUsers?.map((user, index) => (
                                <div key={index}>
                                    <Streaming USER={user} />
                                </div>
                            ))}{' '}
                        </>
                    ) : (
                        <div style={{ width: '100%', height: '300px' }}>no streamKeys</div>
                    )}
                </div>
            </div>
        </>
    );
}
