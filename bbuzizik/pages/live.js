import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';
import styles from '../css/main.module.css';
import livestyles from '../css/main_live.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Live() {
  const [isExpanded, setIsExpanded] = useState(false);

  const [chatText, setChatText] = useState("");
  const chat_handleChange = (e) => {
    setChatText(e.target.value);
  };
  const chat_handleClick = () => {
    setChatText("");
  };

  return (
    <>
      <Sidebar isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
      <Header />
      <div style={{ paddingLeft: isExpanded ? 240 : 66 }}>
        <div className={livestyles.homecontainer}>
          <h1>라이브</h1>
        </div>

        {/* 채팅 */}
        <aside className={livestyles.live_chat} style={{ top: "60px" }}>
          {/* 타이틀-실시간 채팅 */}
          <div className={livestyles.live_chat_title}>
            <p>채팅</p>
          </div>

          {/* 입력창 */}
          <div className={livestyles.main_live_chat_inputbox_layout}>
                <div className={livestyles.main_live_chat_inputbox_wrapper}>
                    <FontAwesomeIcon
                    icon={faSearch}
                    style={{
                        position: "absolute",
                        top: "15px",
                        left: "10px",
                        color: "black",
                        fontSize: "20px",
                    }}
                    />
                    <input
                    type="text"
                    className={
                        livestyles.main_live_chat_inputbox
                    }
                    value={chatText}
                    onChange={chat_handleChange}
                    style={{ paddingLeft: "40px" }}
                    />
                    <input
                    type="button"
                    className={livestyles.main_live_chat_inputbox_btn}
                    onClick={chat_handleClick}
                    value="입력"
                    />
                </div>
                
              </div>
          {/* 채팅 뷰 영역 */}
          <div className={livestyles.live_chat_layout}>
            {/* 채팅 말풍선 */}
            <div className={livestyles.live_chat_chatting}>
              {/* 뱃지 */}
              <div className={livestyles.live_chat_badge}></div>
              {/* 유저 이름 */}
              <p className={`default_font ${livestyles.live_chat_username}`}>
                이름
              </p>
              {/* 채팅 내용 */}
              <p className={`default_font ${livestyles.live_chat_userchat}`}>
                이것은 테스트 채팅 입니다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
              </p>
            </div>

            {/* 채팅 말풍선 */}
            <div className={livestyles.live_chat_chatting}>
              {/* 뱃지 */}
              <div className={livestyles.live_chat_badge}></div>
              {/* 유저 이름 */}
              <p className={`default_font ${livestyles.live_chat_username}`}>
                이름
              </p>
              {/* 채팅 내용 */}
              <p className={`default_font ${livestyles.live_chat_userchat}`}>
                이것은 테스트 채팅 입니다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
              </p>
              <p className={`default_font ${livestyles.live_chat_userchatBot}`}>
                이것은 테스트 채팅 입니다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}