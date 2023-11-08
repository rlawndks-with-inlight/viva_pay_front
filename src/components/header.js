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
padding: none;
margin: none;
background-color: ${(props) => (props.activeSection === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.2)')};
@media only screen and (max-width: 1300px), (max-height: 800px) {
    background-color: rgba(0, 0, 0, 0.2);
}

`
const LogoButton = styled.button`
  text-align: center;
  text-decoration: none;
  border: none;
  cursor: pointer;
  display: flex;
  margin-left: 10%;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
  background: url('/image/Logo.png');
  width: 17em; 
  height: 7em;
  background-size: cover;
@media only screen and (max-width: 500px) {
    width: 10em;
    height: 4em;
}
`;
const HeaderButtons = styled.div` /* 헤더의 오른쪽 스타일 */
margin-top: 0.5em;
margin-right: 2em ;
display: flex;
gap: 0.4em;
font-size: 1.5em;/* 한영 버튼 크기 */
align-items: center;
z-index: 3;
  a{ /* 한영 버튼 */
    font-weight: bold;
    text-decoration: none;
    color: gray;
    cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
      &.active{
        color: ${(props) => (props.activeSection === 0 ? 'white' : 'black')};
        text-decoration: underline;
      }
  }
@media only screen and (max-width: 500px) {
    top: 1.2%;
    font-size: 4vw;
}
`
const More = styled.button` /* 더보기 버튼 */
background: transparent;
border: none; 
font-size: 1em;
cursor: pointer;
color: white;
`
const MoreContainer = styled.div` /* more 모달 스타일링 */
position: fixed;
top: 0%;
left: 0%;
width: 100%;
height: 100%;
background-color: rgb(0, 104, 232);; /* 파란색 배경 추가 */
z-index: 1;
`
const MoreClose = styled.button` /* more close 버튼 */
position: fixed;
top: 4em; /* 원하는 위치로 조정하세요 */
right: 8em; /* 원하는 위치로 조정하세요 */
color: white;
background: transparent; /* 투명 배경 추가 */
border: none;
cursor: pointer;
font-size: 1.5em;
font-weight: bold;
z-index: 9999;
@media only screen and (max-width: 1400px) {
    top: 2.4em;
    right: 2em;
}
`
const TotalButtonContainer = styled.div` /* 더보기 내용 전체 버튼 */
margin-top: 7vh;
margin-left: 8vw;
display: flex;
`
const TitleButton = styled.button`
display: block; /* 메인 버튼을 블록 레벨 요소로 변경 */
font-size: 2.7vw;
font-weight: bold;
text-align: left; /* 텍스트 중앙 정렬 */
text-decoration: none;
color: white; /* 메인 버튼 텍스트 색상을 흰색으로 설정 */
background-color: transparent; /* 배경을 투명하게 설정 */
padding: 5em 2em 0 0;  /* 버튼 패딩 조절 */
border: none; /* 버튼 테두리 제거 */
  a{
    color: white;
    text-decoration: none;
  }
@media only screen and (max-width: 1400px) {
    font-size: 3vw;
    padding: 5em 1em 0 0;  /* 버튼 패딩 조절 */
}
@media only screen and (max-width: 500px) {
    font-size: 1em;
    padding: 5em 0.4em 0 0; 
}
`
const SubButton = styled.button`
display: flex;
flex-direction: column; /* 서브 버튼을 세로로 정렬 */
align-items: flex-start; /* 왼쪽 정렬 */
border: none;
padding: 0;
margin-top: 1em;
font-size: 1.2em;
background: transparent; /* 투명 배경 추가 */
text-align: left; /* 텍스트 왼쪽 정렬 */
@media only screen and (max-width: 500px) {
    font-size: 0.8em;
}
  a{
    text-decoration: none;
    margin-bottom: 1.5em;
    color: white; /* 서브 버튼 텍스트 색상 설정 */
    &:hover{
      color: white; /* 호버 시 밑줄의 색상을 흰색으로 변경 */
      text-decoration: underline; /* 호버 시 밑줄 표시 */
    }
  }
`
const MoreIconButtonContainer = styled.div`
position: fixed;
bottom: 10%;
left: 10%;
display: flex; /* 더보기 아래쪽 아이콘 버튼 스타일*/
text-align: center;
@media only screen and (max-width: 400px) {
    left: 0%;
}
`
const MoreIconButton = styled.a`
transition: opacity 0.3s ease; /* 호버 시 투명도 전환 애니메이션 */
text-decoration: none; /*링크 밑줄 제거*/
  img{
    width: 40px;
    height: 40px;
    &:hover{
      opacity: 0.7; /* 호버 시 투명도를 0.7로 변경 (1이 원래 투명도) */
}
  }
@media only screen and (max-width: 650px) {
    img{
    width: 25px;
    height: 25px;
    &:hover{
      opacity: 0.7; /* 호버 시 투명도를 0.7로 변경 (1이 원래 투명도) */
}
  }
}
`
const LocationButton = styled.div`
display: flex; /* 더보기 아래쪽 map 버튼 스타일*/
flex-direction: row;
background-color: rgb(255, 194, 0); /* 회색 배경 추가 */
border-radius: 50px; /* 회색 배경과 함께 버튼에 radius 추가 */
padding: 10px;
cursor: pointer;
  img{
    width: 25px;
    height: 25px;
  }
  a{
    font-size: 20px;
    margin: 0 10px 0 10px;
    color: black;
  }
  &:hover{
    opacity: 0.7; /* 호버 시 투명도를 0.7로 변경 (1이 원래 투명도) */
}
@media only screen and (max-width: 650px) {
padding: 7px;
  img{
    width: 15px;
    height: 15px;
  }
  a{
    font-size: 12px;
    color: black;
  }
  &:hover{
    opacity: 0.7; /* 호버 시 투명도를 0.7로 변경 (1이 원래 투명도) */
}
}
`

const MTotalButtonContainer = styled.ul`
text-decoration: none;
margin-top : 10em;
`
const MDropDownButton = styled.li`
background-color: transparent;
cursor: pointer;
    color: white;
list-style: none;
a{
    text-decoration: none;
    color: white;
}
`
const MDropDownContent = styled.ul`
width: 100%;
background-color: white;
list-style: none;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  margin: 0;
  a {
    text-decoration: none;
    display: block;
    color: gray;
  }
`
const Header = ({ activeSection, isMoreClicked, handleMoreButtonClick, setIsMoreClicked, closeMore, updateHeaderVisibility }) => {
    const router = useRouter();
    const { lang = 'kr' } = router.query;
    const [isVisible, setIsVisible] = useState(false);
    const [isScrollingDisabled, setScrollingDisabled] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // State for mobile screen
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0); // 초기 화면 너비 설정
    const [isIRDropdownVisible, setIRDropdownVisible] = useState(false);
    const [isExpertiseDropdownVisible, setExpertiseDropdownVisible] = useState(false);
    const [isProjectDropdownVisible, setProjectDropdownVisible] = useState(false);
    const [isAboutUsDropdownVisible, setAboutUsDropdownVisible] = useState(false);

    const toggleIRDropdown = () => {
        setIRDropdownVisible(!isIRDropdownVisible);
        setExpertiseDropdownVisible(false);
        setProjectDropdownVisible(false);
        setAboutUsDropdownVisible(false);
    };

    const toggleExpertiseDropdown = () => {
        setExpertiseDropdownVisible(!isExpertiseDropdownVisible);
        setIRDropdownVisible(false);
        setProjectDropdownVisible(false);
        setAboutUsDropdownVisible(false);
    };

    const toggleProjectDropdown = () => {
        setProjectDropdownVisible(!isProjectDropdownVisible);
        setIRDropdownVisible(false);
        setExpertiseDropdownVisible(false);
        setAboutUsDropdownVisible(false);
    };

    const toggleAboutUsDropdown = () => {
        setAboutUsDropdownVisible(!isAboutUsDropdownVisible);
        setIRDropdownVisible(false);
        setExpertiseDropdownVisible(false);
        setProjectDropdownVisible(false);
    };


    useEffect(() => {
        // 스크립트 로딩 및 언어 확인 이후에 화면 크기 업데이트 리스너 추가
        if (!loading) {
            // 함수를 선언하여 화면 크기를 업데이트하는 로직
            const updateWindowDimensions = () => {
                setWindowWidth(window.innerWidth);
            };

            // 초기화 단계에서 한 번 실행하고, 화면 크기가 변경될 때마다 실행
            updateWindowDimensions();
            window.addEventListener("resize", updateWindowDimensions);
        }

        // 이 컴포넌트가 언마운트될 때 이벤트 리스너 정리
        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
        };
    }, [activeSection, loading, windowWidth]);

    const updateWindowDimensions = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        setIsVisible(true);

        // Check if the screen is mobile when the component mounts
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        checkIsMobile(); // Check on component mount

        // Update the mobile state when the window is resized
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile); // Remove the event listener on unmount
        };
    }, []);


    useEffect(() => {
        setIsVisible(true);

        const handleScroll = () => {
            if (isMoreClicked && isScrollingDisabled) {
                // 스크롤을 비활성화합니다.
                window.scrollTo(0, 0); // 페이지 맨 위로 스크롤합니다.
            }
        };

        if (isMoreClicked && isScrollingDisabled) {
            // 이후 스크롤 이벤트를 모니터링합니다.
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMoreClicked, isScrollingDisabled]);


    useEffect(() => {
        setIsVisible(true);
    }, []);

    // 더보기 모달 표시 함수
    const showMore = () => {
        setIsMoreClicked(true);
        setScrollingDisabled(true);
    };


    return (
        <Headerwrappers activeSection={activeSection} className={`${isMoreClicked ? 'showMore' : ''}`} >
            <Link href="/" legacyBehavior>
                <LogoButton onClick={() => { window.location.reload() }}></LogoButton>
            </Link>
            <HeaderButtons activeSection={activeSection}>
                {isMoreClicked ? null : ( // 녹색 섹션이 활성화되면 버튼을 숨김
                    <>
                        <Link href="/en" legacyBehavior >
                            <a className={lang === "en" ? "active" : ""}>EN</a>
                        </Link>
                        <Link href="/kr" legacyBehavior>
                            <a className={lang === "kr" ? "active" : ""}>KR</a>
                        </Link>
                        <More onClick={handleMoreButtonClick}>
                            <img src="/icon/more.png" alt="More Icon" width="40" height="40" />
                        </More>
                    </>
                )}
            </HeaderButtons>
            {isMoreClicked && (
                <MoreContainer>
                    <MoreClose onClick={closeMore}>Close X</MoreClose>
                    {isMobile ? (
                        <div>
                            <MTotalButtonContainer>
                                <MDropDownButton onClick={toggleAboutUsDropdown}>
                                    <p>ABOUT US</p>
                                    <MDropDownContent isVisible={isAboutUsDropdownVisible}>
                                        <li>
                                            <a href="/about-us/corporate profile" onClick={(e) => e.preventDefault()} >Corporate Profile</a>
                                            <a href="/about-us/leadership">Leadership</a>
                                            <a href="/about-us/news">News</a>
                                            <a href="/about-us/pr">PR </a>
                                            <a href="/about-us/recruit" >Recruit</a>
                                        </li>
                                    </MDropDownContent>
                                </MDropDownButton>
                                <MDropDownButton onClick={toggleProjectDropdown}>
                                    <p>PROJECTS</p>
                                    <MDropDownContent isVisible={isProjectDropdownVisible}>
                                        <li>
                                            <a href="/projects/selected works" onClick={(e) => e.preventDefault()} >Selected Works</a>
                                        </li>
                                        <li>
                                            <a href="/projects/all">All</a>
                                        </li>
                                        <li>
                                            <a href="/projects/design">DESIGN</a>
                                        </li>
                                        <li>
                                            <a href="/projects/cm">CM</a>
                                        </li>
                                    </MDropDownContent>
                                </MDropDownButton>
                                <MDropDownButton onClick={toggleExpertiseDropdown}>
                                    <p>EXPERTISE</p>
                                    <MDropDownContent isVisible={isExpertiseDropdownVisible}>
                                        <li>
                                            <a href="/expertise/services" onClick={(e) => e.preventDefault()} >Services</a>
                                            <a href="/expertise/markets">Markets</a>
                                            <a href="/expertise/research" >Research & Idea</a>
                                            <a href="/expertise/vr" >VR/AR</a>
                                        </li>
                                    </MDropDownContent>
                                </MDropDownButton>
                                <MDropDownButton onClick={toggleIRDropdown}>
                                    <p>IR</p>
                                    <MDropDownContent isVisible={isIRDropdownVisible}>
                                        <li>
                                            <a href="/ir/finance" onClick={(e) => e.preventDefault()}>Finance</a>
                                            <a href="/ir/analyst report" >Analyst Report</a>
                                            <a href="/ir/ir material"  >IR Material</a>
                                        </li>
                                    </MDropDownContent>
                                </MDropDownButton>
                                <MDropDownButton>
                                    <a href="/contact" >CONTACT</a>
                                </MDropDownButton>
                            </MTotalButtonContainer>
                            <MoreIconButtonContainer>
                                {/* 인스타그램 버튼 */}
                                <MoreIconButton>
                                    <Link href="https://www.instagram.com/heerim_architects_official/" target="_blank" rel="noopener noreferrer">
                                        <img src="/icon/instagram.svg" alt="Instagram Icon" />
                                    </Link>
                                    {/* 유튜브 버튼 */}
                                    <Link style={{ marginLeft: "3vw" }} href="https://www.youtube.com/channel/UCPwQIrf17KFyqvXeq8NVY_Q" target="_blank" rel="noopener noreferrer">
                                        <img src="/icon/youtube.svg" alt="YouTube Icon" />
                                    </Link>
                                    {/* 핀터레스트 버튼 */}
                                    <Link style={{ marginLeft: "3vw" }} href="https://www.pinterest.co.kr/heerim_architects_official/" target="_blank" rel="noopener noreferrer">
                                        <img src="/icon/pinterest.svg" alt="Pinterest Icon" />
                                    </Link>
                                </MoreIconButton>
                                {/* 디자인 지도 버튼 */}
                                <LocationButton style={{ marginLeft: "3vw" }} href="https://www.google.com/maps/d/viewer?mid=1ZYdnpbxRgC5-zu5GpoOU8zd_E-v24aXT&ll=13.728397502246512%2C71.13522019999999&z=3" target="_blank" rel="noopener noreferrer">
                                    <img src="/icon/location.svg" alt="Location Icon" />
                                    <a> Design map </a>
                                </LocationButton>
                                {/* CM 지도 버튼 */}
                                <LocationButton style={{ marginLeft: "3vw" }} href="https://www.google.com/maps/d/viewer?mid=1aWEovb5OXGAdqH_D-QojV6l96tLYT2S0&ll=24.118227897040363%2C55.94565490000001&z=3" target="_blank" rel="noopener noreferrer">
                                    <img src="/icon/location.svg" alt="Location Icon" />
                                    <a> CM map </a>
                                </LocationButton>
                            </MoreIconButtonContainer>
                        </div>
                    ) : (
                        <div>
                            <TotalButtonContainer>
                                <div >
                                    <TitleButton>
                                        <Link href="/ABOUT US" >ABOUT US</Link>
                                    </TitleButton>
                                    <SubButton>
                                        <Link href="/about-us/corporate-profile" >Corporate Profile</Link>
                                        <Link href="/about-us/leadership" >Leadership</Link>
                                        <Link href="/about-us/news" >News</Link>
                                        <Link href="/about-us/pr" >PR </Link>
                                        <Link href="/about-us/recruit" >Recruit</Link>
                                    </SubButton>
                                </div>
                                <div >
                                    <TitleButton >
                                        <Link href="/projects" >PROJECTS</Link>
                                    </TitleButton>
                                    <SubButton >
                                        <Link href="/projects/selected works">Selected Works</Link>
                                        <Link href="/projects/all" >All</Link>
                                        <Link href="/projects/design" >DESIGN</Link>
                                        <Link href="/projects/cm" >CM</Link>
                                    </SubButton>
                                </div>
                                <div >
                                    <TitleButton>
                                        <Link href="/expertise" >EXPERTISE</Link>
                                    </TitleButton>
                                    <SubButton >
                                        <Link href="/expertise/services" >Services</Link>
                                        <Link href="/expertise/markets" >Markets</Link>
                                        <Link href="/expertise/research" >Research & Idea</Link>
                                        <Link href="/expertise/vr" >VR/AR</Link>
                                    </SubButton>
                                </div>
                                <div>
                                    <TitleButton>
                                        <Link href="/ir" >IR</Link>
                                    </TitleButton>
                                    <SubButton >
                                        <Link href="/ir/finance">Finance</Link>
                                        <Link href="/ir/analyst_report" >Analyst Report</Link>
                                        <Link href="/ir/ir_material" >IR Material</Link>
                                    </SubButton>
                                </div>
                                <div>
                                    <TitleButton>
                                        <Link href="/contact" >CONTACT</Link>
                                    </TitleButton>
                                </div>
                            </TotalButtonContainer>
                            <MoreIconButtonContainer>
                                {/* 인스타그램 버튼 */}
                                <MoreIconButton>
                                    <Link href="https://www.instagram.com/heerim_architects_official/" target="_blank" rel="noopener noreferrer">
                                        <img src="/icon/instagram.svg" alt="Instagram Icon" />
                                    </Link>
                                    {/* 유튜브 버튼 */}
                                    <Link style={{ marginLeft: "3vw" }} href="https://www.youtube.com/channel/UCPwQIrf17KFyqvXeq8NVY_Q" target="_blank" rel="noopener noreferrer">
                                        <img src="/icon/youtube.svg" alt="YouTube Icon" />
                                    </Link>
                                    {/* 핀터레스트 버튼 */}
                                    <Link style={{ marginLeft: "3vw" }} href="https://www.pinterest.co.kr/heerim_architects_official/" target="_blank" rel="noopener noreferrer">
                                        <img src="/icon/pinterest.svg" alt="Pinterest Icon" />
                                    </Link>
                                </MoreIconButton>
                                {/* 디자인 지도 버튼 */}
                                <LocationButton style={{ marginLeft: "3vw" }} href="https://www.google.com/maps/d/viewer?mid=1ZYdnpbxRgC5-zu5GpoOU8zd_E-v24aXT&ll=13.728397502246512%2C71.13522019999999&z=3" target="_blank" rel="noopener noreferrer">
                                    <img src="/icon/location.svg" alt="Location Icon" />
                                    <a> Design map </a>
                                </LocationButton>
                                {/* CM 지도 버튼 */}
                                <LocationButton style={{ marginLeft: "3vw" }} href="https://www.google.com/maps/d/viewer?mid=1aWEovb5OXGAdqH_D-QojV6l96tLYT2S0&ll=24.118227897040363%2C55.94565490000001&z=3" target="_blank" rel="noopener noreferrer">
                                    <img src="/icon/location.svg" alt="Location Icon" />
                                    <a> CM map </a>
                                </LocationButton>
                            </MoreIconButtonContainer>
                        </div>
                    )}
                </MoreContainer>
            )}
        </Headerwrappers >
    );
};

export default Header;
