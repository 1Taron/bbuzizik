import React, { useEffect, useState } from 'react';
import J_Checkbox from './J_Checkbox';
import styles from '../css/studio_home.module.css';
import { useContext } from 'react';
import { GlobalContext } from '../src/pages/Studio/home';


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

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    //Globalcontext
    const { broadcast, setbroadcast, broadcastpw, setbroadcastpw } = useContext(GlobalContext);

    useEffect(() => {
        setbroadcast(checkboxStates);
        setbroadcastpw(password);
    }, [checkboxStates, password, setbroadcast, setbroadcastpw]);


    return (
        <div style={{ paddingTop: '10px' }}>
            <p className={styles.studio_main_setting_broadcastSetting_title}>방송속성</p>
            <div className={styles.studio_main_setting_broadcastSetting_property}>
                <div className={styles.studio_main_setting_broadcastSetting_property_checkboxes}>
                    {Object.keys(broadcast).map(label => (
                        <J_Checkbox
                            key={label}
                            label={label}
                            checked={broadcast[label]}
                            onCheckChange={isChecked => handleCheckChange(label, isChecked)}
                        />
                    ))}

                    <input
                        type="text"
                        className={styles.studio_main_setting_broadcastSetting_property_pwText}
                        value={broadcastpw}
                        onChange={handlePasswordChange}
                        disabled={!broadcast['비밀번호 설정']}
                    />
                </div>
            </div>
        </div>
    );
}

export default BroadcastProperty;
