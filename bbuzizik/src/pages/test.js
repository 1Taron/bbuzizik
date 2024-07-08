import React, { useState, useRef, useEffect } from 'react';
import styles from '../../css/test.module.css';

const Test = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const popupRef = useRef(null);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            setSearchHistory([...searchHistory, searchTerm.trim()]);
            setSearchTerm('');
        }
    };

    const handleDelete = index => {
        const newHistory = searchHistory.filter((_, i) => i !== index);
        setSearchHistory(newHistory);
    };

    const handleClickOutside = event => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setIsPopupVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.App}>
            <div className={styles.search_container}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onFocus={() => setIsPopupVisible(true)}
                />
                <button onClick={handleSearch}>검색</button>
            </div>

            {isPopupVisible && (
                <div className={styles.popup} ref={popupRef}>
                    <h3>검색 기록</h3>
                    <ul>
                        {searchHistory.map((term, index) => (
                            <li key={index}>
                                {term} <button onClick={() => handleDelete(index)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Test;
