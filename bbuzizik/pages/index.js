import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';
import styles from '../css/main.module.css';
import MySwiper from '../components/MySwiper';
import Category from '../components/Category';
import Streaming from '../components/Streaming';

export default function Home() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState('N/A');

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
                    <Streaming />
                </div>
            </div>
        </>
    );
}
