import React, { useEffect, useState } from "react";
import styles from "../../css/studio_home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlus, faX } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
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
          <div className={styles.studio_main_setting}>설정</div>
          {/* </div> */}

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
            <div className={styles.studio_main_chatRole_box}>
              채팅 규칙을 입력해 주세요. 예) 1. 좋은 표현을 사용하세요. 2.서로를
              존중해 주세요. 3. 친목 금지입니다.
            </div>
            <div className={styles.studio_main_chatRole_btnlayout}>
              <div className={styles.studio_main_chatRole_btn}>버튼</div>
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
          {/* </div> */}
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
