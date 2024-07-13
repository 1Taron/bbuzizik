import React, { useContext, useEffect, useRef, useState } from 'react';
import Sidebar from '../../../components/sidebar';
import Header from '../../../components/Header';
import livestyles from '../../../css/main_live.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import {
    faBell,
    faCommentDots,
    faCommentSlash,
    faEllipsis,
    faHeart,
    faPaperPlane,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import Player from '../../../components/Player';
import { auth, db } from '../api/firebase/firebasedb';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';

let socket;
let foundStreamerData = null;
let foundStudioData = null;

export default function Live() {
    const API_KEY = process.env.NEXT_PUBLIC_SERVER_IP;
    const [isExpanded, setIsExpanded] = useState(true);

    // 스트리머 정보
    const router = useRouter();
    const { slug } = router.query;
    const [streamerData, setStreamerData] = useState(null);
    const [filteredStreamingUser, setFilteredStreamingUser] = useState(null);

    useEffect(() => {
        if (slug && slug.length > 0) {
            const streamingKey = slug[0]; // slug 배열에서 streamingKey 추출
            const fetchData = async () => {
                try {
                    const userQuerySnapshot = await getDocs(collection(db, 'User'));
                    const studioQuerySnapshot = await getDocs(collection(db, 'Studio'));

                    userQuerySnapshot.forEach(doc => {
                        if (doc.data().newStreamKey === streamingKey) {
                            foundStreamerData = doc.data();
                        }
                    });

                    studioQuerySnapshot.forEach(doc => {
                        if (doc.data().streamKey === streamingKey) {
                            foundStudioData = doc.data();
                        }
                    });

                    if (foundStreamerData && foundStudioData) {
                        const combinedData = {
                            ...foundStreamerData,
                            studioInfo: foundStudioData,
                        };
                        setFilteredStreamingUser(combinedData);
                        setStreamerData(foundStreamerData);


                        // Streamer data를 가져온 후에 Chat data를 실시간으로 가져옴
                        const cq = query(
                            collection(db, `Chat-${foundStreamerData?.newStreamKey}`),
                            orderBy('Timestamp', 'asc')
                        );
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
                    } else {
                        setStreamerData(null);
                        setFilteredStreamingUser(null);

                    }
                } catch (error) {

                }
            };
            fetchData();
        } else {
            setStreamerData(null); // slug가 없을 때 streamerData를 초기화
            setFilteredStreamingUser(null); // slug가 없을 때 filteredStreamingUsers를 초기화
        }
    }, [slug]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    //토큰이 있나 없나 확인
    const [user, setUser] = useState('');

    const [nickname, setNickname] = useState('');
    const [streamKey, setStreamKey] = useState('');

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
                    setNickname(userData.ID);
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

    const messagesEndRef = useRef(null);

    const [chatText, setChatText] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const chat_handleChange = e => {
        setChatText(e.target.value);
    };

    // --------------------
    // --------------------

    // 채팅 보내기
    const sendChat_handleClick = () => {
        if (chatText.trim() !== '') {
            console.log(
                `sendChat : ${user.uid}, ${nickname}, ${chatText}, ${streamKey}, ${streamerData?.newStreamKey}`
            );

            socket.emit('send_message', {
                uid: user.uid,
                nickName: nickname,
                chatText: chatText,
                streamKey: streamKey,
                streamerKey: streamerData?.newStreamKey,
            });
            setChatText('');
        }
    };

    const chat_handleKeyDown = event => {
        if (event.key === 'Enter') {
            sendChat_handleClick();
        }
    };

    useEffect(() => {
        socketInitializer();
    }, []);

    async function socketInitializer() {
        await fetch('../api/socket');

        socket = io();

        await new Promise(resolve => socket.on('connect', resolve)); // socket 객체가 준비될 때까지 기다림

        // 기존에 등록된 'receive_message' 이벤트 핸들러가 있는지 확인하고, 없으면 새로 등록
        if (!socket.hasListeners('receive_message')) {
            socket.on('receive_message', () => {
                // console.log(data);
                console.log('receive_message');
            });
        }
    }

    // 정보란 버튼
    const infoFollow_handleClick = () => {
        console.log('infoFollow_handleClick');
    };
    const infoSubscribe_handleClick = () => {
        console.log('infoSubscribe_handleClick');
    };
    const infoBell_handleClick = () => {
        console.log('infoBell_handleClick');
    };
    const infoEllipsis_handleClick = () => {
        console.log('infoEllipsis_handleClick');
    };

    // 채팅창 열기닫기
    const [isChatExpanded, setIsChatExpanded] = useState(true);

    // 브라우저의 가로가 1120이하면 채팅창 닫기
    const updateChatExpandedState = () => {
        if (window.innerWidth <= 1120 && isChatExpanded == true) {
            setIsChatExpanded(false);
        }
    };
    useEffect(() => {
        updateChatExpandedState();
        window.addEventListener('resize', updateChatExpandedState);

        return () => {
            window.removeEventListener('resize', updateChatExpandedState);
        };
    }, []);
    // 아이콘 클릭 시
    const handleClick_ChatClose = () => {
        setIsChatExpanded(false);
    };
    const handleClick_ChatOpen = () => {
        setIsChatExpanded(true);
    };

    // 채팅 받기
    const [chats, setChats] = useState([]);

    // 채팅 메시지 상태가 변경될 때마다 스크롤을 최하단으로 이동
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    return (
        <>
            <Sidebar isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
            <Header />
            <div style={{ marginLeft: isExpanded ? 240 : 66 }}>
                <div
                    className={
                        !isExpanded && !isChatExpanded
                            ? livestyles.homecontainer_chatOff // 둘 다 false일 때
                            : isExpanded && !isChatExpanded
                                ? livestyles.homecontainer_sideExpanded_chatOff // isExpanded만 true일 때
                                : isExpanded && isChatExpanded
                                    ? livestyles.homecontainer_sideExpanded // 둘 다 true일 때
                                    : livestyles.homecontainer // isChatExpanded만 true일 때, 나머지 경우
                    }
                >
                    {/* 라이브 화면 */}
                    <div className={livestyles.livecontainer}>
                        <Player
                            src={`http://${API_KEY}:8080/hls/${foundStreamerData?.newStreamKey}/index.m3u8`}
                            type="m3u8"
                            className={livestyles.hlsplayer}
                        />
                        {!isChatExpanded ? (
                            <FontAwesomeIcon
                                icon={faCommentDots}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '16px',
                                    fontSize: '22px',
                                    color: 'white',
                                    cursor: 'pointer',
                                }}
                                onClick={handleClick_ChatOpen}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className={livestyles.infocontainer}>
                        <div className={livestyles.infobox}>
                            <p className={livestyles.infobox_liveTitle}>{filteredStreamingUser?.studioInfo?.title}</p>
                            <div className={livestyles.infobox_content}>
                                <div className={livestyles.infobox_content_profile}>
                                    <img
                                        className={livestyles.infobox_content_profile_img}
                                        src="/images/profile_img.svg"
                                        alt="video_card_img"
                                    />
                                </div>
                                <div className={livestyles.infobox_content_remain}>
                                    <div className={livestyles.infobox_content_remain_name}>{streamerData?.ID}</div>
                                    <div className={livestyles.infobox_content_remain_info}>
                                        <p>824,824</p>
                                        <p>824</p>
                                        <p className={livestyles.infobox_content_remain_info_streaming}>03:30:50</p>
                                    </div>
                                    <div className={livestyles.infobox_content_remain_category_layout}>
                                        {filteredStreamingUser?.studioInfo?.category.map((tag, index) => (
                                            <div className={livestyles.infobox_content_remain_category} key={index}>
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={livestyles.infobox_content_remain_btns}>
                                        {/* 더보기 버튼 */}
                                        <button
                                            type="button"
                                            className={`${livestyles.infobox_content_remain_ellipsislBtn} ${livestyles.btn_borderNone}`}
                                            onClick={infoEllipsis_handleClick}
                                        >
                                            <FontAwesomeIcon
                                                icon={faEllipsis}
                                                style={{ color: 'white', width: '20px', height: '20px' }}
                                            />
                                        </button>

                                        {/* 알림 버튼*/}
                                        <button
                                            type="button"
                                            className={`${livestyles.infobox_content_remain_bellBtn} ${livestyles.btn_borderNone}`}
                                            onClick={infoBell_handleClick}
                                        >
                                            <FontAwesomeIcon
                                                icon={faBell}
                                                style={{ color: 'white', width: '20px', height: '20px' }}
                                            />
                                        </button>

                                        {/* 구독 버튼*/}
                                        <button
                                            type="button"
                                            className={`${livestyles.infobox_content_remain_subscribeBtn} ${livestyles.btn_borderNone}`}
                                            onClick={infoSubscribe_handleClick}
                                        >
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                style={{
                                                    color: 'white',
                                                    width: '20px',
                                                    height: '20px',
                                                    marginRight: '5px',
                                                }}
                                            />
                                        </button>

                                        {/* 팔로우 버튼 */}
                                        <button
                                            type="button"
                                            className={`${livestyles.infobox_content_remain_followBtn} ${livestyles.btn_borderNone}`}
                                            onClick={infoFollow_handleClick}
                                        >
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                style={{
                                                    color: 'white',
                                                    width: '20px',
                                                    height: '20px',
                                                    marginRight: '5px',
                                                }}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 채팅 */}
                <aside
                    className={isChatExpanded ? livestyles.live_chat : livestyles.live_chatClosed}
                    style={{ top: '60px' }}
                >
                    {/* 타이틀-실시간 채팅 */}
                    <div className={livestyles.live_chat_title}>
                        <FontAwesomeIcon
                            icon={faCommentSlash}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                                fontSize: '18px',
                                cursor: 'pointer',
                            }}
                            onClick={handleClick_ChatClose}
                        />
                        <p>채팅</p>
                    </div>

                    {/* 입력창 */}
                    <div className={livestyles.main_live_chat_inputbox_layout}>
                        <div className={livestyles.main_live_chat_inputbox_wrapper}>
                            <div className={livestyles.main_live_chat_inputbox_badge}></div>
                            <FontAwesomeIcon
                                icon={faFaceSmile}
                                style={{
                                    position: 'absolute',
                                    top: '14px',
                                    right: '10px',
                                    color: 'black',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                }}
                            />
                            {/* nextjs이미지 */}
                            <img
                                src="/images/shit01.png"
                                style={{
                                    position: 'absolute',
                                    top: '14px',
                                    right: '40px',
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer',
                                }}
                            />

                            <input
                                type="text"
                                className={livestyles.main_live_chat_inputbox}
                                value={chatText}
                                onChange={chat_handleChange}
                                onKeyDown={chat_handleKeyDown}
                                placeholder="채팅을 입력해주세요."
                            />
                            <button
                                type="button"
                                className={livestyles.main_live_chat_inputbox_btn}
                                onClick={sendChat_handleClick}
                            >
                                <FontAwesomeIcon
                                    icon={faPaperPlane}
                                    style={{ color: '#E3E3E3', width: '20px', height: '20px', marginRight: '3px' }}
                                />
                            </button>
                        </div>
                    </div>
                    {/* 채팅 뷰 영역 */}
                    <div className={isChatExpanded ? livestyles.live_chat_layout : livestyles.live_chat_hidden}>
                        <div className={livestyles.live_chat_viewWrapper}>
                            {user ? (
                                <div className={`default_font ${livestyles.live_chat_loginNotice}`}>
                                    로그인 되었습니다 : {nickname}
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
                </aside>
            </div>
        </>
    );
}
