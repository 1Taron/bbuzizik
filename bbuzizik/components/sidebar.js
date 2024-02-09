import { useState } from 'react';
import styles from '../css/sidebar.module.css'

export default function Sidebar({ isExpanded, onToggle }) {

    return (
        <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <button onClick={onToggle} className={styles.button}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="11" y="13" width="18" height="2" rx="1" fill="#DFE2EA"></rect>
                    <rect x="11" y="19" width="18" height="2" rx="1" fill="#DFE2EA"></rect>
                    <rect x="11" y="25" width="18" height="2" rx="1" fill="#DFE2EA"></rect>
                </svg>
            </button>
            {isExpanded ? (
                /* 펼쳐진 사이드바 내용 */
                <div className={styles.OpenSidebar}>펼쳐진 사이드바 내용</div>
            ) : (
                /* 접혀진 사이드바 내용 */
                <div className={styles.CloseSidebar}>접혀진 사이드바 내용</div>
            )}
        </div>
    );
};

