// components/Header.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

const skewIn = keyframes`
0%{
  width: 0%;
  opacity: 0;
  transform: skewX(0deg);
}
100%{
  width: calc(25%+2px);
  opacity: 1;
  transform: skewX(45deg);
}
`
const skewOut = keyframes` /* 왜 이건 적용 안됨? */
0%{
  width: calc(25%+2px);
  opacity: 1;
  transform: skewX(45deg);
}
100%{
  width: 0%;
  opacity: 0;
  transform: skewX(0deg);
}
`
const rotateLeft = keyframes`
0%{
  transform: rotate(180deg);
}
100% {
  transform: rotate(0deg);
}
`
const rotateRight = keyframes`
0%{
  transform: rotate(0deg);
}
100% {
  transform: rotate(180deg);
}
`
const backgroundDown = keyframes`
0%, 50%{
  opacity: 0;
  transform: translateY(-30px);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`
const blinkAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`
const fadeInUp = keyframes`
0%, 50%{
  opacity: 0;
  transform: translateY(50px);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`
const fadeOutUp = keyframes`
0%{
  opacity: 1;
  transform: translateY(0);
}
100% {
  opacity: 0;
  transform: translateY(-50px);
}
`
const fadeInDown = keyframes`
0%, 50%{
  opacity: 0;
  transform: translateY(-50px);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`
const fadeOutDown = keyframes`
0%{
  opacity: 1;
  transform: translateY(0);
}
100% {
  opacity: 0;
  transform: translateY(50px);
}
`
const fadeRight = keyframes`
0%{
  opacity: 1;
  transform: translateX(0);
}
100% {
  opacity: 0;
  transform: translateX(50px);
}
`
const fadeLeft = keyframes`
0%, 50%{
  opacity: 0;
  transform: translateX(30px);
}
100% {
  opacity: 1;
  transform: translateX(0);
}
`
const Headerwrappers = styled.header`
position: fixed;
height: 80px;
top: ${props => props.showHeader == 1 ? '0' : '-50px'};
opacity: ${props => props.showHeader == 1 ? '1' : '0'};
cursor: ${props => props.showHeader == 1 ? '' : 'pointer'};
left: 0;
right: 0;
z-index: 1; 
transition: 0.5s;
background-color: ${(props) => (props.activeSection === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.2)')};
@media only screen and (max-width: 1280px), (max-height: 800px) {
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.2);
}
`
const BlueStick = styled.span`
position: absolute;
top: 0;
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
const LogoButton = styled.div`
position: relative;
  border: none;
  cursor: pointer;
  z-index: 9999;
  background: url('/image/Logo.svg');
  width: 19em; 
  height: 3em;
  background-size: cover;
  animation: ${props => props.BlinkAnimation ? css`${blinkAnimation} 1s ` : 'none'};
@media only screen and (max-width: 700px) {
top: 45%;
left: 13%;
  width: 10.8em; 
  height: 1.7em;
}
`
const HeaderButtons = styled.div` /* 헤더의 오른쪽 스타일 */
position: relative;
display: flex;
align-items: center;
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
const More = styled.div`
display: inline-block;
position: relative;
cursor: pointer;
width: 25px;
height: 25px;  
div{
  position: absolute;
  width: 5px;
  height: 5px;
  background: #fff;
  }
  div:nth-child(1) { top: 0; left: 0; 
  background-color: rgb(255, 194, 0);}
  div:nth-child(2) { top: 0; left: 10px; }
  div:nth-child(3) { top: 0; left: 20px; }
  div:nth-child(4) { top: 10px; left: 0; }
  div:nth-child(5) { top: 10px; left: 10px; }
  div:nth-child(6) { top: 10px; left: 20px; }
  div:nth-child(7) { top: 20px; left: 0; }
  div:nth-child(8) { top: 20px; left: 10px; }
  div:nth-child(9) { top: 20px; left: 20px; }
`
const MoreSection = styled.section`
span{
  width: ${props => props.AnimationEnabled ? '' : 'calc(25% + 2px)'};
	position:absolute; 
  transform: ${props => props.AnimationEnabled ? 'kewX(45deg)' : ''};
  animation: ${props => props.AnimationEnabled ? css`${skewOut} 0.5s` : css`${skewIn} 0.5s`};
	top:0px;
  background-color: rgb(0, 104, 232); /* 파란색 배경 추가 */
	height:100vh; 
}
    span:nth-child(0){left:-100%}
    span:nth-child(1){left:-75%}
    span:nth-child(2){left:-50%}
    span:nth-child(3){left:-25%}
    span:nth-child(4){left:0%}
    span:nth-child(5){left:25%}
    span:nth-child(6){left:50%}
    span:nth-child(7){left:75%}
    span:nth-child(8){left:100%}
    span:nth-child(9){left:125%}
`
const CloseMoreButton = styled.button` /* more close 버튼 */
border: none;
background-color: transparent;
justify-content: center;
padding: 0;
margin: 0;
strong{
  position:absolute;
  top: 10%;
  font-size:15px;
  color:#fff;
  animation: ${props => props.AnimationEnabled ? css`${fadeLeft} 2s` : css`${fadeRight} 0.5s`};
  em{
    display: inline-block;
  }
}
`
const CloseMore = styled.div`
display: inline-block;
position: relative;
cursor: pointer;
width: 25px;
height: 25px;
margin-left: 3.5em;
  animation: ${props => props.AnimationEnabled ? css`${rotateRight} 0.5s` : css`${rotateLeft} 0.5s`};
  div{
  position: absolute;
  width: 5px;
  height: 5px;
  background: #fff;
  }
  div:nth-child(1) { top: 0; left: 0; }
  div:nth-child(2) { top: 5px; left: 5px; }
  div:nth-child(3) { top: 0; left: 20px; }
  div:nth-child(4) { top: 15px; left: 5px; }
  div:nth-child(5) { top: 10px; left: 10px; }
  div:nth-child(6) { top: 5px; left: 15px; }
  div:nth-child(7) { top: 20px; left: 0px; }
  div:nth-child(8) { top: 15px; left: 15px; }
  div:nth-child(9) { top: 20px; left: 20px; }
`
const TotalButtonContainer = styled.div` /* 더보기 내용 전체 버튼 */
position: relative;
margin-top: 7vh;
margin-left: 8vw;
display: flex;
  animation: ${props => props.AnimationEnabled ? css`${fadeInDown} 2s ` : css`${fadeOutUp} 0.6s `};
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
  animation: ${props => props.AnimationEnabled ? css`${fadeInUp} 2s ` : css`${fadeOutDown} 0.6s `};
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
  const [BlinkAnimation, setBlinkAnimation] = useState(false)
  const [AnimationEnabled, setAnimationEnabled] = useState(false); // 상태 추가

  // More 버튼 클릭 시
  const handleMoreButtonClick = () => {
    setShowMore(true);
    setAnimationEnabled(true); // Animation 활성화
    setBlinkAnimation(true); // 로고 깜빡임 활성화

    setTimeout(() => {
      setBlinkAnimation(false); // close할때 애니메이션 작동하도록
    }, 1000); // 1초 후에 CloseAnimation을 false로 변경
  };
  // Close 버튼 클릭 시
  const handleCloseButtonClick = () => {
    setAnimationEnabled(false); // Animation 활성화
    setBlinkAnimation(true); // 로고 깜빡임 활성화

    document.body.style.overflow = 'auto'; // body 요소의 스크롤을 다시 보이게 함
    setTimeout(() => {
      setShowMore(false);
      setBlinkAnimation(false); // more할때 애니메이션 작동하도록
    }, 500); // 1초 후에 CloseAnimation을 false로 변경
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
      <div className="headerinner">
        <LogoButton
          BlinkAnimation={BlinkAnimation}
          showMore={showMore}
          activeSection={activeSection}
          onClick={() => { window.location.reload() }}>
        </LogoButton>
        <HeaderButtons activeSection={activeSection}>
          {showMore ? (
            <CloseMoreButton AnimationEnabled={AnimationEnabled}>
              <strong><em>Close</em></strong>
              <CloseMore AnimationEnabled={AnimationEnabled} onClick={handleCloseButtonClick}>
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              </CloseMore>
            </CloseMoreButton>
          ) : (
            <>
              <Link href="/en" legacyBehavior>
                <a className={lang === 'en' ? 'active' : ''}>EN</a>
              </Link>
              <Link href="/kr" legacyBehavior>
                <a className={lang === 'kr' ? 'active' : ''}>KR</a>
              </Link>
              <More onClick={handleMoreButtonClick}>
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              </More>
            </>
          )}
        </HeaderButtons>
      </div>
      {showMore && (
        <div>
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
            <MoreSection>
              <span AnimationEnabled={AnimationEnabled}></span>
              <span AnimationEnabled={AnimationEnabled}></span>
              <span AnimationEnabled={AnimationEnabled}></span>
              <span AnimationEnabled={AnimationEnabled}></span>
              <span AnimationEnabled={AnimationEnabled}></span>
              <span AnimationEnabled={AnimationEnabled}></span>
              <span AnimationEnabled={AnimationEnabled}></span>
              <span AnimationEnabled={AnimationEnabled}></span>
              <span AnimationEnabled={AnimationEnabled}></span>
              <div>
                <TotalButtonContainer AnimationEnabled={AnimationEnabled}>
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
                <MoreIconButtonContainer AnimationEnabled={AnimationEnabled}>
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
            </MoreSection>
          )}
        </div>
      )}
    </Headerwrappers >
  );
};

export default Header;
