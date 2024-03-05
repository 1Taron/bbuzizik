import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';
import livestyles from '../css/main_live.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import shit from '../public/shit01.png';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
      <div style={{ marginLeft: isExpanded ? 240 : 66 }}>
        <div className={livestyles.homecontainer} style={{ width: isExpanded ? 'calc(100vw - 240px - 350px)' : 'calc(100vw - 66px - 350px)' }}>
          <div className={livestyles.livecontainer}>라이브 화면</div>
          <div className={livestyles.infocontainer}>
            <div className={livestyles.infobox}>
              <p>방 제목</p>
              <div className={livestyles.infobox_content}>
                <div className={livestyles.infobox_content_profile}></div>
                <div className={livestyles.infobox_content_remain}>
                  <div className={livestyles.infobox_content_remain_name}>이름</div>
                  <div className={livestyles.infobox_content_remain_info}>
                    <p className={livestyles.infobox_content_remain_info_streaming}>03:30:50스트리밍중</p>
                    <p>현재 824 시청중</p>
                    <p>누적 824,824</p>
                  </div>
                  <div className={livestyles.infobox_content_remain_category}>TALK</div>
                  <div className={livestyles.infobox_content_remain_btns}>버튼</div>
                  </div>
              </div>
            </div>
          </div>
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
                    <div className={livestyles.main_live_chat_inputbox_badge}></div>
                    <FontAwesomeIcon
                    icon={faFaceSmile}
                    style={{
                        position: "absolute",
                        top: "14px",
                        right: "10px",
                        color: "black",
                        fontSize: "20px",
                        cursor:"pointer",
                    }}
                    />
                    {/* nextjs이미지 */}
                    <Image src={shit} 
                    style={{
                          position: "absolute",
                          top: "14px",
                          right: "40px",
                          width: "20px", 
                          height: "20px",
                          cursor:"pointer",
                      }} />
                    
                    <input
                    type="text"
                    className={
                        livestyles.main_live_chat_inputbox
                    }
                    value={chatText}
                    onChange={chat_handleChange}
                    placeholder='채팅을 입력해주세요.'
                    style={{ paddingLeft: "40px", fontSize: "14px", backgroundColor: "#63666A" }}
                    />
                    <button
                    type="button"
                    className={livestyles.main_live_chat_inputbox_btn}
                    onClick={chat_handleClick}
                    >
                    <FontAwesomeIcon 
                    icon={faPaperPlane} 
                    style={{ color: '#E3E3E3', width:"20px", height:"20px", marginRight:"3px" }} 
                    />
                    </button>
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