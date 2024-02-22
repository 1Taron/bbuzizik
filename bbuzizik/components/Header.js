import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../css/header.module.css'

export default function Header() {
    const [searchTerm, setSearchTerm] = useState(''); //검색 입력력

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    // 검색 관련 코드
    const handleSubmit = event => {
        event.preventDefault();

    };

    const [activeTab, setActiveTab] = useState('로그인'); // 현재 탭

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 상태

    const [Login, setLogin] = useState(''); //로그인 입력

    const LoginChange = event => {
        setLogin(event.target.value);
    };

    const [PW, setPW] = useState('');

    const PWChange = event => {
        setPW(event.target.value);
    }

    const LoginSubmit = event => {
        event.preventDefault();

    };

    const ResSubmit = event => {
        event.preventDefault();

    }


    return (
        <header className={styles.header}>
            <h1 className={styles.logo_bar}>
                <Link href="/" className={styles.Link_a}>
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
                            <>
                                <form onSubmit={LoginSubmit}>
                                    <div className={styles.Login_container}>
                                        <div className={styles.Login_text}>
                                            이메일 또는 사용자명
                                        </div>
                                        <input className={styles.Login_input} type="text" value={Login} onChange={LoginChange}></input>
                                    </div>
                                    <div className={styles.PW_container}>
                                        <div className={styles.PW_text}>
                                            비밀번호
                                        </div>
                                        <input className={styles.PW_input} type="text" value={PW} onChange={PWChange} ></input>
                                    </div>
                                </form>
                                <Link href="/" className={styles.Search_PW}>비밀번호를 잊어버리셨나요?</Link>
                                <button className={styles.Button} type="submit">로그인</button>
                                <div className={styles.Bar}></div>
                                <div className={styles.Bar_}>또는</div>
                                <button className={styles.Button_google} type="button">Google로 로그인</button>
                                <button className={styles.Button_naver} type="button">Naver로 로그인</button>
                            </>

                        ) : (
                            <>
                                <form onSubmit={ResSubmit}>

                                </form>
                            </>
                        )}
                    </div>
                </>

            )}
        </header>
    );
};