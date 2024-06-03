import { signOut } from 'firebase/auth';
import { auth } from '../pages/api/firebase/firebasedb';
import React, { useState } from 'react';
import styles from '../css/dropdown.module.css'

const DropdownMenu = () => {

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('로그아웃 성공');
            window.location.reload(); // 페이지 새로고침
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    const UserInfo = [
        { img: '/image/profile_img.svg', name: '허니츄러스' }
    ]

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.dropdown_container}>
            <button className={styles.dropdown_button} onClick={toggleDropdown}>
                <img className={styles.Profile_img} src={UserInfo[0].img} alt="profile_icon" />
            </button>
            {isOpen && (
                <div className={styles.dropdown_menu_container}>
                    <ul className={styles.dropdown_menu}>
                        <li className={styles.dropdown_profile}>
                            <img className={styles.dropdown_profile_img} src={UserInfo[0].img} alt="profile_icon" />
                            <div className={styles.dropdown_profile_name_container}>
                                <span className={styles.dropdown_profile_name1}>뿌지직 프로필</span>
                                <span className={styles.dropdown_profile_name2}>{UserInfo[0].name}</span>
                            </div>
                        </li>
                        <hr className={styles.line} />
                        <li className={styles.dropdown_item}>
                            <a href='/'>내 채널</a>
                        </li>
                        <li className={styles.dropdown_item}>
                            <a href='/'>내 돈</a>
                        </li>
                        <li className={styles.dropdown_item}>
                            <a href='/'>팔로잉 채널</a>
                        </li>
                        <li className={styles.dropdown_item}>
                            <button onClick={handleLogout}>로그아웃</button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;