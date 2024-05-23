import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';
import livestyles from '../css/main_live.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import shit from '../public/shit01.png';
import {
    faBell,
    faCommentDots,
    faCommentSlash,
    faEllipsis,
    faHeart,
    faPaperPlane,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
// import Player from '../components/Player';

export default function Live() {
    const [isExpanded, setIsExpanded] = useState(false);

    const messagesEndRef = useRef(null);

    const [chatText, setChatText] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const chat_handleChange = e => {
        setChatText(e.target.value);
    };
    const chat_handleClick = () => {
        if (chatText.trim() !== '') {
            setChatMessages(prevChatMessages => [...prevChatMessages, chatText]);
            setChatText('');
        }
    };
    const chat_handleKeyDown = event => {
        if (event.key === 'Enter') {
            chat_handleClick();
        }
    };

    // 채팅 메시지 상태가 변경될 때마다 스크롤을 최하단으로 이동
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

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
                    <div className={livestyles.livecontainer}>
                        {/* <Player /> */}
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
                            <p className={livestyles.infobox_liveTitle}>방 제목</p>
                            <div className={livestyles.infobox_content}>
                                <div className={livestyles.infobox_content_profile}></div>
                                <div className={livestyles.infobox_content_remain}>
                                    <div className={livestyles.infobox_content_remain_name}>이름</div>
                                    <div className={livestyles.infobox_content_remain_info}>
                                        <p>824,824</p>
                                        <p>824</p>
                                        <p className={livestyles.infobox_content_remain_info_streaming}>03:30:50</p>
                                    </div>
                                    <div className={livestyles.infobox_content_remain_category}>Just Chatting</div>
                                    <div className={livestyles.infobox_content_remain_btns}>
                                        {/* 더보기 버튼*/}
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
                                src="../public/shit01.png"
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
                                onClick={chat_handleClick}
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
                            {chatMessages.map((message, index) => (
                                <span key={index} className={livestyles.live_chat_chatting}>
                                    {/* 채팅 말풍선 */}
                                    <span style={{ display: 'inline-block' }}>
                                        {/* 뱃지 */}
                                        <span className={livestyles.live_chat_badge} />
                                        {/* 유저 이름 */}
                                        <span className={`default_font ${livestyles.live_chat_username}`}>
                                            이름일이삼사오육칠팔구십
                                        </span>
                                    </span>
                                    {/* 채팅 내용 */}
                                    <span className={`default_font ${livestyles.live_chat_userchat}`}>{message}</span>
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
