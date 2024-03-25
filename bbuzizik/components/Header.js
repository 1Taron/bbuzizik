import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from '../css/header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

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

    const [PW, setPW] = useState(''); //비밀번호 입력

    const [Email, setEmail] = useState(''); //이메일 입력

    const [ID, setID] = useState(''); //아이디 입력

    const [PW1, setPW1] = useState(''); //가입 비밀번호 입력

    const [PW2, setPW2] = useState(''); //비밀번호 확인 입력

    const PW2Change = event => {
        setPW2(event.target.value);
    };

    const PW1Change = event => {
        setPW1(event.target.value);
    };

    const IDChange = event => {
        setID(event.target.value);
    };

    const LoginChange = event => {
        setLogin(event.target.value);
    };

    const PWChange = event => {
        setPW(event.target.value);
    };

    const EmailChange = event => {
        setEmail(event.target.value);
    };

    const LoginSubmit = event => {
        event.preventDefault();
    };

    const ResSubmit = event => {
        event.preventDefault();
    };

    //생년월일 select
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [day, setDay] = useState(now.getDate());
    const [daysInMonth, setDaysInMonth] = useState(31);

    useEffect(() => {
        if (month === 2) {
            setDaysInMonth(28);
        } else if ([4, 6, 9, 11].includes(month)) {
            setDaysInMonth(30);
        } else {
            setDaysInMonth(31);
        }
    }, [month]);

    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: 101 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => 1 + i);
    const days = Array.from({ length: daysInMonth }, (_, i) => 1 + i);

    return (
        <header className={styles.header}>
            <h1 className={styles.logo_bar}>
                <Link href="/" className={styles.Link_a}>
                    {/* <img src="/image/Logo11.svg" alt="Logo" /> */}
                    <p
                        className={`logo_font ${styles.modal_logotitle}`}
                        style={{ color: '#a4a6aa', fontSize: '30px', letterSpacing: '2px' }}
                    >
                        BBUZIZIK
                    </p>
                </Link>
            </h1>
            <div className={styles.center_bar}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.searchform}>
                        <input
                            className={styles.input}
                            type="text"
                            value={searchTerm}
                            onChange={handleChange}
                            placeholder="스티리머, 게임 영상 검색"
                        />
                        <button className={styles.button} type="submit">
                            <img src="/image/serch_icon.svg" alt="serch_icon"></img>
                        </button>
                    </div>
                </form>
            </div>
            <div className={styles.right_bar}>
                <a className={styles.button_studio} href="/Studio/home">
                    <FontAwesomeIcon icon={faVideo} />
                </a>
                <div>
                    <button className={styles.button_login} onClick={() => setIsModalOpen(true)}>
                        로그인
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <>
                    <div className={styles.overlay}></div>
                    <div className={styles.modal}>
                        <div className={styles.modal_logo_container}>
                            <p className={`logo_font ${styles.modal_logotitle}`}>BBUZIZIK</p>
                        </div>
                        <div className={styles.modal_login_container}>
                            <button className={styles.login_button} onClick={() => setActiveTab('로그인')}>
                                로그인
                            </button>
                            <button className={styles.res_button} onClick={() => setActiveTab('가입')}>
                                가입
                            </button>
                        </div>
                        <div className={styles.modal_button_container}>
                            <button className={styles.modal_button} onClick={() => setIsModalOpen(false)}>
                                <img src="/image/close_button.svg" alt="닫기" />
                            </button>
                        </div>
                        {activeTab === '로그인' ? (
                            <>
                                <form onSubmit={LoginSubmit}>
                                    <div className={styles.Login_container}>
                                        <div className={styles.Login_text}>이메일 또는 사용자명</div>
                                        <input
                                            className={styles.Login_input}
                                            type="text"
                                            value={Login}
                                            onChange={LoginChange}
                                        ></input>
                                    </div>
                                    <div className={styles.PW_container}>
                                        <div className={styles.PW_text}>비밀번호</div>
                                        <input
                                            className={styles.PW_input}
                                            type="text"
                                            value={PW}
                                            onChange={PWChange}
                                        ></input>
                                    </div>
                                </form>
                                <Link href="/" className={styles.Search_PW}>
                                    비밀번호를 잊어버리셨나요?
                                </Link>
                                <button className={styles.Button} type="submit">
                                    로그인
                                </button>
                                <div className={styles.Bar}></div>
                                <div className={styles.Bar_}>또는</div>
                                <button className={styles.Button_google} type="button">
                                    Google로 로그인
                                </button>
                                <button className={styles.Button_naver} type="button">
                                    Naver로 로그인
                                </button>
                            </>
                        ) : (
                            <>
                                <form onSubmit={ResSubmit}>
                                    <div className={styles.Res_container}>
                                        <div className={styles.Email_text}>이메일</div>
                                        <input
                                            className={styles.Email_input}
                                            type="text"
                                            value={Email}
                                            onChange={EmailChange}
                                        ></input>
                                        <div className={styles.Email_text}>아이디</div>
                                        <input
                                            className={styles.Email_input}
                                            type="text"
                                            value={ID}
                                            onChange={IDChange}
                                        ></input>
                                        <div className={styles.Email_text}>비밀번호</div>
                                        <input
                                            className={styles.Email_input}
                                            type="text"
                                            value={PW1}
                                            onChange={PW1Change}
                                        ></input>
                                        <div className={styles.Email_text}>비밀번호 확인</div>
                                        <input
                                            className={styles.Email_input}
                                            type="text"
                                            value={PW2}
                                            onChange={PW2Change}
                                        ></input>
                                        <div className={styles.Email_text}>생년월일</div>
                                    </div>

                                    <div className={styles.Birth_container}>
                                        <select
                                            className={styles.Year}
                                            value={year}
                                            onChange={e => setYear(e.target.value)}
                                        >
                                            {years.map(year => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            className={styles.Month}
                                            value={month}
                                            onChange={e => setMonth(parseInt(e.target.value))}
                                        >
                                            {months.map(month => (
                                                <option key={month} value={month}>
                                                    {month}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            className={styles.date}
                                            value={day}
                                            onChange={e => setDay(parseInt(e.target.value))}
                                        >
                                            {days.map(day => (
                                                <option key={day} value={day}>
                                                    {day}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button className={styles.Button3} type="submit">
                                        완료
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </>
            )}
        </header>
    );
}
