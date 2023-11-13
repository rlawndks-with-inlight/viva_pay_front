import React, { useState, useEffect, useRef } from 'react';
import Header from "src/components/header";
import { useInView } from 'react-intersection-observer';
import { useRouter } from "next/router";


const UserLayout = ({ activeSection, children, updateHeaderVisibility }) => {
    const [showHeader, setShowHeader] = useState(true);
    const [moreButtonClicked, setMoreButtonClicked] = useState(false);
    const [isMoreClicked, setIsMoreClicked] = useState(false);
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
    const handleMoreButtonClick = () => {
        setMoreButtonClicked(true);
        setIsMoreClicked(true);
    };

    // Function to close the "More" modal
    const closeMore = () => {
        setMoreButtonClicked(false);
        setIsMoreClicked(false);
        if (typeof updateHeaderVisibility === 'function') {
            updateHeaderVisibility(activeSection === 0 || (activeSection >= 1 && activeSection <= 4));
        }
    };

    return (
        <div className={`user-layout ${showHeader ? 'header-visible' : ''}`}>
            <Header
                showHeader={showHeader}
                scrollY={scrollY}
                setShowHeader={setShowHeader}
                activeSection={activeSection}
                isMoreClicked={isMoreClicked}
                handleMoreButtonClick={handleMoreButtonClick}
                setIsMoreClicked={setIsMoreClicked}
                closeMore={closeMore} // Pass the closeMore function to Header
                updateHeaderVisibility={updateHeaderVisibility}
            />
            {children}
        </div>
    );
};

export default UserLayout;
