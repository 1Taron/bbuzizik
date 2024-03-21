import { useState, useEffect } from 'react';
import styles from '../css/sidebar.module.css';

export default function Sidebar({ isExpanded, onToggle }) {
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (!isExpanded) {
            setShowAll(false);
        }
    }, [isExpanded]);

    const followChannels = [
        { img: '/image/profile_img.svg', name: '허니츄러스', game: 'talk', viewers: 1000, Info: '안녕하세요' },
        { img: '/image/profile_img.svg', name: '채널2', game: '게임2', viewers: 2000, Info: '반갑꼬리' },
        {
            img: '/image/profile_img.svg',
            name: '채널3',
            game: '게임3',
            viewers: 3000,
            Info: '안녕하세요, 안녕하세요, 안녕하세요',
        },
        { img: '/image/profile_img.svg', name: '허니츄러스', game: 'talk', viewers: 1000, Info: '안녕하세요' },
        { img: '/image/profile_img.svg', name: '채널2', game: '게임2', viewers: 2000, Info: '안녕하세요' },
        { img: '/image/profile_img.svg', name: '채널3', game: '게임3', viewers: 3000, Info: '안녕하세요' },
        { img: '/image/profile_img.svg', name: '허니츄러스', game: 'talk', viewers: 1000, Info: '안녕하세요' },
        { img: '/image/profile_img.svg', name: '채널2', game: '게임2', viewers: 2000, Info: '안녕하세요' },
        { img: '/image/profile_img.svg', name: '채널3', game: '게임3', viewers: 3000, Info: '안녕하세요' },
    ];

    const channelsToShow = showAll ? followChannels : followChannels.slice(0, 5);

    return (
        <div
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: isExpanded ? '250px' : '50px',
                height: '100%',
                zIndex: '5000',
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
                                    <button className={styles.profile_button}>
                                        <img className={styles.Profile_img} src={channel.img} alt="profile_icon" />
                                        <div className={styles.Profile_name_game}>
                                            <div className={styles.Profile_name}>{channel.name}</div>
                                            <div className={styles.Profile_game}>{channel.game}</div>
                                        </div>
                                        <div className={styles.Channel_viewer_dot}></div>
                                        <div className={styles.Channel_viewer_amount}>{channel.viewers}</div>
                                    </button>
                                    <div className={styles.followPopup1}>
                                        <div className={styles.modal_channel_Info1}>{channel.Info}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {showAll ? (
                            <div className={styles.ShowButton_container}>
                                <button onClick={() => setShowAll(false)} className={styles.showMoreButton}>
                                    <div className={styles.show_text}>접기</div>
                                    <img className={styles.arrow} src="/image/arrow.svg" alt="arrow"></img>
                                </button>
                            </div>
                        ) : (
                            <div className={styles.ShowButton_container}>
                                <button onClick={() => setShowAll(true)} className={styles.showMoreButton}>
                                    <div className={styles.show_text}>더보기</div>
                                    <img className={styles.arrow} src="/image/arrow.svg" alt="arrow"></img>
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
                                    <img className={styles.Profile_img1} src={channel.img} alt="profile_icon" />
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
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
