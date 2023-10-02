// components/Header.js
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeButton, setActiveButton] = useState(""); // 활성 버튼 상태 추가

    useEffect(() => {
        // 페이지가 로드되거나 활성 섹션이 변경될 때 헤더가 나타나도록 합니다.
        setIsVisible(true);
    }, []);

    return (
        <header className={`overlay-header ${isVisible ? 'visible' : ''}`}>
            <Link href="/" legacyBehavior>
                <a className="logo-button">
                    <span className="logo-text">heerim</span>
                    <span className="sub-text">Architects & Planners</span>
                </a>
            </Link>
            <div className="buttons">
                <Link href="/en" legacyBehavior>
                    <a className={activeButton === "en" ? "active" : ""}>EN</a>
                </Link>
                <Link href="/kr" legacyBehavior>
                    <a className={activeButton === "kr" ? "active" : ""}>KO</a>
                </Link>
                <button>
                    <img src="/icon/search.png" alt="Search Icon" width="40" height="40" />
                </button>
                <button>
                    <img src="/icon/more.png" alt="More Icon" width="40" height="40" />
                </button>
            </div>
        </header>
    );
};

export default Header;
