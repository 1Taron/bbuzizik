import React, { useState } from "react";
import J_Checkbox from "./J_Checkbox";
import styles from "../css/studio_home.module.css";

function ChatPermission() {
  const [selectedPermission, setSelectedPermission] = useState(null);

  const handleCheckChange = (label, isChecked) => {
    setSelectedPermission(isChecked ? label : null);
  };

  const permissions = ['모든 사용자', '팔로워 전용', '운영자 전용'];

  return (
    <div style={{ paddingTop: "10px" }}>
      <p className={styles.studio_main_setting_broadcastSetting_title}>
        채팅권한
      </p>
      <div className={styles.studio_main_setting_chatRights_property}>
        <div className={styles.studio_main_setting_chatRights_property_checkboxes}>
          {permissions.map(permission => (
            <J_Checkbox
            key={permission}
            label={permission}
            checked={selectedPermission === permission}
            onCheckChange={(isChecked) => handleCheckChange(permission, isChecked)}
          />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatPermission;