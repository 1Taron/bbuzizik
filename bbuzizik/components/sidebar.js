import { useState } from 'react';
import styles from '../css/sidebar.module.css'

export default function Sidebar({ isExpanded, onToggle }) {


    const followChannels = [
        { img: "/image/profile_img.svg", name: "허니츄러스", game: "수박게임", viewers: 1000 },
        { img: "/image/profile_img.svg", name: "채널2", game: "게임2", viewers: 2000 },
        { img: "/image/profile_img.svg", name: "채널3", game: "게임3", viewers: 3000 }
    ];
    const recommendChannels = ["채널4", "채널5", "채널6"];


    return (
        <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <button onClick={onToggle} className={styles.button}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="11" y="13" width="18" height="2" rx="1" fill="#DFE2EA"></rect>
                    <rect x="11" y="19" width="18" height="2" rx="1" fill="#DFE2EA"></rect>
                    <rect x="11" y="25" width="18" height="2" rx="1" fill="#DFE2EA"></rect>
                </svg>
            </button>
            {isExpanded ? (
                /* 펼쳐진 사이드바 내용 */
                <div className={styles.OpenSidebar}>
                    <div className={styles.channel_container}>
                        <div className={styles.channelName} >팔로우</div>
                        <ul className={styles.Channel_info_container}>
                            {followChannels.map((channel, index) => (
                                <li className={styles.Channel_info} key={index}>
                                    <img className={styles.Profile_img} src={channel.img} alt="profile_icon" />
                                    <div className={styles.Profile_name_game}>
                                        <div className={styles.Profile_name}>{channel.name}</div>
                                        <div className={styles.Profile_game}>{channel.game}</div>
                                    </div>
                                    <div className={styles.Channel_viewer}>{channel.viewers}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="recommendChannels">
                        <h2>추천 채널</h2>
                        <ul>
                            {recommendChannels.map((channel, index) => (
                                <li key={index}>{channel}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                /* 접혀진 사이드바 내용 */
                <div className={styles.CloseSidebar}>

                </div>
            )}
        </div>
    );
};

