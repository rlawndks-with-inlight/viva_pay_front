import React, { useState, useEffect } from 'react';
import Header from "src/components/header";
import { useRouter } from "next/router";

const UserLayout = ({ activeSection, children }) => {
    const [showHeader, setShowHeader] = useState(activeSection === 0);

    const handleMouseMove = (e) => {
        const mouseY = e.clientY;
        // 화면 상단 15% 내에 있는 경우에만 헤더를 표시
        setShowHeader(activeSection === 0 || (activeSection >= 1 && activeSection <= 4 && mouseY < 0.15 * window.innerHeight));
    };

    useEffect(() => {
        // 마우스 이벤트에 대한 리스너 추가
        window.addEventListener("mousemove", handleMouseMove);

        // 컴포넌트가 언마운트될 때 리스너 제거
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [activeSection]);

    return (
        <div className={`user-layout ${showHeader ? 'header-visible' : ''}`}>
            {showHeader && <Header activeSection={activeSection} />}
            {children}
        </div>
    );
};

export default UserLayout;
