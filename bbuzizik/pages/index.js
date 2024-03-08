import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';
import styles from '../css/main.module.css';
import MySwiper from '../components/MySwiper';

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Sidebar isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
      <Header />
      <div style={{ paddingLeft: isExpanded ? 240 : 66 }}>
        <div className={styles.homecontainer}>
          <MySwiper />
        </div>
      </div>
    </>
  );
}