import { useState, useEffect } from 'react';
import styles from '../css/sidebar.module.css';
import Link from 'next/link';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../src/pages/api/firebase/firebasedb';

export default function Sidebar({ isExpanded, onToggle }) {
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (!isExpanded) {
            setShowAll(false);
        }
    }, [isExpanded]);

    // 스트리밍 목록
    const [streamingUsers, setStreamingUsers] = useState([]);
    const [streamingStudios, setStreamingStudios] = useState([]);
    const [filteredStreamingUsers, setFilteredStreamingUsers] = useState([]);
    const [inactiveStreamingUsers, setInactiveStreamingUsers] = useState([]);

    useEffect(() => {
        // User 데이터
        const q = query(collection(db, 'User'));
        // Studio 데이터
        const qs = query(collection(db, 'Studio'));
        const unsubscribeUsers = onSnapshot(
            q,
            snapshot => {
                const allUserDoc = snapshot.docs.map(doc => doc.data());

                console.log('AllUserDoc document data:', allUserDoc);

                setStreamingUsers(allUserDoc);
            },
            error => {
                console.error('Error fetching chat document:', error);
            }
        );
        const unsubscribeStudios = onSnapshot(
            qs,
            snapshot => {
                const allStudioDoc = snapshot.docs.map(doc => doc.data());

                console.log('AllStudioDoc document data:', allStudioDoc);

                setStreamingStudios(allStudioDoc);
            },
            error => {
                console.error('Error fetching chat document:', error);
            }
        );
        return () => {
            unsubscribeUsers();
            unsubscribeStudios();
        };
    }, []);

    useEffect(() => {
        const activeStudios = streamingStudios.filter(studio => studio.isOn);
        const inactiveStudios = streamingStudios.filter(studio => !studio.isOn);

        const combinedData = activeStudios.flatMap(studio => {
            return streamingUsers
                .filter(user => user.UID === studio.UID)
                .map(user => ({
                    ...user,
                    studioInfo: studio,
                }));
        });
        setFilteredStreamingUsers(combinedData);
        console.log('filteredStreamingUsers :', combinedData);

        const combinedInactiveData = inactiveStudios.flatMap(studio => {
            return streamingUsers
                .filter(user => user.UID === studio.UID)
                .map(user => ({
                    ...user,
                    studioInfo: studio,
                }));
        });
        setInactiveStreamingUsers(combinedInactiveData);
        console.log('inactiveStreamingUsers:', combinedInactiveData);
    }, [streamingUsers, streamingStudios]);

    const [followChannels, setFollowChannels] = useState([]);
    const [offlineChannels, setOfflineChannels] = useState([]);

    useEffect(() => {
        if (filteredStreamingUsers && filteredStreamingUsers.length > 0) {
            const streamingChannels = filteredStreamingUsers.map((user, index) => ({
                img: user?.profileImage || '/images/profile_img.svg', // 프로필 이미지가 없을 경우 기본 이미지 설정
                name: user?.ID || `이름 없음`, // 이름이 없을 경우 이름 없음 설정
                game: Array.isArray(user?.studioInfo?.category)
                    ? user?.studioInfo?.category.join(' ')
                    : user?.studioInfo?.category || '', // 게임 정보가 없을 공백, 배열일 경우 띄어쓰기 설정
                viewers: user?.studioInfo?.viewers || 0, // 시청자 수가 없을 경우 0으로 설정
                Info: user?.studioInfo?.title || '', // 정보가 없을 경우 공백 설정
            }));
            setFollowChannels(streamingChannels);
        }
    }, [filteredStreamingUsers]);

    useEffect(() => {
        if (inactiveStreamingUsers && inactiveStreamingUsers.length > 0) {
            const offlineChannels = inactiveStreamingUsers.map((user, index) => ({
                img: user?.profileImage || '/images/profile_img.svg', // 프로필 이미지가 없을 경우 기본 이미지 설정
                name: user?.ID || `이름 없음`, // 이름이 없을 경우 이름 없음 설정
                game: Array.isArray(user?.studioInfo?.category)
                    ? user?.studioInfo?.category.join(' ')
                    : user?.studioInfo?.category || '', // 게임 정보가 없을 공백, 배열일 경우 띄어쓰기 설정
                viewers: user?.studioInfo?.viewers || 0, // 시청자 수가 없을 경우 0으로 설정
                Info: user?.studioInfo?.title || '', // 정보가 없을 경우 공백 설정
            }));
            setOfflineChannels(offlineChannels);
        }
    }, [inactiveStreamingUsers]);

    const channelsToShow = showAll ? followChannels : followChannels.slice(0, 5);
    const channelsToShowOff = showAll ? offlineChannels : offlineChannels.slice(0, 5);

    return (
        <div
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: isExpanded ? '250px' : '50px',
                height: '100%',
                zIndex: '190',
            }}
        >
            <button onClick={onToggle} className={styles.button}>
                <svg className={styles.svg} width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="11" y="13" width="18" height="2" rx="1" fill="#DFE2EA"></rect>
                    <rect x="11" y="19" width="18" height="2" rx="1" fill="#DFE2EA"></rect>
                    <rect x="11" y="25" width="18" height="2" rx="1" fill="#DFE2EA"></rect>
                </svg>
            </button>
            {isExpanded ? (
                <div className={styles.OpenSidebar}>
                    <div className={styles.channel_container}>
                        <div className={styles.channelName}>팔로우</div>
                        <ul className={styles.Channel_info_container}>
                            {channelsToShow.map((channel, index) => (
                                <li className={styles.Channel_info} key={index}>
                                    <Link href="/live" passHref>
                                        <button className={styles.profile_button}>
                                            <img className={styles.Profile_img} src={channel.img} alt="profile_icon" />
                                            <div className={styles.Profile_name_game}>
                                                <div className={styles.Profile_name}>{channel.name}</div>
                                                <div className={styles.Profile_game}>{channel.game}</div>
                                            </div>
                                            <div className={styles.Channel_viewer_dot}></div>
                                            <div className={styles.Channel_viewer_amount}>{channel.viewers}</div>
                                        </button>
                                    </Link>
                                    <div className={styles.followPopup1}>
                                        <div className={styles.modal_channel_Info1}>{channel.Info}</div>
                                    </div>
                                </li>
                            ))}
                            {channelsToShowOff.map((channel, index) => (
                                <li className={styles.Channel_info} key={index}>
                                    <Link href="/live" passHref>
                                        <button className={styles.Offline_profile_button}>
                                            <img className={styles.Profile_img} src={channel.img} alt="profile_icon" />
                                            <div className={styles.Offline_Profile_name}>{channel.name}</div>
                                        </button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {showAll ? (
                            <div className={styles.ShowButton_container}>
                                <button onClick={() => setShowAll(false)} className={styles.showMoreButton}>
                                    <div className={styles.show_text}>접기</div>
                                    <img className={styles.arrowReversal} src="/images/arrow.svg" alt="arrow"></img>
                                </button>
                            </div>
                        ) : (
                            <div className={styles.ShowButton_container}>
                                <button onClick={() => setShowAll(true)} className={styles.showMoreButton}>
                                    <div className={styles.show_text}>더보기</div>
                                    <img className={styles.arrow} src="/images/arrow.svg" alt="arrow"></img>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.CloseSidebar}>
                    <div className={styles.channel_container}>
                        <div className={styles.channelName1}>팔로우</div>
                        <ul className={styles.Channel_info_container1}>
                            {channelsToShow.map((channel, index) => (
                                <li className={styles.Channel_info1} key={index}>
                                    <Link href="/live" passHref>
                                        <img className={styles.Profile_img1} src={channel.img} alt="profile_icon" />
                                    </Link>
                                    <div className={styles.followPopup}>
                                        <div className={styles.modal_channel_name}>
                                            {channel.name}
                                            <div className={styles.modal_channel_game}>{channel.game}</div>
                                        </div>
                                        <div className={styles.modal_channel_Info}>{channel.Info}</div>
                                        <div className={styles.modal_channel_viewers}>
                                            <div className={styles.Channel_viewer_dot}></div>
                                            <div>{channel.viewers}</div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {channelsToShowOff.map((channel, index) => (
                                <li className={styles.Offline_Channel_info1} key={index}>
                                    <Link href="/live" passHref>
                                        <img
                                            className={styles.Offline_Profile_img1}
                                            src={channel.img}
                                            alt="profile_icon"
                                        />
                                        {/* <div className={styles.Offline_Profile_name}>{channel.name}</div> */}
                                    </Link>
                                    <div className={styles.Offline_followPopup}>
                                        <div className={styles.Offline_Profile_name1}>{channel.name}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
