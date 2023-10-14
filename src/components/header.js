// components/Header.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Header = () => {
    const router = useRouter();
    const { lang = 'kr' } = router.query;
    const [isVisible, setIsVisible] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false); // 검색 창 가시성 상태 추가
    const [isMoreVisible, setIsMoreVisible] = useState(false); // 더보기 모달 창 가시성 상태 추가
    const [activeButton, setActiveButton] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // 검색 창 표시 함수
    const showSearch = () => {
        setIsSearchVisible(true);
    };

    // 검색 창 닫기 함수
    const closeSearch = () => {
        setIsSearchVisible(false);
        setSearchQuery(""); // 검색어 초기화
    };

    // 검색어 입력 핸들러
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 검색 실행 함수
    const handleSearch = () => {
        // 여기에서 검색을 실행하거나 필요한 로직을 추가하세요.
        console.log("Searching for:", searchQuery);
        // 검색 이후에는 검색 창을 닫을 수 있도록
        closeSearch();
    };

    // 더보기 모달 표시 함수
    const showMore = () => {
        setIsMoreVisible(true);
    };

    // 더보기 모달 닫기 함수
    const closeMore = () => {
        setIsMoreVisible(false);
    };

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
                    <a className={lang === "en" ? "active" : ""}>EN</a>
                </Link>
                <Link href="/kr" legacyBehavior>
                    <a className={lang === "kr" ? "active" : ""}>KR</a>
                </Link>
                <button onClick={showSearch}>
                    <img src="/icon/search.png" alt="Search Icon" width="40" height="40" />
                </button>
                <button onClick={showMore}>
                    <img src="/icon/more.png" alt="More Icon" width="40" height="40" />
                </button>
            </div>
            {isSearchVisible && (
                <div className="search-modal">
                    <div className="close-button-container">
                        <button onClick={closeSearch} className="close-button">Close X</button>
                    </div>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Type here"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            className="search-input" // 검색 입력란 스타일 추가
                        />
                        <a href="/link-to-search" onClick={() => { window.location.href = "/404"; }}>
                            <button onClick={handleSearch} className="search-button">
                                <img src="/icon/search.png" alt="Search Icon" width="60" height="60" />
                            </button>
                        </a>
                    </div>
                    <div className="recommend-keywords">
                        <p className="keyword-title">Recommend Keywords</p>
                        <button className="keyword-button" onClick={() => { window.location.reload() }}><Link href="/LaLuna">LaLuna</Link></button>
                        <button className="keyword-button" onClick={() => { window.location.reload() }}><Link href="/DCM">DCM</Link></button>
                        <button className="keyword-button" onClick={() => { window.location.reload() }}><Link href="/Pangyo">Pangyo</Link></button>
                        <button className="keyword-button" onClick={() => { window.location.reload() }}><Link href="/Cheongna">Cheongna</Link></button>
                        <button className="keyword-button" onClick={() => { window.location.reload() }}><Link href="/Azerbaijan">Azerbaijan</Link></button>
                        <button className="keyword-button" onClick={() => { window.location.reload() }}><Link href="/Vietnam">Vietnam</Link></button>
                        <button className="keyword-button" onClick={() => { window.location.reload() }}><Link href="/Awards">Awards</Link></button>
                        <button className="keyword-button" onClick={() => { window.location.reload() }}><Link href="/Metagallery">Metagallery</Link></button>
                        <button className="keyword-button" onClick={() => { window.location.reload() }}><Link href="/Residential">Residential</Link></button>
                    </div>
                </div>
            )}
            {isMoreVisible && (
                <div className="more-modal">
                    <Link href="/kr" legacyBehavior>
                        <a className="more-logo-button" onClick={() => { window.location.reload() }}>
                            <span className="more-logo-text">heerim</span>
                            <span className="more-sub-text">Architects & Planners</span>
                        </a>
                    </Link>
                    <div className="close-button-container">
                        <button onClick={closeMore} className="more-close-button">Close X</button>
                    </div>
                    <div className="about-us-button">
                        <div className="main-button-container">
                            <button className="main-button">
                                <Link href="/IR" >ABOUT US</Link>
                            </button>
                            <div className="sub-buttons">
                                <button className="sub-button">
                                    <Link href="/about-us/corporate-profile" >Corporate Profile</Link>
                                </button>
                                <button className="sub-button">
                                    <Link href="/about-us/leadership" >Leadership</Link>
                                </button>
                                <button className="sub-button">
                                    <Link href="/about-us/News" >News</Link>
                                </button>
                                <button className="sub-button">
                                    <Link href="/about-us/PR" >PR </Link>
                                </button>
                                <button className="sub-button">
                                    <Link href="/about-us/Recruit" >Recruit</Link>
                                </button>
                            </div>
                        </div>
                        <div className="main-button-container">
                            <button className="main-button">
                                <Link href="/IR" >PROJECTS</Link>
                            </button>
                            <div className="sub-buttons">
                                <button className="sub-button">
                                    <Link href="/projects/Selected Works">Selected Works</Link>
                                </button>
                                <button className="sub-button">
                                    <Link href="/projects/All" >All</Link>
                                </button>
                                <button className="sub-button">
                                    <Link href="/projects/DESIGN" >DESIGN</Link>
                                </button>
                                <button className="sub-button">
                                    <Link href="/projects/CM" >CM</Link>
                                </button>
                            </div>
                        </div>
                        <div className="main-button-container">
                            <button className="main-button">
                                <Link href="/IR" >EXPERTISE</Link>
                            </button>
                            <div className="sub-buttons">
                                <button className="sub-button">
                                    <Link href="/EXPERTISE/Services" >Services</Link>
                                </button>
                                <button className="sub-button">
                                    <Link href="/EXPERTISE/Markets" >Markets</Link>
                                </button>
                                <button className="sub-button">
                                    <Link href="/EXPERTISE/Research" >Research & Idea</Link>
                                </button>
                                <button className="sub-button">
                                    <Link href="/EXPERTISE/VR" >VR/AR</Link>
                                </button>
                            </div>
                        </div>
                        <div className="main-button-container">
                            <button className="main-button">
                                <Link href="/IR" >IR</Link>
                            </button>
                            <div className="sub-buttons">
                                <button className="sub-button">
                                    <Link href="/https://www.heerim.com/en/ir/finance.php" >Finance</Link>
                                </button>
                                <button className="sub-button">
                                    <Link href="/IR/Analyst_Report" >Analyst Report</Link>
                                </button>
                                <button className="sub-button">
                                    <Link href="/IR/IR_Material" >IR Material</Link>
                                </button>
                            </div>
                        </div>
                        <div className="main-button-container">
                            <button className="main-button">
                                <Link href="/IR" >CONTACT</Link>
                            </button>
                        </div>
                    </div>
                    {/* 인스타그램 버튼 */}
                    <div className="icon-button-container">
                        {/* 인스타그램 버튼 */}
                        <a className="icon-button" href="https://www.instagram.com/heerim_architects_official/" target="_blank" rel="noopener noreferrer">
                            <img src="/icon/instagram.svg" alt="Instagram Icon" width="40" height="40" />
                        </a>
                        {/* 유튜브 버튼 */}
                        <a className="icon-button" style={{ marginLeft: "35px" }} href="https://www.youtube.com/channel/UCPwQIrf17KFyqvXeq8NVY_Q" target="_blank" rel="noopener noreferrer">
                            <img src="/icon/youtube.svg" alt="YouTube Icon" width="40" height="40" />
                        </a>
                        {/* 핀터레스트 버튼 */}
                        <a className="icon-button" style={{ marginLeft: "35px" }} href="https://www.pinterest.co.kr/heerim_architects_official/" target="_blank" rel="noopener noreferrer">
                            <img src="/icon/pinterest.svg" alt="Pinterest Icon" width="40" height="40" />
                        </a>
                        {/* 디자인 지도 버튼 */}
                        <a className="icon-button" style={{ marginLeft: "35px" }} href="https://www.google.com/maps/d/viewer?mid=1ZYdnpbxRgC5-zu5GpoOU8zd_E-v24aXT&ll=13.728397502246512%2C71.13522019999999&z=3" target="_blank" rel="noopener noreferrer">
                            <div className="location-button">
                                <img src="/icon/location.svg" alt="Location Icon" />
                                <a> Design map </a>
                            </div>
                        </a>
                        {/* CM 지도 버튼 */}
                        <a className="icon-button" style={{ marginLeft: "10px" }} href="https://www.google.com/maps/d/viewer?mid=1aWEovb5OXGAdqH_D-QojV6l96tLYT2S0&ll=24.118227897040363%2C55.94565490000001&z=3" target="_blank" rel="noopener noreferrer">
                            <div className="location-button" >
                                <img src="/icon/location.svg" alt="Location Icon" />
                                <a className="location-description"> CM map </a>
                            </div>
                        </a>
                    </div>
                    {/* 녹색 모달 내용 */}
                </div>
            )}
        </header >
    );
};

export default Header;
