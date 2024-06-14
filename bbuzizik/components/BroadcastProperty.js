import React, { useState } from "react";
import J_Checkbox from './J_Checkbox';
import styles from "../css/studio_home.module.css";
import { useContext } from "react";
import { GlobalContext } from '../src/pages/Studio/home'

function BroadcastProperty() {
  const [checkboxStates, setCheckboxStates] = useState({
    '방송 숨김 설정': false,
    '유료 광고 포함 표시': false,
    '연령제한 방송': false,
    '비밀번호 설정': false,
  });

  const [password, setPassword] = useState('');

  const handleCheckChange = (label, isChecked) => {
    setCheckboxStates({
      ...checkboxStates,
      [label]: isChecked,
    });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordSave = () => {
    if (checkboxStates['비밀번호 설정']) {
      console.log(password);
    } else {
      console.log('비밀번호 설정 체크박스가 체크되어 있지 않습니다.');
    }
  };

  //usecontext
  const { broadcast, setbroadcast } = useContext(GlobalContext);
  const { broadcastpw, setbroadcastpw } = useContext(GlobalContext);

  setbroadcast(checkboxStates);
  setbroadcastpw(password);

  return (
    <div style={{ paddingTop: "10px" }}>
      <p className={styles.studio_main_setting_broadcastSetting_title}>
        방송속성
      </p>
      <div className={styles.studio_main_setting_broadcastSetting_property}>
        <div className={styles.studio_main_setting_broadcastSetting_property_checkboxes}>
          {Object.keys(checkboxStates).map(label => (
            <J_Checkbox
              key={label}
              label={label}
              checked={checkboxStates[label]}
              onCheckChange={(isChecked) => handleCheckChange(label, isChecked)}
            />
          ))}

          <input
            type="text"
            className={styles.studio_main_setting_broadcastSetting_property_pwText}
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type="button"
            className={styles.studio_main_setting_broadcastSetting_property_pwBtn}
            onClick={handlePasswordSave}
            value="저장"
          />
        </div>
      </div>
    </div>
  );
}

export default BroadcastProperty;