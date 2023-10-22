// components/Header.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Headerwrappers = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1; 
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`


const Header = () => {
    const router = useRouter();
    const { lang = 'kr' } = router.query;
    const [isVisible, setIsVisible] = useState(false);
    const [isSection1Green, setIsSection1Green] = useState(false);
    const [isScrollingDisabled, setScrollingDisabled] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const handleScroll = () => {
            if (isSection1Green && isScrollingDisabled) {
                // 스크롤을 비활성화합니다.
                window.scrollTo(0, 0); // 페이지 맨 위로 스크롤합니다.
            }
        };

        if (isSection1Green && isScrollingDisabled) {
            // 이후 스크롤 이벤트를 모니터링합니다.
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isSection1Green, isScrollingDisabled]);


    useEffect(() => {
        setIsVisible(true);
    }, []);

    // 더보기 모달 표시 함수
    const showMore = () => {
        setIsSection1Green(true);
        setScrollingDisabled(true);
        // 스크롤 비활성화
    };

    // 더보기 모달 닫기 함수
    const closeMore = () => {
        setIsSection1Green(false);
        setScrollingDisabled(false);
        // 스크롤 활성화
    };

    return (
        <Headerwrappers className={`${isSection1Green ? 'section1-green' : ''}`}>
            <Link href="/" legacyBehavior>
                <a className="logo-button" onClick={() => { window.location.reload() }}>
                    <span className="logo-text">heerim</span>
                    <span className="sub-text">Architects & Planners</span>
                </a>
            </Link>
            <div className="buttons">
                {isSection1Green ? null : ( // 녹색 섹션이 활성화되면 버튼을 숨김
                    <>
                        <Link href="/en" legacyBehavior>
                            <a className={lang === "en" ? "active" : ""}>EN</a>
                        </Link>
                        <Link href="/kr" legacyBehavior>
                            <a className={lang === "kr" ? "active" : ""}>KR</a>
                        </Link>
                        <button onClick={showMore}>
                            <img src="/icon/more.png" alt="More Icon" width="40" height="40" />
                        </button>
                    </>
                )}
                </div>
            {isSection1Green && (
                <div className="more-container">
                    <div className="close-button-container">
                        <button onClick={closeMore} className="more-close-button">Close X</button>
                    </div>
                    <div className="about-us-button" style={{ marginRight: "2" }}>
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
                </div>
            )}
        </Headerwrappers >
    );
};

export default Header;
