import React, { useEffect, useState } from "react";
import styles from "../../css/studio_home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faMagnifyingGlass,
  faPaperPlane,
  faPlus,
  faSearch,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import J_Checkbox from "@/components/J_Checkbox";
import ChatPermission from "@/components/ChatPermission";
import BroadcastProperty from "@/components/BroadcastProperty";
import crypto from 'crypto';

export default function Home() {

    // 방송 제목
    const [TitleText, setTitleText] = useState('');
    const title_handleChange = (e) => {
      setTitleText(e.target.value);
    }
    const title_handleClick = () => {
      console.log(TitleText);
    }

    // 카테고리
    const [categoryText, setCategoryTitleText] = useState('');
    const category_handleChange = (e) => {
      setCategoryTitleText(e.target.value);
    }
    const category_handleClick = () => {
      console.log(categoryText);
    }

    // 스트림키
    // 일단 처음 스트림키 지정
    const [streamKey, setStreamKey] = useState('YourInitialStreamKey');
    const [showKey, setShowKey] = useState(false);
    const copyToClipboard = () => {
      navigator.clipboard.writeText(streamKey);
    }
    const reissue = () => {
      // const newStreamKey = Math.random().toString(36).substring(2, 15);
      const newStreamKey = crypto.randomBytes(16).toString('hex');
      setStreamKey(newStreamKey);
    }
    const toggleShowKey = () => {
      setShowKey(!showKey);
    }

  // 채팅 규칙 설정
  const [chatRoleText, setChatRoleText] = useState('');
  const chatRole_handleChange = (e) => {
    setChatRoleText(e.target.value);
  }
  const chatRole_handleClick = () => {
    console.log(chatRoleText);
  }

  return (
    <>
      <div className={styles.studio_test} style={{ paddingTop: "60px" }}>
        {/* 헤더 */}
        <div className={styles.studio_header} style={{ top: "0px" }}>
          <p className={`logo_font ${styles.studio_header_maintitle}`}>
            BBUZIZIK
          </p>
          <p className={`logo_font ${styles.studio_header_subtitle}`}>STUDIO</p>
        </div>

        {/* 메인 */}
        <div className={styles.studio_main} style={{ top: "60px" }}>
          {/* 라이브 화면 */}
          <div className={styles.studio_main_liveWindow}>
            <div className={styles.studio_main_liveWindowBox} />
          </div>
          {/* 설정 */}
          <div className={styles.studio_main_setting}>
            {/* 방송제목 */}
            <div className={styles.studio_main_setting_broadcastTitle}>
              <p style={{ alignSelf: "center" }}>방송제목</p>
              {/* 나중에 설정들 각 타이틀들 일정한 크기로 바꿔서 인풋박스랑 일정하게 거리두기 */}
              <input type="text" className={styles.studio_main_setting_broadcastTitle_inputbox} value={TitleText} onChange={title_handleChange}/>
              <input 
                type="button" 
                className={styles.studio_main_setting_broadcastTitle_btn} 
                onClick={title_handleClick}
                value="저장"
              />
            </div>

            {/* 카테고리 */}
            <div className={styles.studio_main_setting_broadcastCategory}>
              <p style={{ alignSelf: "center" }}>카테고리</p>
              <div className={styles.studio_main_setting_broadcastCategory_inputbox_wrapper}>
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ position: 'absolute', top: '10px', left: '10px', color: 'black', fontSize: '20px' }}
                />
                <input 
                  type="text" 
                  className={styles.studio_main_setting_broadcastCategory_inputbox} 
                  value={categoryText} 
                  onChange={category_handleChange}
                  style={{ paddingLeft: '40px' }} // 아이콘의 크기와 위치에 따라 조절해주세요.
                />
              </div>
              <input 
                type="button" 
                className={styles.studio_main_setting_broadcastCategory_btn} 
                onClick={category_handleClick}
                value="검색"
              />
            </div>

            {/* 방송속성 or 채팅권한 */}
            <div
              className={styles.studio_main_setting_broadcastSetting}
              style={{ height: "100px" }}
            >
              <BroadcastProperty />
              <ChatPermission />
            </div>

            <div className={styles.studio_main_setting_streamKey}>
              <p style={{ alignSelf: "center" }}>스트림 키</p>

              <div className={styles.studio_main_setting_streamKey_inputbox}>
              <p style={{ alignSelf: "center", fontSize:"16px" }}>
                {showKey ? streamKey : '*'.repeat(streamKey.length)}
              </p>
              <FontAwesomeIcon
                icon={showKey ? faEyeSlash : faEye}
                style={{ fontSize: "20px", alignSelf: "center" }}
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
              <p style={{ alignSelf: "center" }}>스트림 URL</p>
              <p
                style={{
                  marginLeft: "30px",
                  fontSize: "10px",
                  alignSelf: "center",
                }}
              >
                rtmp://rtmpmanager-test-bbuzizik/app/
              </p>
            </div>
            <div
              className={styles.studio_main_setting_broadcastInfo}
              style={{ height: "100px" }}
            >
              <p style={{ paddingTop: "10px" }}>방송정보</p>
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
            <div className={styles.studio_main_previewImg_title}>
              미리보기 이미지
            </div>
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
                <input type="button" className={styles.studio_main_chatRole_btn} onClick={chatRole_handleClick} value="저장"/>
            </div>
          </div>

          {/* 금칙어 설정 */}
          <div className={styles.studio_main_banWord}>
            <div className={styles.studio_main_banWord_title}>금칙어 설정</div>
            <div className={styles.studio_main_banWord_layout}>
              <div className={styles.studio_main_banWord_tag}>
                <FontAwesomeIcon icon={faX} />
                <p>안녕하세요</p>
              </div>

              <div className={styles.studio_main_banWord_Search}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
            </div>
          </div>
        </div>

        {/* 채팅 */}
        <div className={styles.studio_chat} style={{ top: "60px" }}>
          {/* 타이틀-실시간 채팅 */}
          <div className={styles.studio_chat_title}>
            <p>실시간 채팅</p>
          </div>
          {/* 채팅 뷰 영역 */}
          <div className={styles.studio_chat_layout}>
            {/* 채팅 말풍선 */}
            <div className={styles.studio_chat_chatting}>
              {/* 뱃지 */}
              <div className={styles.studio_chat_badge}></div>
              {/* 유저 이름 */}
              <p className={`default_font ${styles.studio_chat_username}`}>
                이름
              </p>
              {/* 채팅 내용 */}
              <p className={`default_font ${styles.studio_chat_userchat}`}>
                이것은 테스트 채팅 입니다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
              </p>
            </div>

            {/* 채팅 말풍선 */}
            <div className={styles.studio_chat_chatting}>
              {/* 뱃지 */}
              <div className={styles.studio_chat_badge}></div>
              {/* 유저 이름 */}
              <p className={`default_font ${styles.studio_chat_username}`}>
                이름
              </p>
              {/* 채팅 내용 */}
              <p className={`default_font ${styles.studio_chat_userchat}`}>
                이것은 테스트 채팅 입니다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
              </p>
              <p className={`default_font ${styles.studio_chat_userchatBot}`}>
                이것은 테스트 채팅 입니다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
//치지직 참고해서 변경 예정
