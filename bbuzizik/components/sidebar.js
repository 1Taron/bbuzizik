import { useState } from 'react';
import styles from '../css/sidebar.module.css'

export default function Sidebar({ isExpanded, onToggle }) {
    const [showAll, setShowAll] = useState(false);

    const followChannels = [
        { img: "/image/profile_img.svg", name: "허니츄러스", game: "Just Chatting", viewers: 1000 },
        { img: "/image/profile_img.svg", name: "채널2", game: "게임2", viewers: 2000 },
        { img: "/image/profile_img.svg", name: "채널3", game: "게임3", viewers: 3000 },
        { img: "/image/profile_img.svg", name: "허니츄러스", game: "Just Chatting", viewers: 1000 },
        { img: "/image/profile_img.svg", name: "채널2", game: "게임2", viewers: 2000 },
        { img: "/image/profile_img.svg", name: "채널3", game: "게임3", viewers: 3000 },
        { img: "/image/profile_img.svg", name: "허니츄러스", game: "Just Chatting", viewers: 1000 },
        { img: "/image/profile_img.svg", name: "채널2", game: "게임2", viewers: 2000 },
        { img: "/image/profile_img.svg", name: "채널3", game: "게임3", viewers: 3000 }

    ];

    const channelsToShow = showAll ? followChannels : followChannels.slice(0, 5);

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
                <div className={styles.OpenSidebar}>
                    <div className={styles.channel_container}>
                        <div className={styles.channelName}>팔로우</div>
                        <ul className={styles.Channel_info_container}>
                            {channelsToShow.map((channel, index) => (
                                <li className={styles.Channel_info} key={index}>
                                    <img className={styles.Profile_img} src={channel.img} alt="profile_icon" />
                                    <div className={styles.Profile_name_game}>
                                        <div className={styles.Profile_name}>{channel.name}</div>
                                        <div className={styles.Profile_game}>{channel.game}</div>
                                    </div>
                                    <div className={styles.Channel_viewer_dot}></div>
                                    <div className={styles.Channel_viewer_amount}>{channel.viewers}</div>
                                </li>
                            ))}
                        </ul>
                        {showAll ?
                            <button onClick={() => setShowAll(false)} className={styles.showMoreButton}>접기</button>
                            :
                            <button onClick={() => setShowAll(true)} className={styles.showMoreButton}>더보기</button>
                        }
                    </div>
                </div>
            ) : (
                <div className={styles.CloseSidebar} />
            )}
        </div>
    );
}