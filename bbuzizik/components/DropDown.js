import React, { useContext, useEffect, useState } from 'react';
import styles from '../css/dropdown.module.css';
import { auth, db } from '../src/pages/api/firebase/firebasedb';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

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

    const UserInfo = [{ img: '/images/profile_img.svg', name: '허니츄러스' }];

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            setUser(currentUser);
            // console.log(currentUser);
        });
        return unsubscribe;
    }, []);

    //토큰이 있나 없나 확인
    const [user, setUser] = useState('');

    const [nickname, setNickname] = useState('');

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
                    // console.log('User document data:', userData);
                    setNickname(userData.ID);
                } else {
                    console.log('No matching documents.');
                }
            } catch (error) {
                console.error('Error fetching user document:', error);
            }
        };

        if (user && user.uid && db) {
            fetchUserNickname();
        }
    }, [user, db]);
    // const { user, nickname } = useContext(UserContext);
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
                                <span className={styles.dropdown_profile_name2}>{nickname}</span>
                            </div>
                        </li>
                        <hr className={styles.line} />
                        <li className={styles.dropdown_item}>
                            <a href="/">내 채널</a>
                        </li>
                        <li className={styles.dropdown_item}>
                            <a href="/">내 돈</a>
                        </li>
                        <li className={styles.dropdown_item}>
                            <a href="/">팔로잉 채널</a>
                        </li>
                        <li className={styles.dropdown_item}>
                            <button className={styles.dropdown_item_button} onClick={handleLogout}>
                                로그아웃
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
