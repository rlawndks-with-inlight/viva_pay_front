// components/Header.js
import { preventDefault } from '@fullcalendar/common';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Headerwrappers = styled.header`
position: fixed;
top: ${props => props.showHeader == 1 ? '0' : '-50px'};
opacity: ${props => props.showHeader == 1 ? '1' : '0'};
cursor: ${props => props.showHeader == 1 ? '' : 'pointer'};
left: 0;
right: 0;
z-index: 1; 
display: flex;
padding: none;
margin: none;
transition: 0.5s;
background-color: ${(props) => (props.activeSection === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.2)')};
@media only screen and (max-width: 1280px), (max-height: 800px) {
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.2);
}
`
const BlueStick = styled.span`
position: absolute;
left: 11%;
height: 250px;
padding:"0";
border-left: 10px solid rgb(0, 104, 232); 
/* rgb(0, 104, 232) 파랑색 코드 10px solid rgb(255, 194, 0)*/
display: ${(props) => (props.activeSection === 0 ? '' : 'none')};
/* 모바일 화면에서 숨김 */
  @media only screen and (max-width: 1280px), (max-height: 800px) {
    display: none;
  }
`
const LogoButton = styled.button`
position: absolute;
top: 30%;
left: 14.5%;
  border: none;
  cursor: pointer;
  z-index: 9999;
  background: url('/image/Logo.svg');
  width: 19em; 
  height: 3em;
  background-size: cover;
@media only screen and (max-width: 700px) {
top: 45%;
left: 13%;
  width: 10.8em; 
  height: 1.7em;
}
`
const HeaderButtons = styled.div` /* 헤더의 오른쪽 스타일 */
display: flex;
margin-top: 1.1em;
margin-left: 74%;
font-size: 24px;/* 한영 버튼 크기 */
z-index: 3;
  a{ /* 한영 버튼 */
margin-right: 1.2em;
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
@media only screen and (max-width: 1280px) {
}
@media only screen and (max-width: 700px) {
    margin-left: 70%;
    font-size: 1em;
    margin-top: 1.5em;
    a{
        margin-right: 0.5em;
    }
}
`
const More = styled.button` /* 더보기 버튼 */
border: 1px solid transparent;
background: transparent;
border: none; 
padding: 0;
margin: 0;
font-size: 1em;
cursor: pointer;
color: white;
  img{
    width: 35px;
    height: 35px;
  }
@media only screen and (max-width: 700px) {
  img{
    width: 22px;
    height: 22px;
  }
}
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
margin-top: 0.45em;
margin-left: 70%;
color: white;
background: transparent; /* 투명 배경 추가 */
border: none;
cursor: pointer;
font-size: 24px;
font-weight: bold;
z-index: 9999;
@media only screen and (max-width: 700px) {
    font-size: 1em;
margin-top: 0.4em;
margin-left: 30%;
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
padding: 4em 2em 0 0;  /* 버튼 패딩 조절 */
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
@media only screen and (max-height: 620px) {
    padding-top: 1.5em;
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
@media only screen and (max-height: 620px) {
    margin-top: 0.4em;
    a{
        margin-bottom: 0.7em;
    }
}
`
const MoreIconButtonContainer = styled.div`
position: fixed;
bottom: 10%;
left: 10%;
display: flex; /* 더보기 아래쪽 아이콘 버튼 스타일*/
text-align: center;
@media only screen and (max-width: 420px) {
    left: 2%;
}
@media only screen and (max-height: 850px) {
bottom: 2%;
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
  }
}
@media only screen and (max-width: 400px) {
    img{
    width: 5vw;
    height: 5vw;
  }
}
@media only screen and (max-height: 300px){
    img{
    width: 1.5em;
    height: 1.5em;
  }
}
`
const LocationButton = styled.div`
display: flex; /* 더보기 아래쪽 map 버튼 스타일*/
flex-direction: row;
background-color: rgb(255, 194, 0); /* 노란색 배경 추가 */
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
  }
}
@media only screen and (max-width: 400px) {
  img{
    width: 4vw;
    height: 4vw;
  }
  a{
    font-size: 3vw;
  }
}
@media only screen and (max-height: 300px) {
  img{
    margin-top: 2px;
    width: 1em;
    height: 1em;
  }
  a{
    font-size: 1em;
  }
}
`

