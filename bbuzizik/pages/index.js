import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';
import styles from '../css/main.module.css';

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Sidebar isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
      <Header />
      <div style={{ paddingLeft: isExpanded ? 240 : 66 }}>
        <div className={styles.homecontainer}>
          <h1>메인 페이지</h1>
        </div>
      </div>
    </>
  );
}