import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../css/studio_home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faEye,
    faEyeSlash,
    faLocationArrow,
    faMagnifyingGlass,
    faPaperPlane,
    faPlus,
    faSearch,
    faX,
} from '@fortawesome/free-solid-svg-icons';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { blue, pink } from '@mui/material/colors';
import J_Checkbox from '../../../components/J_Checkbox';
import ChatPermission from '../../../components/ChatPermission';
import BroadcastProperty from '../../../components/BroadcastProperty';
import crypto from 'crypto';
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../api/firebase/firebasedb';
import { GlobalLayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createContext } from 'react';
import livestyles from '../../../css/main_live.module.css';

export const GlobalContext = createContext();

export default function Home() {
    // 방송 제목
    const [TitleText, setTitleText] = useState('');
    const title_handleChange = e => {
        setTitleText(e.target.value);
    };


    // 카테고리
    const [categories, setCategories] = useState([]);

    const category_handleClick = () => {
        setCategories([...categories, categoryText]);
        setCategoryText('');
    };

    const handleRemoveCategory = index => {
        setCategories(categories.filter((category, i) => i !== index));
    };

    const tagContainer = useRef(null);

    const handleLeftClick = () => {
        tagContainer.current.scrollLeft -= 100; // 100px씩 왼쪽으로 스크롤
    };

    const handleRightClick = () => {
        tagContainer.current.scrollLeft += 100; // 100px씩 오른쪽으로 스크롤
    };

    // 스트림키
    //스트림키 가져오기
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    //토큰이 있나 없나 확인
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchUserNickname = async () => {
            try {
                // 'User' 컬렉션에서 'UID' 필드가 user.uid와 일치하는 문서를 찾는 쿼리 생성
                const q = query(collection(db, 'User'), where('UID', '==', user.uid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // 일치하는 문서가 있는 경우, 첫 번째 문서의 데이터를 가져옴
                    const userDoc = querySnapshot.docs[0];
                    const userData = userDoc.data();
                    setStreamKey(userData.newStreamKey);
                } else {
                }
            } catch (error) {
            }
        };

        if (user && user.uid && db) {
            fetchUserNickname();
        }
    }, [user, db]);

    useEffect(() => {
        const fetchStudioSetting = async () => {
            try {
                // 'User' 컬렉션에서 'UID' 필드가 user.uid와 일치하는 문서를 찾는 쿼리 생성
                const q = query(collection(db, 'Studio'), where('UID', '==', user.uid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // 일치하는 문서가 있는 경우, 첫 번째 문서의 데이터를 가져옴
                    const userDoc = querySnapshot.docs[0];
                    const userData = userDoc.data();
                    setBanTags(userData.banTags);
                    setCategories(userData.category);
                    setTitleText(userData.title);
                    setChatRoleText(userData.chatRole);
                    setGlobalState(userData.ChettingPermission);
                    setbroadcast(userData.broadcastsetting);
                    setbroadcastpw(userData.broadcastpw);
                    setIsOn(userData.isOn);
                } else {
                }
            } catch (error) {
            }
        };

        if (user && user.uid && db) {
            fetchStudioSetting();
        }
    }, [user, db]);

    // 일단 처음 스트림키 지정
    const [streamKey, setStreamKey] = useState('');

    const [showKey, setShowKey] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(streamKey);
    };

    const toggleShowKey = () => {
        setShowKey(!showKey);
    };

    // 채팅 규칙 설정
    const [chatRoleText, setChatRoleText] = useState('');
    const chatRole_handleChange = e => {
        setChatRoleText(e.target.value);
    };
    const chatRole_handleClick = () => {
    };

    // 금칙어 설정
    const [banText, setBanText] = useState('');
    const [banTags, setBanTags] = useState([]);

    const ban_handleChange = e => {
        setBanText(e.target.value);
    };

    const ban_handleAddTag = () => {
        setBanTags([...banTags, banText]);
        setBanText('');
    };

    const ban_handleRemoveTag = index => {
        setBanTags(banTags.filter((banTags, i) => i !== index));
    };

    const onClickUploadOrUpdateButton = async () => {
        try {
            // 현재 사용자의 uid 가져오기
            const user = await auth.currentUser;
            const currentUserUid = user.uid;

            // 현재 사용자의 문서 참조 가져오기
            const q = query(collection(db, 'Studio'), where('UID', '==', user.uid));
            const userDocSnapshot = await getDocs(q);

            if (!userDocSnapshot.empty) {
                // 문서가 존재하면 업데이트
                const userDoc = userDocSnapshot.docs[0];
                await updateDoc(userDoc.ref, {
                    streamKey: streamKey,
                    title: TitleText,
                    category: categories,
                    chatRole: chatRoleText,
                    banTags: banTags,
                    ChettingPermission: globalState,
                    broadcastsetting: broadcast,
                    broadcastpw: broadcastpw,
                    isOn: isOn,
                });

                window.location.reload();
            } else {
                // 문서가 존재하지 않으면 새로 생성
                await addDoc(collection(db, 'Studio'), {
                    UID: currentUserUid,
                    streamKey: streamKey,
                    title: TitleText,
                    category: categories,
                    chatRole: chatRoleText,
                    banTags: banTags,
                    ChettingPermission: globalState,
                    broadcastsetting: broadcast,
                    broadcastpw: broadcastpw,
                    isOn: isOn,
                });
                window.location.reload();
            }
        } catch (error) {
        }
    };

    //chatpermissions state 관리
    const [globalState, setGlobalState] = useState('');
    const [globalState1, setGlobalState1] = useState('');

    //broadcast setting state 관리
    const [broadcast, setbroadcast] = useState('');
    const [broadcastpw, setbroadcastpw] = useState('');

    //chatting 관리
    const messagesEndRef = useRef(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const cq = query(collection(db, 'Chat'), orderBy('Timestamp', 'asc'));
        const unsubscribe = onSnapshot(
            cq,
            snapshot => {
                const chatDoc = snapshot.docs.map(doc => doc.data());
                setChats(chatDoc);
            },
            error => {
            }
        );

        return () => unsubscribe();
    }, []);

    // 채팅 메시지 상태가 변경될 때마다 스크롤을 최하단으로 이동
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    //스위치 관리
    const [isOn, setIsOn] = useState(false);

    const handleClick = () => {
        setIsOn(!isOn);
    };

    // Category 받아오기
    const [category_data, setcategory_data] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryRef = collection(db, 'Category');
                const snapshot = await getDocs(categoryRef);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setcategory_data(data);
            } catch (error) {

            }
        };
        fetchCategories();
    }, [db]);

    //카테고리 text 상태관리
    const [categoryText, setCategoryText] = useState('');

    const category_handleChange = e => {
        setCategoryText(e.target.value);
    };

    //category 검색 기능
    const filteredData = category_data.filter((item) =>
        item.name.toLowerCase().includes(categoryText.toLowerCase())
    );

    const Category_Click = (item) => {
        setCategoryText(item.name);
    };


    return (
        <>
            <div className={styles.studio_test} style={{ paddingTop: '60px' }}>
                {/* 헤더 */}
                <div className={styles.studio_header} style={{ top: '0px' }}>
                    <div className={`logo_font2 ${styles.studio_header_titlelayout}`}>
                        <p className={`logo_font2 ${styles.studio_header_maintitle}`}>
                            <a href="/">뿌지직</a>
                        </p>
                        <p className={`logo_font2 ${styles.studio_header_subtitle}`}>STUDIO</p>
                    </div>
                    <div className={styles.studio_header_btnlayout}>
                        <div className={styles.switchButton_header}>
                            송출 설정
                        </div>
                        <div
                            className={`${styles.switchButton} ${isOn ? styles.active : ''}`}
                            onClick={handleClick}
                        >
                            <div className={`${styles.slider} ${isOn ? styles.active : ''}`}>
                                {isOn ? 'ON' : 'OFF'}
                            </div>
                        </div>
                        <button
                            className={`logo_font ${styles.studio_header_btn1}`}
                            type="submit"
                            onClick={onClickUploadOrUpdateButton}
                        >
                            저장
                        </button>
                        <button className={`logo_font ${styles.studio_header_btn2}`} type="button">
                            <a href="/">취소</a>
                        </button>
                    </div>
                </div>

                {/* 메인 */}
                <div className={styles.studio_main} style={{ top: '60px' }}>
                    {/* 라이브 화면 */}
                    <div className={styles.studio_main_liveWindow}>
                        <div className={styles.studio_main_liveWindowBox} />
                    </div>
                    {/* 설정 */}
                    <div className={styles.studio_main_setting}>
                        {/* 방송제목 */}
                        <div className={styles.studio_main_setting_broadcastTitle}>
                            <p style={{ lineHeight: '50px' }} className={styles.subtitleBox}>
                                방송제목
                            </p>
                            {/* 나중에 설정들 각 타이틀들 일정한 크기로 바꿔서 인풋박스랑 일정하게 거리두기 */}
                            <input
                                type="text"
                                className={styles.studio_main_setting_broadcastTitle_inputbox}
                                value={TitleText}
                                onChange={title_handleChange}
                            />
                        </div>

                        {/* 카테고리 */}
                        <div className={styles.studio_main_setting_broadcastCategory}>
                            <p style={{ lineHeight: '50px' }} className={styles.subtitleBox}>
                                카테고리
                            </p>
                            <div className={styles.studio_main_setting_broadcastCategory_inputbox_wrapper}>
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        left: '10px',
                                        color: 'black',
                                        fontSize: '20px',
                                    }}
                                />
                                <input
                                    type="text"
                                    className={styles.studio_main_setting_broadcastCategory_inputbox}
                                    value={categoryText}
                                    onChange={category_handleChange}
                                    style={{ paddingLeft: '40px' }}
                                />
                                <ul className={`${styles.categoryList} ${categoryText.length > 0 ? '' : styles.categoryListHidden}`}>
                                    {filteredData.map((item) => (
                                        <li onClick={() => Category_Click(item)} className={styles.categoryList_name} key={item.id}>{item.name}</li>
                                    ))}
                                </ul>
                                <input
                                    type="button"
                                    className={styles.studio_main_setting_broadcastCategory_btn}
                                    onClick={category_handleClick}
                                    value="추가"
                                />
                            </div>
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                onClick={handleLeftClick}
                                fontSize={'16px'}
                                style={{ alignSelf: 'center', marginLeft: '15px' }}
                            />
                            <div className={styles.studio_main_setting_broadcastCategory_tags} ref={tagContainer}>
                                {categories.map((category, index) => (
                                    <div key={index} className={styles.studio_main_broadcastCategory_tag}>
                                        <FontAwesomeIcon
                                            icon={faX}
                                            onClick={() => handleRemoveCategory(index)}
                                            cursor={'pointer'}
                                        />
                                        <p>{category}</p>
                                    </div>
                                ))}
                            </div>
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                onClick={handleRightClick}
                                fontSize={'16px'}
                                style={{ alignSelf: 'center', marginLeft: '5px' }}
                            />
                        </div>

                        {/* 방송속성 or 채팅권한 */}
                        <div className={styles.studio_main_setting_broadcastSetting} style={{ height: '100px' }}>
                            <GlobalContext.Provider value={{ broadcast, setbroadcast, broadcastpw, setbroadcastpw }}>
                                <BroadcastProperty />
                            </GlobalContext.Provider>
                            <GlobalContext.Provider value={{ globalState, setGlobalState }}>
                                <ChatPermission globalState1={globalState1} setGlobalState1={setGlobalState1} />
                            </GlobalContext.Provider>
                        </div>

                        <div className={styles.studio_main_setting_streamKey}>
                            <p style={{ lineHeight: '50px' }} className={styles.subtitleBox}>
                                스트림 키
                            </p>

                            <div className={styles.studio_main_setting_streamKey_inputbox}>
                                <p style={{ alignSelf: 'center', fontSize: '16px' }}>
                                    {showKey ? streamKey : '*'.repeat(streamKey.length)}
                                </p>
                                <FontAwesomeIcon
                                    icon={showKey ? faEyeSlash : faEye}
                                    style={{ fontSize: '20px', alignSelf: 'center' }}
                                    onClick={toggleShowKey}
                                />
                            </div>
                            <div className={styles.studio_main_setting_streamKey_copybtn} onClick={copyToClipboard}>
                                복사
                            </div>
                        </div>

                        <div className={styles.studio_main_setting_streamUrl}>
                            <p style={{ lineHeight: '50px' }} className={styles.subtitleBox}>
                                스트림 URL
                            </p>
                            <p
                                style={{
                                    fontSize: '10px',
                                    alignSelf: 'center',
                                }}
                            >
                                rtmp://15.164.59.52/live
                            </p>
                        </div>
                        <div className={styles.studio_main_setting_broadcastInfo} style={{ height: '100px' }}>
                            <p style={{ lineHeight: '40px' }} className={styles.subtitleBox}>
                                방송정보
                            </p>
                            <div className={styles.studio_main_setting_broadcastInfo_text}>
                                <p>상태 : 방송 전</p>
                                <p>방송시간 : -</p>
                                <p>현재 유저 수 : -</p>
                                <p>해상도 : -</p>
                                <p>누적 유저 수 : -</p>
                            </div>
                        </div>
                    </div>

                    {/* 미리보기 이미지 */}
                    <div className={styles.studio_main_previewImg}>
                        <div className={styles.studio_main_previewImg_title}>미리보기 이미지</div>
                        <div className={styles.studio_main_previewImg_box}>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>

                    {/* 채팅 규칙 설정 */}
                    <div className={styles.studio_main_chatRole}>
                        <div className={styles.studio_main_chatRole_title}>채팅 규칙</div>
                        <textarea
                            type="text"
                            className={styles.studio_main_chatRole_box}
                            onChange={chatRole_handleChange}
                            value={chatRoleText}
                            placeholder="채팅 규칙을 입력해 주세요. 예) 1. 좋은 표현을 사용하세요. 2.서로를
              존중해 주세요. 3. 친목 금지입니다."
                        />
                        <div className={styles.studio_main_chatRole_btnlayout}>

                        </div>
                    </div>

                    {/* 금칙어 설정 */}
                    <div className={styles.studio_main_banWord}>
                        <div className={styles.studio_main_banWord_title}>금칙어 설정</div>
                        <div className={styles.studio_main_banWord_layout}>
                            {banTags.map((banTags, index) => (
                                <div key={index} className={styles.studio_main_banWord_tag}>
                                    <FontAwesomeIcon
                                        icon={faX}
                                        onClick={() => ban_handleRemoveTag(index)}
                                        cursor={'pointer'}
                                    />
                                    <p>{banTags}</p>
                                </div>
                            ))}

                            <div className={styles.studio_main_banWord_Search}>
                                <input type="text" value={banText} onChange={ban_handleChange} />
                                <FontAwesomeIcon icon={faLocationArrow} onClick={ban_handleAddTag} fontSize={'16px'} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 채팅 */}
                <div className={styles.studio_chat} style={{ top: '60px' }}>
                    {/* 타이틀-실시간 채팅 */}
                    <div className={styles.studio_chat_title}>
                        <p>실시간 채팅</p>
                    </div>
                    {/* 채팅 뷰 영역 */}
                    <div className={styles.studio_chat_layout}>
                        <div className={styles.studio_chat_viewWrapper}>
                            {user ? (
                                <div className={`default_font ${livestyles.live_chat_loginNotice}`}>
                                    로그인 되었습니다 :
                                </div>
                            ) : (
                                <div className={`default_font ${livestyles.live_chat_loginNotice}`}>
                                    로그인 해주세요.
                                </div>
                            )}
                            {/* 채팅 MAP */}
                            {chats.map((chat, index) => (
                                <span key={index} className={livestyles.live_chat_chatting}>
                                    {/* 채팅 말풍선 */}
                                    <span style={{ display: 'inline-block' }}>
                                        {/* 뱃지 */}
                                        <span className={livestyles.live_chat_badge} />
                                        {/* 유저 이름 */}
                                        <span className={`default_font ${livestyles.live_chat_username}`}>
                                            {chat.NickName}
                                        </span>
                                    </span>
                                    {/* 채팅 내용 */}
                                    <span className={`default_font ${livestyles.live_chat_userchat}`}>
                                        {chat.Message}
                                    </span>
                                </span>
                            ))}
                            <span ref={messagesEndRef} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
