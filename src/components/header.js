// components/Header.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { MobileDropdown } from './HeaderMobile/MobileDropDown';
import { MobileIconContainer } from './HeaderMobile/MobileIcon';
import { MenuButton } from './HeaderWeb/MainContents';
import { MagneticIcon } from './HeaderWeb/MagneticIconContainer';

const slideInLeft = keyframes`
0%{
  transform: translateX(100%);
}
100%{
  transform: translateX(0px);
}
`
const slideOutRight = keyframes`
0%{
  transform: translateX(0px);
}
100%{
  transform: translateX(100%);
}
`
const fadeIn = keyframes`
0%{
  opacity: 0;
}
100%{
  opacity: 1;
}
`
const skewIn = keyframes` // 배경 회전 애니메이션
0%{
  width: 0%;
  transform: skewX(0deg);
}
100% {
  width: calc(25%+2px);
  transform: skewX(45deg);
}
`
const skewOut = keyframes` // 배경 회전 애니메이션
0%{
  width: calc(25%+2px);
  transform: skewX(45deg);
}
100% {
  width: 0%;
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
const blinkAnimation = keyframes` // 로고 버튼의 깜빡임 애니메이션
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`
const fadeInUp = keyframes`
0%, 60%{
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
0%, 60%{
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
const fadeInLeft = keyframes`
0%, 50%{
  opacity: 0;
  transform: translateX(30px);
}
100% {
  visibility: visible;
  opacity: 1;
  transform: translateX(0);
}
`
const fadeOutRight = keyframes`
0%{
  opacity: 1;
  transform: translateX(0);
}
100% {
  opacity: 0;
  transform: translateX(40px);
}
`
const Headerwrappers = styled.header`
position: fixed;
height: 80px;
top: ${props => props.showHeader == 1 ? '0' : '-80px'};
cursor: ${props => props.showHeader == 1 ? '' : 'pointer'};
left: 0;
right: 0;
z-index: 1; 
transition: 0.5s;
background-color: ${(props) => (props.activeSection === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.2)')};
.headeroverarea{
  display: ${props => props.showHeader == 1 ? '' : 'block'};
    position: absolute;
    bottom: -30px;
    left: 0;
    right: 0;
    height: 30px;
    cursor: pointer;
}
@media only screen and (max-width: 1280px), (max-height: 600px) {
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.2);
}
`
const BlueStick = styled.span`
position: absolute;
top: 0;
left: 8%;
height: ${(props) => (props.showHeader == 1 ? '250px' : 'none')};
padding:"0";
border-left: 10px solid rgb(0, 104, 232); 
display: ${(props) => (props.activeSection === 0 ? '' : 'none')};
/* rgb(0, 104, 232) 파랑색 코드 10px solid rgb(255, 194, 0)*/
transition: 0.5s;
/* 모바일 화면에서 숨김 */
  @media only screen and (max-width: 1280px), (max-height: 600px) {
    display: none;
  }
`
const LogoButton = styled.div`
position: ${(props) => (props.showMore ? 'fixed' : 'relative')};
top: ${(props) => (props.showMore ? '19px' : '')};
  border: none;
  cursor: pointer;
  z-index: 9999;
  background: url('/image/logo.svg');
  width: 19em; 
  height: 3em;
  background-size: cover;
  animation: ${props => props.BlinkAnimation ? css`${blinkAnimation} 0.6s ` : 'none'};
@media only screen and (max-width: 700px) {
top: ${(props) => (props.showMore ? '29px' : '')};
  width: 140px; 
  height: 21.625px;
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
  animation: ${props => props.AnimationEnabled ? 'none' : css`${fadeIn} 0.5s`};
      &:hover{
        text-decoration: underline;
      }
      &.active{
        color: ${(props) => (props.activeSection === 0 ? 'white' : 'black')};
        text-decoration: underline;
      }
  }
@media only screen and (max-width: 700px) {
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
padding: 10px;
div{
  position: absolute;
  width: 5px;
  height: 5px;
  background: #fff;
  }
  div:nth-child(1) { top: 10px; left: 10px; 
  background-color: rgb(255, 194, 0);}
  div:nth-child(2) { top: 10px; left: 20px; }
  div:nth-child(3) { top: 10px; left: 30px; }
  div:nth-child(4) { top: 20px; left: 10px; }
  div:nth-child(5) { top: 20px; left: 20px; }
  div:nth-child(6) { top: 20px; left: 30px; }
  div:nth-child(7) { top: 30px; left: 10px; }
  div:nth-child(8) { top: 30px; left: 20px; }
  div:nth-child(9) { top: 30px; left: 30px; }
`
const MoreSection = styled.section`
position: fixed;
top: 0;
width: 100%;
.menusplit{
  width: calc(25% + 2px);
	position:absolute; 
  animation: ${props => props.AnimationEnabled ? css`${skewIn} 0.7s cubic-bezier(0.86, 0, 0.07, 1)` : css`${skewOut} 0.6s cubic-bezier(0.86, 0, 0.07, 1)`};
	top:0px;
  background-color: rgb(0, 104, 232); /* 파란색 배경 추가 */
	height: calc(100vh + 80px); 
}
.menusplit:nth-child(0){left:-100%}
.menusplit:nth-child(1){left:-75%}
.menusplit:nth-child(2){left:-50%}
.menusplit:nth-child(3){left:-25%}
.menusplit:nth-child(4){left:0%}
.menusplit:nth-child(5){left:25%}
.menusplit:nth-child(6){left:50%}
.menusplit:nth-child(7){left:75%}
.menusplit:nth-child(8){left:100%}
.menusplit:nth-child(9){left:125%}
`
const MoreMenuInner = styled.article`
position: relative;
width: 100%;
height: 100vh;
.menuinner{
position: relative;
top: 25%;
padding: 0 5%;
@media only screen and (max-width: 700px) {
padding: 0;
}
@media only screen and (max-height: 550px) {
  top: 20%;
}
}
`
const CloseMoreButton = styled.button` /* moreclose 버튼 */
position: fixed;
top: 26px;
right: 10vw;
border: none;
background-color: transparent;
cursor: pointer;
align-items: center;
padding: 0 10px 10px 0;
margin: 0;
strong{
  position:absolute;
  top: 10%;
  font-size:15px;
  color:#fff;
  em{
    display: inline-block;
    opacity: 0;
  }
  .em1{
  animation: ${props => props.AnimationEnabled ? css`${fadeInLeft} 1s 0.1s forwards` : css`${fadeOutRight} 0.4s 0.13s backwards`};
  }
  .em2{
  animation: ${props => props.AnimationEnabled ? css`${fadeInLeft} 1s 0.18s forwards` : css`${fadeOutRight} 0.4s 0.12s backwards`};
  }
  .em3{
  animation: ${props => props.AnimationEnabled ? css`${fadeInLeft} 1s 0.22s forwards` : css`${fadeOutRight} 0.4s 0.1s backwards`};
  }
  .em4{
  animation: ${props => props.AnimationEnabled ? css`${fadeInLeft} 1s 0.24s forwards` : css`${fadeOutRight} 0.4s 0.06s backwards`};
  }
  .em5{
  animation: ${props => props.AnimationEnabled ? css`${fadeInLeft} 1s 0.25s forwards` : css`${fadeOutRight} 0.4s backwards`};
  }
}
@media screen and (max-width: 700px){
    right: 2%;
}
`
const CloseMore = styled.div`
display: inline-block;
position: relative;
width: 25px;
height: 25px;
margin-left: 3.5em;
  animation: ${props => props.AnimationEnabled ? css`${rotateRight} 0.4s cubic-bezier(.8, .5, .2, 1.4) 0s` : css`${rotateLeft} 0.4s cubic-bezier(.8, .5, .2, 1.4) 0s`};
  div{
  position: absolute;
  width: 5px;
  height: 5px;
  background: #fff;
  transition: 0.3s ease 0s;
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
const TotalButtonContainer = styled.ul` /* 더보기 내용 전체 버튼 */
display: flex;
padding: 0;
margin: 0;
justify-content: space-evenly;
font-size: 2em;
animation: ${props => props.AnimationEnabled ? css`${fadeInDown} 1s ` : css`${fadeOutUp} 0.6s `};
@media only screen and (max-width: 1280px),(max-height: 760px) {
  font-size: 1.5em;
}
@media only screen and (max-width: 960px),(max-height: 600px) {
  font-size: 1em;
}
`
const MoreIconButtonContainer = styled.div`
display: flex; /* 더보기 아래쪽 아이콘 버튼 스타일*/
position: fixed;
left: 10%;
bottom: 80px;
align-items: center;
  animation: ${props => props.AnimationEnabled ? css`${fadeInUp} 1s ` : css`${fadeOutDown} 0.6s `};
@media only screen and (max-width: 420px) {
    left: 2%;
}
@media only screen and (max-height: 400px) {
bottom: 5%;
}
`
const MMoreSection = styled.div`
position: fixed;
top: 0;
height:100vh;
width: 100%;
background-color: rgb(0, 104, 232); /* 파란색 배경 추가 */
animation: ${props => props.AnimationEnabled ? css`${slideInLeft} 0.5s ` : css`${slideOutRight} 0.5s `};
`
const Header = (props) => {
  const { activeSection, showHeader, setShowHeader, scrollY } = props;
  const router = useRouter();
  const { lang = 'en' } = router.query;
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // 모바일 화면 상태
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0); // 초기 화면 너비 설정
  const [showMore, setShowMore] = useState(false);
  const [BlinkAnimation, setBlinkAnimation] = useState(false)
  const [AnimationEnabled, setAnimationEnabled] = useState(false); // 상태 추가
  /* 이걸 쓰면 더보기 창에서 바디의 스크롤이 움직이진 않지만 더보기를 나올때 순간 스크롤이 없어졌다 생김
    useEffect(() => {
      const handleScroll = (e) => {
        if (showMore) {
      e.preventDefault();
      e.stopPropagation();
        }
      };
      
      if (showMore) {
        const originalStyle = window.getComputedStyle(document.body).cssText; // 현재 body의 스타일 저장
        document.body.style.cssText = `
          position: fixed; // 이걸 없애면 그 스크롤이 순간 사라지는것도 없어지는데 고정도 안되서 의미가 없어짐
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        window.addEventListener('wheel', handleScroll, { passive: false }); // wheel 이벤트 추가
  
        return () => {
          const scrollY = document.body.style.top;
          document.body.style.cssText = originalStyle; // 이전에 저장한 body 스타일로 복원
          window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
          window.removeEventListener('wheel', handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
        };
      }
    }, [showMore]);
    */

  // More 버튼 클릭 시
  const handleMoreButtonClick = () => {
    setShowMore(true);
    setAnimationEnabled(true); // Animation 활성화
    setBlinkAnimation(true); // 로고 깜빡임 활성화
    setTimeout(() => {
      setBlinkAnimation(false); // close할때 애니메이션 작동하도록
    }, 400); // 1초 후에 CloseAnimation을 false로 변경
  };
  // Close 버튼 클릭 시
  const handleCloseButtonClick = () => {
    setAnimationEnabled(false); // Animation 활성화
    setBlinkAnimation(true); // 로고 깜빡임 활성화
    setTimeout(() => {
      setShowMore(false);
      setBlinkAnimation(false); // more할때 애니메이션 작동하도록
    }, 400); // 1초 후에 CloseAnimation을 false로 변경
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
    checkIsMobile(); // 컴포넌트 마운트 확인
    // 화면 크기에 따라 모바일 화면 확인
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile); // 이벤트 리스너 제거
    };
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
      <div class="headeroverarea" showHeader={showHeader}
        onMouseOver={() => {
          setShowHeader(true)
        }}
        onMouseLeave={() => {
          if (scrollY != 0) {
            setShowHeader(false)
          }
        }}>
      </div>
      <div className="headerinner">
        {isMobile ? null : <BlueStick activeSection={activeSection} showHeader={showHeader} />}
        <LogoButton
          BlinkAnimation={BlinkAnimation}
          showMore={showMore}
          activeSection={activeSection}
          onClick={() => { window.location.reload() }}>
        </LogoButton>
        <HeaderButtons activeSection={activeSection}>
          {showMore ? (
            <CloseMoreButton AnimationEnabled={AnimationEnabled} onClick={handleCloseButtonClick}>
              <strong>
                <em class="em1">C</em>
                <em class="em2">l</em>
                <em class="em3">o</em>
                <em class="em4">s</em>
                <em class="em5">e</em>
              </strong>
              <CloseMore AnimationEnabled={AnimationEnabled}>
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              </CloseMore>
            </CloseMoreButton>
          ) : (
            <>
              <Link href="/kr" legacyBehavior>
                <a activeSection={activeSection} className={lang === 'kr' ? 'active' : ''}>KR</a>
              </Link>
              <Link href="/en" legacyBehavior>
                <a activeSection={activeSection} className={lang === 'en' ? 'active' : ''}>EN</a>
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
            <MMoreSection AnimationEnabled={AnimationEnabled}>
              <MobileDropdown />
              <MobileIconContainer />
            </MMoreSection>
          ) : (
            <MoreSection AnimationEnabled={AnimationEnabled}>
              <span class="menusplit"></span>
              <span class="menusplit"></span>
              <span class="menusplit"></span>
              <span class="menusplit"></span>
              <span class="menusplit"></span>
              <span class="menusplit"></span>
              <span class="menusplit"></span>
              <span class="menusplit"></span>
              <span class="menusplit"></span>
              <MoreMenuInner>
                <div class="menuinner">
                  <TotalButtonContainer AnimationEnabled={AnimationEnabled}>
                    <MenuButton />
                  </TotalButtonContainer>
                  <MoreIconButtonContainer AnimationEnabled={AnimationEnabled}>
                    <MagneticIcon />
                  </MoreIconButtonContainer>
                </div>
              </MoreMenuInner>
            </MoreSection>
          )}
        </div>
      )}
    </Headerwrappers >
  );
};
export default Header;
