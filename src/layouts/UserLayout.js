import React, { useState, useEffect, useRef } from 'react';
import Header from "src/components/header";

const UserLayout = ({ activeSection, children, updateHeaderVisibility }) => {
    const [showHeader, setShowHeader] = useState(true);
    const scrollRef = useRef(0);
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {

        const handleScroll = () => {
            scrollRef.current = window.scrollY;
            setScrollY(scrollRef.current)
            if (scrollRef.current == 0) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }
        };
        // 이후 스크롤 이벤트를 모니터링합니다.
        window.addEventListener('scroll', handleScroll);

        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`user-layout ${showHeader ? 'header-visible' : ''}`}>
            <Header
                showHeader={showHeader}
                scrollY={scrollY}
                setShowHeader={setShowHeader}
                activeSection={activeSection}
                updateHeaderVisibility={updateHeaderVisibility}
            />
            {children}
        </div>
    );
};

export default UserLayout;
