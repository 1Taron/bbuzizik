import React from 'react';
import styles from '../../css/studio_home.module.css'

export default function Home() {
    return (
        <div className={styles.studio_header}>
            <p className={`logo_font ${styles.studio_header_maintitle}`} >BBUZIZIK</p>
            <p className={`logo_font ${styles.studio_header_subtitle}`} >STUDIO</p>
        </div>
    );
};
//치지직 참고해서 변경 예정