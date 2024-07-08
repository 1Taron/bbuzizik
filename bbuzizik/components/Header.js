import Link from 'next/link';
import React, { useState, useEffect, useTransition } from 'react';
import styles from '../css/header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../src/pages/api/firebase/firebasedb';
import {
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import Dropdown from '../components/DropDown';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import crypto from 'crypto';
import e from 'cors';
import { style } from '@mui/system';

const Header = () => {
    const [activeTab, setActiveTab] = useState('로그인'); // 현재 탭

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 상태

    const [Login, setLogin] = useState(''); //로그인 입력

    const [PW, setPW] = useState(''); //비밀번호 입력

    const [Email, setEmail] = useState(''); //이메일 입력

    const [ID, setID] = useState(''); //아이디 입력

    const [PW1, setPW1] = useState(''); //가입 비밀번호 입력

    const [PW2, setPW2] = useState(''); //비밀번호 확인 입력

    const [PW3, setPW3] = useState(''); // Firestore에 저장될 비밀번호

    const [error, setError] = useState(''); // 에러 메시지 상태

    const [isPending, startTransition] = useTransition();

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

    // 회원가입 기능 및 firestore에 사용자 정보 저장
    const onClickUpLoadButton = async event => {
        event.preventDefault();
        if (PW1 !== PW2) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        } else {
            setError(''); // 오류 메시지 초기화
            setPW3(PW1); // PW3를 PW1로 설정
        }

        const birthDate = new Date(year, month - 1, day);

        const newStreamKey = crypto.randomBytes(16).toString('hex');

        startTransition(async () => {
            try {
                // Firebase Authentication을 사용하여 사용자 회원가입
                const userCredential = await createUserWithEmailAndPassword(auth, Email, PW3);

                // Firestore에 저장할 사용자의 추가 정보
                await addDoc(collection(db, 'User'), {
                    UID: userCredential.user.uid, // 생성된 사용자 UID
                    Email,
                    ID,
                    PW: PW3,
                    BirthDate: birthDate,
                    newStreamKey,
                });
                console.log('회원가입 성공');
                window.location.reload();
            } catch (error) {
                console.error('회원가입 실패: ', error);
                setError(error.message); // 오류 메시지 설정
            }
        });
    };

    // 로그인 기능
    const onClickLoginButton = async () => {
        try {
            // 이메일과 비밀번호로 로그인 시도
            const userCredential = await signInWithEmailAndPassword(auth, Login, PW);
            window.location.reload();
            // 로그인 성공
            console.log('로그인 성공:');
        } catch (error) {
            console.error('로그인 실패:', error);
            setError(error.message); // 로그인 실패 시 오류 메시지 설정
        }
    };

    useEffect(() => {
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                // 인증 상태 변화 리스너 등록
                const unsubscribe = onAuthStateChanged(auth, currentUser => {
                    setUser(currentUser);
                });
                // 컴포넌트 언마운트 시 리스너 해제
                return () => unsubscribe();
            })
            .catch(error => {
                console.error('Firebase 인증 설정 오류:', error);
            });
    }, []);

    //토큰이 있나 없나 확인
    const [user, setUser] = useState('');

    const [showDiv, setShowDiv] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleInputFocus = () => {
        setIsFocused(true);
        setShowDiv(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
        setShowDiv(false);
    };

    //검색기록 로컬 저장
    const [query, setQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        // 페이지 로드 시 로컬 스토리지에서 검색 기록 가져오기
        const storedHistory = localStorage.getItem('searchHistory');
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    }, []);

    const handleChange = e => {
        e.preventDefault();
        if (query.trim() !== '') {
            // 새로운 검색어 추가
            const updatedHistory = [...searchHistory, query];
            setSearchHistory(updatedHistory);

            // 로컬 스토리지에 검색 기록 저장
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

            // 검색어 초기화
            setQuery('');
        }
    };

    //검색 기록 전체 삭제
    const handleDeleteAll = () => {
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    };

    //검색어 삭제
    const handleDelete = index => {
        const updatedHistory = [...searchHistory];
        updatedHistory.splice(index, 1);
        setSearchHistory(updatedHistory);

        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.logo_bar}>
                <Link href="/" className={styles.Link_a}>
                    {/* <img src="/image/Logo11.svg" alt="Logo" /> */}
                    <p className={`logo_font2 ${styles.modal_logotitle}`}>뿌지직</p>
                </Link>
            </h1>
            <div className={styles.center_bar}>
                <form onSubmit={handleChange}>
                    <div className={styles.searchform}>
                        <input
                            className={styles.input}
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="스티리머, 게임 영상 검색"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <button className={styles.button} type="submit">
                            <img src="/images/serch_icon.svg" alt="serch_icon"></img>
                        </button>
                    </div>
                    {showDiv && (
                        <div className={styles.SearchList}>
                            <div className={styles.SearchLisht_Header}>
                                <p className={styles.SearchLisht_Header_log}>최근 검색어</p>
                                <button onClick={handleDeleteAll} className={styles.SearchLisht_Header_button}>
                                    전체 삭제
                                </button>
                            </div>
                            {searchHistory.length > 0 && (
                                <div>
                                    <ul>
                                        {searchHistory.map((term, index) => (
                                            <li key={index}>
                                                {term}
                                                <button onClick={() => handleDelete(index)}>삭제</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className={styles.SearchList_Footer}>
                                <button className={styles.SearchList_Footer_button}>닫기</button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
            <div className={styles.right_bar}>
                {user ? (
                    <a className={styles.button_studio} href="/Studio/home">
                        <FontAwesomeIcon icon={faVideo} />
                    </a>
                ) : (
                    <></>
                )}

                <div>
                    {user ? (
                        <>
                            <Dropdown />
                        </>
                    ) : (
                        <button className={styles.button_login} onClick={() => setIsModalOpen(true)}>
                            로그인
                        </button>
                    )}
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
                                <img src="/images/close_button.svg" alt="닫기" />
                            </button>
                        </div>
                        {activeTab === '로그인' ? (
                            <>
                                <form onSubmit={event => event.preventDefault()}>
                                    <div className={styles.Login_container}>
                                        <div className={styles.Login_text}>이메일</div>
                                        <input
                                            className={styles.Login_input}
                                            type="email"
                                            value={Login}
                                            onChange={LoginChange}
                                        ></input>
                                    </div>
                                    <div className={styles.PW_container}>
                                        <div className={styles.PW_text}>비밀번호</div>
                                        <input
                                            className={styles.PW_input}
                                            type="password"
                                            value={PW}
                                            onChange={PWChange}
                                        ></input>
                                    </div>
                                    <Link href="/" className={styles.Search_PW}>
                                        비밀번호를 잊어버리셨나요?
                                    </Link>
                                    <button className={styles.Button} type="submit" onClick={onClickLoginButton}>
                                        로그인
                                    </button>
                                </form>
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
                                <form onSubmit={onClickUpLoadButton}>
                                    <div className={styles.Res_container}>
                                        <div className={styles.Email_text}>이메일</div>
                                        <input
                                            className={styles.Email_input}
                                            type="email"
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
                                            type="password"
                                            value={PW1}
                                            onChange={PW1Change}
                                        ></input>
                                        <div className={styles.Email_text}>비밀번호 확인</div>
                                        <input
                                            className={styles.Email_input}
                                            type="password"
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
                                    {isPending ? (
                                        <p>Loading....</p>
                                    ) : (
                                        <button className={styles.Button3} type="submit">
                                            완료
                                        </button>
                                    )}
                                </form>
                            </>
                        )}
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
