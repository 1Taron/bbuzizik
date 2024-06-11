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
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../api/firebase/firebasedb';

export default function Home() {
    // 방송 제목
    const [TitleText, setTitleText] = useState('');
    const title_handleChange = e => {
        setTitleText(e.target.value);
    };
    const title_handleClick = () => {
        console.log(TitleText);
    };

    // 카테고리
    const [categoryText, setCategoryText] = useState('');
    const [categories, setCategories] = useState([]);

    const category_handleChange = e => {
        setCategoryText(e.target.value);
    };

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
            console.log(currentUser);
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
                    console.log('No matching documents.');
                }
            } catch (error) {
                console.error('Error fetching user document:', error);
            }
        };

        if (user && user.uid && db) {
            fetchUserNickname();
        }
    }, [user, db]);




    // 일단 처음 스트림키 지정
    const [streamKey, setStreamKey] = useState('');


    const [showKey, setShowKey] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(streamKey);
    };
    const reissue = () => {
        // const newStreamKey = Math.random().toString(36).substring(2, 15);
        const newStreamKey = crypto.randomBytes(16).toString('hex');
        setStreamKey(newStreamKey);
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
        console.log(chatRoleText);
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




    return (
        <>
            <div className={styles.studio_test} style={{ paddingTop: '60px' }}>
                {/* 헤더 */}
                <div className={styles.studio_header} style={{ top: '0px' }}>
                    <a className={`logo_font ${styles.studio_header_maintitle}`} href="/">
                        BBUZIZIK
                    </a>
                    <p className={`logo_font ${styles.studio_header_subtitle}`}>STUDIO</p>
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
                            <input
                                type="button"
                                className={styles.studio_main_setting_broadcastTitle_btn}
                                onClick={title_handleClick}
                                value="저장"
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
                            <BroadcastProperty />
                            <ChatPermission />
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
                            <div className={styles.studio_main_setting_streamKey_reissuance} onClick={reissue}>
                                재발급
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
                            <input
                                type="button"
                                className={styles.studio_main_chatRole_btn}
                                onClick={chatRole_handleClick}
                                value="저장"
                            />
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
                        {/* 채팅 말풍선 */}
                        <span className={styles.studio_chat_chatting}>
                            <span style={{ display: 'inline-block' }}>
                                {/* 뱃지 */}
                                <span className={styles.studio_chat_badge} />
                                {/* 유저 이름 */}
                                <span className={`default_font ${styles.studio_chat_username}`}>
                                    이름일이삼사오육칠팔구십
                                </span>
                            </span>
                            {/* 채팅 내용 */}
                            <span className={`default_font ${styles.studio_chat_userchat}`}>테스트 채팅 입니다.</span>
                        </span>

                        {/* 채팅 말풍선 2*/}
                        <span className={styles.studio_chat_chatting}>
                            <span style={{ display: 'inline-block' }}>
                                {/* 뱃지 */}
                                <span className={styles.studio_chat_badge} />
                                {/* 유저 이름 */}
                                <span className={`default_font ${styles.studio_chat_username}`}>
                                    이름일이삼사오육칠팔구십
                                </span>
                            </span>
                            {/* 채팅 내용 */}
                            <span className={`default_font ${styles.studio_chat_userchat}`}>
                                이것은 테스트 채팅 입니다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
