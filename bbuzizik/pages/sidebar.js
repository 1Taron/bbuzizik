import { useState } from 'react';

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <button onClick={handleToggle}>Toggle Sidebar</button>
            {isExpanded ? (
                /* 펼쳐진 사이드바 내용 */
                <div>펼쳐진 사이드바 내용</div>
            ) : (
                /* 접혀진 사이드바 내용 */
                <div>접혀진 사이드바 내용</div>
            )}
        </div>
    );
};

