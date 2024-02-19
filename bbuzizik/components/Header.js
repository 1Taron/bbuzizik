import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../css/header.module.css'

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    // 검색 관련 코드
    const handleSubmit = event => {
        event.preventDefault();

    };

    const [activeTab, setActiveTab] = useState('로그인'); // 현재 탭

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 상태

    return (
        <header className={styles.header}>
            <h1 className={styles.logo_bar}>
                <Link className={styles.Link_a} href="/">
                    <img src="/image/Logo11.svg" alt="Logo" />
                </Link>
            </h1>
            <div className={styles.center_bar}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.searchform}>
                        <input className={styles.input} type="text" value={searchTerm} onChange={handleChange} placeholder="스티리머, 게임 영상 검색" />
                        <button className={styles.button} type="submit">
                            <img src="/image/serch_icon.svg" alt="serch_icon"></img>
                        </button>
                    </div>
                </form>
            </div>
            <div className={styles.right_bar}>
                <div>
                    <button className={styles.button_login} onClick={() => setIsModalOpen(true)}>로그인</button>
                </div>
            </div>
            {isModalOpen && (
                <>
                    <div className={styles.overlay}></div>
                    <div className={styles.modal}>
                        <div className={styles.modal_logo_container}>
                            <img className={styles.modal_logo} src="/image/Logo_2.svg" alt="Logo" />
                        </div>
                        <div className={styles.modal_login_container}>
                            <button className={styles.login_button} onClick={() => setActiveTab('로그인')}>로그인</button>
                            <button className={styles.res_button} onClick={() => setActiveTab('가입')}>가입</button>
                        </div>
                        <div className={styles.modal_button_container}>
                            <button className={styles.modal_button} onClick={() => setIsModalOpen(false)}>
                                <img src="/image/close_button.svg" alt='닫기' />
                            </button>
                        </div>
                        {activeTab === '로그인' ? (
                            <div>
                                <h2>로그인</h2>
                                {/* 로그인 폼... */}
                            </div>
                        ) : (
                            <div>
                                <h2>가입</h2>
                                {/* 가입 폼... */}
                            </div>
                        )}
                    </div>
                </>

            )}
        </header>
    );
};