const MTotalButtonContainer = styled.ul`
text-decoration: none;
margin-top : 6em;
padding: 0;
@media only screen and (max-height: 430px) {
margin-top : 4em;
}
`
const MDropDownButton = styled.li`
border-top: 1px solid white;
background-color: transparent;
cursor: pointer;
    color: white;
list-style: none;
padding-top: 0.8em;
a{
    font-size: 1.3em;
    padding-left: 1em;
    text-decoration: none;
    color: white;
}
p{ /* aboutus,projects,expertise,ir 디자인 */
    margin: 0;
    padding-left: 1em;
    font-size: 1.3em;        
    padding-top: 0;
    padding-bottom: 0.7em;
}
@media only screen and (max-height: 430px) {
padding-top: 0.3em;
    a{
        font-size: 0.8em;
    }
    p{ /* aboutus,projects,expertise,ir 디자인 */
        margin: 0;
        padding-left: 1em;
        font-size: 0.8em;
        padding-bottom: 0.3em;
    }
}
`
const MDropDownContent = styled.ul`
width: 100%;
background-color: white;
list-style: none;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  padding: 0;
  a {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    font-size: 1.1em;
    display: block;
    color: gray;
    &:hover{
        background-color: rgb(255, 194, 0); /* 노란색 배경 추가 */
      }
  }
@media only screen and (max-height: 430px) {
    a{
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    font-size: 0.6em;
    display: block;
    color: gray;
    &:hover{
        background-color: rgb(255, 194, 0); /* 노란색 배경 추가 */
      }
    }
}
`
const Header = (props) => {
    const { activeSection, showHeader, setShowHeader, scrollY } = props;
    const router = useRouter();
    const { lang = 'kr' } = router.query;
    const [isVisible, setIsVisible] = useState(false);
    const [isScrollingDisabled, setScrollingDisabled] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // State for mobile screen
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0); // 초기 화면 너비 설정
    const [isAboutUsDropdownVisible, setAboutUsDropdownVisible] = useState(false);
    const [isProjectDropdownVisible, setProjectDropdownVisible] = useState(false);
    const [isExpertiseDropdownVisible, setExpertiseDropdownVisible] = useState(false);
    const [isIRDropdownVisible, setIRDropdownVisible] = useState(false);
    const [showMore, setShowMore] = useState(false);

    // More 버튼 클릭 시
    const handleMoreButtonClick = () => {
        setShowMore(true);
      
  // body 요소에 스크롤을 숨김
  document.body.style.overflow = 'hidden';
    };
    
    // Close 버튼 클릭 시
    const handleCloseButtonClick = () => {
        setShowMore(false);
      
  // body 요소의 스크롤을 다시 보이게 함
  document.body.style.overflow = 'auto';
    };
    // 드롭다운 보이게 하는 기능
    const toggleDropdown = (dropdown) => {
        setAboutUsDropdownVisible(false);
        setProjectDropdownVisible(false);
        setExpertiseDropdownVisible(false);
        setIRDropdownVisible(false);
        switch (dropdown) {
            case 'aboutUs':
                setAboutUsDropdownVisible(!isAboutUsDropdownVisible);
                break;
            case 'projects':
                setProjectDropdownVisible(!isProjectDropdownVisible);
                break;
            case 'expertise':
                setExpertiseDropdownVisible(!isExpertiseDropdownVisible);
                break;
            case 'ir':
                setIRDropdownVisible(!isIRDropdownVisible);
                break;
            default:
                break;
        }
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

        // 모바일 화면 확인
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 600 && window.innerHeight >= 300);
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
    }, []);

    return (
        <Headerwrappers activeSection={activeSection} className={`${showMore ? 'showMore' : ''}`} showHeader={showHeader}
            onMouseOver={() => {
                setShowHeader(true)
            }}
            onMouseLeave={() => {
                if (scrollY != 0) {
                    setShowHeader(false)
                }
            }}
        >
            {isMobile ? null : <BlueStick activeSection={activeSection} />}
            <LogoButton activeSection={activeSection} onClick={() => { window.location.reload() }}></LogoButton>
            <HeaderButtons activeSection={activeSection}>
                {showMore ? (
                    <MoreClose onClick={handleCloseButtonClick}>CloseX</MoreClose>
                ) : (
                    <>
                        <Link href="/en" legacyBehavior>
                            <a className={lang === 'en' ? 'active' : ''}>EN</a>
                        </Link>
                        <Link href="/kr" legacyBehavior>
                            <a className={lang === 'kr' ? 'active' : ''}>KR</a>
                        </Link>
                        <div style={{ marginTop: '' }}>
                            <More onClick={handleMoreButtonClick}>
                                <img src="/icon/more.png" alt="More Icon" />
                            </More>
                        </div>
                    </>
                )}
            </HeaderButtons>
            {showMore && (
                <MoreContainer>
                    {isMobile ? (
                        <div>
                            <div>
                                <MTotalButtonContainer>
                                    <MDropDownButton onClick={() => toggleDropdown('aboutUs')}>
                                        <p>ABOUT US {isAboutUsDropdownVisible ? '▲' : '▼'} </p>
                                        <MDropDownContent isVisible={isAboutUsDropdownVisible}>
                                            <li>
                                                <a href="/about-us/corporate profile" >Corporate Profile</a>
                                                <a href="/about-us/leadership">Leadership</a>
                                                <a href="/about-us/news">News</a>
                                                <a href="/about-us/pr">PR </a>
                                                <a href="/about-us/recruit" >Recruit</a>
                                            </li>
                                        </MDropDownContent>
                                    </MDropDownButton>
                                    <MDropDownButton onClick={() => toggleDropdown('projects')}>
                                        <p>PROJECTS {isProjectDropdownVisible ? '▲' : '▼'} </p>
                                        <MDropDownContent isVisible={isProjectDropdownVisible}>
                                            <li>
                                                <a href="/projects/selected works">Selected Works</a>
                                                <a href="/projects/all">All</a>
                                                <a href="/projects/design">DESIGN</a>
                                                <a href="/projects/cm">CM</a>
                                            </li>
                                        </MDropDownContent>
                                    </MDropDownButton>
                                    <MDropDownButton onClick={() => toggleDropdown('expertise')}>
                                        <p>EXPERTISE {isExpertiseDropdownVisible ? '▲' : '▼'} </p>
                                        <MDropDownContent isVisible={isExpertiseDropdownVisible}>
                                            <li>
                                                <a href="/expertise/services">Services</a>
                                                <a href="/expertise/markets">Markets</a>
                                                <a href="/expertise/research" >Research & Idea</a>
                                                <a href="/expertise/vr" >VR/AR</a>
                                            </li>
                                        </MDropDownContent>
                                    </MDropDownButton>
                                    <MDropDownButton onClick={() => toggleDropdown('ir')}>
                                        <p>IR {isIRDropdownVisible ? '▲' : '▼'} </p>
                                        <MDropDownContent isVisible={isIRDropdownVisible}>
                                            <li>
                                                <a href="/ir/finance">Finance</a>
                                                <a href="/ir/analyst report" >Analyst Report</a>
                                                <a href="/ir/ir material"  >IR Material</a>
                                            </li>
                                        </MDropDownContent>
                                    </MDropDownButton>
                                    <MDropDownButton >
                                        <a href="/contact">CONTACT</a>
                                    </MDropDownButton>
                                </MTotalButtonContainer>
                            </div>
                            <div>
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
