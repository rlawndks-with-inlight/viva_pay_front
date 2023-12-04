// components/Header.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

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
const skewIn = keyframes`
0%{
  width: 0%;
  opacity: 0;
  transform: skewX(0deg);
}
100% {
  width: calc(25%+2px);
  opacity: 1;
  transform: skewX(45deg);
}
`
const skewOut = keyframes`
0%{
  width: calc(25%+2px);
  opacity: 1;
  transform: skewX(45deg);
}
100% {
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
const fadeRight = keyframes`
0%{
  opacity: 1;
  transform: translateX(0);
}
100% {
  opacity: 0;
  transform: translateX(40px);
}
`
const fadeLeft = keyframes`
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
justify-content: center;
padding: 0;
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
  animation: ${props => props.AnimationEnabled ? css`${fadeLeft} 1s 0.1s forwards` : css`${fadeRight} 0.4s 0.13s backwards`};
  }
  .em2{
  animation: ${props => props.AnimationEnabled ? css`${fadeLeft} 1s 0.18s forwards` : css`${fadeRight} 0.4s 0.12s backwards`};
  }
  .em3{
  animation: ${props => props.AnimationEnabled ? css`${fadeLeft} 1s 0.22s forwards` : css`${fadeRight} 0.4s 0.1s backwards`};
  }
  .em4{
  animation: ${props => props.AnimationEnabled ? css`${fadeLeft} 1s 0.24s forwards` : css`${fadeRight} 0.4s 0.06s backwards`};
  }
  .em5{
  animation: ${props => props.AnimationEnabled ? css`${fadeLeft} 1s 0.25s forwards` : css`${fadeRight} 0.4s backwards`};
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
.char{
  display: inline-block;
  position: relative;
  pointer-events: none;
  visibility: hidden;
  overflow: hidden;
  color: white;
  text-decoration: none;
  ::before, ::after{
    pointer-events: none;
    user-select: none;
    position: absolute;
    top: 0;
    left: 0;
    content: attr(data-char);
    visibility: visible;
    transition: all 0.6s cubic-bezier(0.37, 0.03, 0.09, 0.98);
    transition-delay: calc( 0.05s * var(--char-index));
  }
  ::after{
    transform: translateY(100%);
  }
}
  li{
h2{
  margin: 0;
}
  list-style: none;
&:hover{
  a{
    transition: all 0.6s ;
      opacity: 1;
  span{
  ::before{
    transform: translateY(-100%);
  }
  ::after{
    transform: translateY(0);
  }
  }
  }
}
}
`
const SubButton = styled.button`
display: flex;
flex-direction: column; /* 서브 버튼을 세로로 정렬 */
align-items: flex-start; /* 왼쪽 정렬 */
border: none;
padding: 0;
margin-top: 1em;
font-size: 1em;
background: transparent; /* 투명 배경 추가 */
text-align: left; /* 텍스트 왼쪽 정렬 */
transition: all 0.3s;
a{
  position: relative;
  transition: all 0.3s ;
  opacity: 0.5;
  text-decoration: none;
  margin-bottom: 1.5em;
  color: white; /* 서브 버튼 텍스트 색상 설정 */
  ::before{
    position: absolute;
    width: 100%;
    height: 2px;
    margin-top: 1.3em;
    content: "";
    background-color: white;
    transform: scaleX(0);
    transition: transform 0.3s;
    transform-origin: 100% 0;
  }
  :hover {
    ::before{
      transform:scaleX(1); 
      transform-origin: 0 0
    }
  }
}
@media only screen and (max-height: 550px) {
    margin-top: 0.4em;
    a{
        margin-bottom: 0.7em;
    }
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
const MoreIconButton = styled.li`
list-style: none;
text-decoration: none; /*링크 밑줄 제거*/
  &:hover{
    img{
transition: all 0.3s ease; /* 호버 시 투명도 전환 애니메이션 */
      opacity: 0.5;
    }
  }
`
const IconButton = styled.a`
display: inline-block;
margin-right: 3vw;
  transition: all 0.3s ease;
  position: relative;
  img {
    width: 40px;
    height: 40px;
  }
  &:hover {
    img{
      opacity: 1;
    transform: scale(1.05);
    }
  } 
@media only screen and (max-width: 650px),(max-height: 400px) {
  img{
    width: 25px;
    height: 25px;
}
}
`
const LocationButton = styled.div`
display: flex; /* 더보기 아래쪽 map 버튼 스타일*/
align-items: center;
background-color: rgb(255, 194, 0); /* 노란색 배경 추가 */
border-radius: 50px; /* 회색 배경과 함께 버튼에 radius 추가 */
padding: 10px;
opacity: 0.8;
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
transition: all 0.3s ease; /* 호버 시 투명도 전환 애니메이션 */
    opacity: 1; /* 호버 시 투명도를 0.7로 변경 (1이 원래 투명도) */
    transform: scale(1.05);
}
@media only screen and (max-width: 650px) {
padding: 5px 10px;
  img{
    width: 15px;
    height: 15px;
  }
  a{
    font-size: 12px;
    padding: 0;
  }
}
@media only screen and (max-height: 400px) {
padding: 5px 10px;
  img{
    width: 1em;
    height: 1em;
  }
  a{
    font-size: 1em;
  }
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
const MTotalButtonContainer = styled.ul`
text-decoration: none;
margin-top : 6em;
padding: 0;
@media only screen and (max-height: 550px) {
margin-top : 4em;
}
`
const MDropDownButton = styled.li`
border-top: 1px solid rgba(255,255,255,0.2);
background-color: transparent;
cursor: pointer;
    color: white;
list-style: none;
  overflow: hidden;
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
@media only screen and (max-height: 550px) {
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
opacity: ${(props) => (props.isVisible ? '1' : '0')};
  max-height: ${(props) => (props.isVisible ? '110px' : '0')}; /* 110px : 0 에서 애니메이션 문제없음 185px이 모든걸 보여줌 */
  padding: 0;
  transition: ${(props) => (props.isVisible ? 'max-height 0.4s' : 'max-height 0.5s, opacity 4s')};
  a {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    font-size: 1.1em;
    display: block;
    color: gray;
    &:hover{
      color: black;
        background-color: rgba(255, 194, 0, 0.5); /* 노란색 배경 추가 */
      }
  }
@media only screen and (max-height: 550px) {
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
const MMoreIconButtonContainer = styled.div`
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
const MMoreIconButton = styled.a`
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
const MLocationButton = styled.div`
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
const Header = (props) => {
  const { activeSection, showHeader, setShowHeader, scrollY } = props;
  const router = useRouter();
  const { lang = 'kr' } = router.query;
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // 모바일 화면 상태
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0); // 초기 화면 너비 설정
  const [isAboutUsDropdownVisible, setAboutUsDropdownVisible] = useState(false);
  const [isProjectDropdownVisible, setProjectDropdownVisible] = useState(false);
  const [isExpertiseDropdownVisible, setExpertiseDropdownVisible] = useState(false);
  const [isIRDropdownVisible, setIRDropdownVisible] = useState(false);
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

  // 호버시 마우스 추적
  const applyMagneticEffect = () => {
    document.querySelectorAll(".cm-magnetic-btn").forEach((el) => {
      el.addEventListener('mousemove', function (e) {
        const pos = this.getBoundingClientRect();
        const mx = e.clientX - pos.left - pos.width / 2;
        const my = e.clientY - pos.top - pos.height / 2;

        this.style.transform = `translate(${mx * 0.15}px, ${my * 0.3}px) scale(1.05)`;
      });

      el.addEventListener('mouseleave', function () {
        this.style.removeProperty('transform');
      });
    });
  };

  const MagneticButton = ({ href, children }) => {
    useEffect(() => {
      applyMagneticEffect();

      return () => {
      };
    }, []);

    return (
      <IconButton className="cm-magnetic-btn" href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </IconButton>
    );
  };

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

    document.body.style.overflow = 'auto'; // body 요소의 스크롤을 다시 보이게 함
    setTimeout(() => {
      setShowMore(false);
      setBlinkAnimation(false); // more할때 애니메이션 작동하도록
    }, 400); // 1초 후에 CloseAnimation을 false로 변경
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

    checkIsMobile(); // 컴포넌트 마운트 확인

    // 화면 크기에 따라 모바일 화면 확인
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile); // 이벤트 리스너 제거
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
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </CloseMore>
            </CloseMoreButton>
          ) : (
            <>
              <Link href="/en" legacyBehavior>
                <a activeSection={activeSection} className={lang === 'en' ? 'active' : ''}>EN</a>
              </Link>
              <Link href="/kr" legacyBehavior>
                <a activeSection={activeSection} className={lang === 'kr' ? 'active' : ''}>KR</a>
              </Link>
              <More onClick={handleMoreButtonClick}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </More>
            </>
          )}
        </HeaderButtons>
      </div>
      {showMore && (
        <div>
          {isMobile ? (
            <MMoreSection AnimationEnabled={AnimationEnabled}>
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
                <MMoreIconButtonContainer>
                  {/* 인스타그램 버튼 */}
                  <MMoreIconButton>
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
                  </MMoreIconButton>
                  {/* 디자인 지도 버튼 */}
                  <MLocationButton style={{ marginLeft: "3vw" }} href="https://www.google.com/maps/d/viewer?mid=1ZYdnpbxRgC5-zu5GpoOU8zd_E-v24aXT&ll=13.728397502246512%2C71.13522019999999&z=3" target="_blank" rel="noopener noreferrer">
                    <img src="/icon/location.svg" alt="Location Icon" />
                    <a> Design map </a>
                  </MLocationButton>
                  {/* CM 지도 버튼 */}
                  <MLocationButton style={{ marginLeft: "3vw" }} href="https://www.google.com/maps/d/viewer?mid=1aWEovb5OXGAdqH_D-QojV6l96tLYT2S0&ll=24.118227897040363%2C55.94565490000001&z=3" target="_blank" rel="noopener noreferrer">
                    <img src="/icon/location.svg" alt="Location Icon" />
                    <a> CM map </a>
                  </MLocationButton>
                </MMoreIconButtonContainer>
              </div>
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
                    <li>
                      <h2 style={{ /* 1.5em이 기본 사이즈 */ }}>
                        <a href="/ABOUT US">
                          <span className="char" data-char="A" style={{ '--char-index': 0 }}>A</span>
                          <span className="char" data-char="B" style={{ '--char-index': 1 }}>B</span>
                          <span className="char" data-char="O" style={{ '--char-index': 2 }}>O</span>
                          <span className="char" data-char="U" style={{ '--char-index': 3 }}>U</span>
                          <span className="char" data-char="T" style={{ '--char-index': 4 }}>T</span>
                          <span className="char" data-char="U" style={{ '--char-index': 5 }}>U</span>
                          <span className="char" data-char="S" style={{ '--char-index': 6 }}>S</span>
                        </a>
                      </h2>
                      <SubButton>
                        <a href="/about-us/corporate-profile">Corporate Profile</a>
                        <a href="/about-us/leadership" >Leadership</a>
                        <a href="/about-us/news" >News</a>
                        <a href="/about-us/pr" >PR </a>
                        <a href="/about-us/recruit" >Recruit</a>
                      </SubButton>
                    </li>
                    <li >
                      <h2 >
                        <a href="/projects" >
                          <span className="char"  data-char="P" style={{ '--char-index': 0 }}>P</span>
                          <span className="char"  data-char="R" style={{ '--char-index': 1 }}>R</span>
                          <span className="char"  data-char="O" style={{ '--char-index': 2 }}>O</span>
                          <span className="char"  data-char="J" style={{ '--char-index': 3 }}>J</span>
                          <span className="char"  data-char="E" style={{ '--char-index': 4 }}>E</span>
                          <span className="char"  data-char="C" style={{ '--char-index': 5 }}>C</span>
                          <span className="char"  data-char="T" style={{ '--char-index': 6 }}>T</span>
                          <span className="char"  data-char="S" style={{ '--char-index': 7 }}>S</span>
                        </a>
                      </h2>
                      <SubButton >
                        <a href="/projects/selected works">Selected Works</a>
                        <a href="/projects/all" >All</a>
                        <a href="/projects/design" >DESIGN</a>
                        <a href="/projects/cm" >CM</a>
                      </SubButton>
                    </li>
                    <li >
                      <h2>
                        <a href="/expertise" >
                          <span className="char" data-char="E" style={{ '--char-index': 0 }}>E</span>
                          <span className="char" data-char="X" style={{ '--char-index': 1 }}>X</span>
                          <span className="char" data-char="P" style={{ '--char-index': 2 }}>P</span>
                          <span className="char" data-char="E" style={{ '--char-index': 3 }}>E</span>
                          <span className="char" data-char="R" style={{ '--char-index': 4 }}>R</span>
                          <span className="char" data-char="T" style={{ '--char-index': 5 }}>T</span>
                          <span className="char" data-char="I" style={{ '--char-index': 6 }}>I</span>
                          <span className="char" data-char="S" style={{ '--char-index': 7 }}>S</span>
                          <span className="char" data-char="E" style={{ '--char-index': 8 }}>E</span>
                        </a>
                      </h2>
                      <SubButton >
                        <a href="/expertise/services" >Services</a>
                        <a href="/expertise/markets" >Markets</a>
                        <a href="/expertise/research" >Research & Idea</a>
                        <a href="/expertise/vr" >VR/AR</a>
                      </SubButton>
                    </li>
                    <li>
                      <h2>
                        <a href="/ir" >
                          <span className="char"  data-char="I" style={{ '--char-index': 0 }}>I</span>
                          <span className="char" data-char="R" style={{ '--char-index': 1 }}>R</span>
                        </a>
                      </h2>
                      <SubButton >
                        <a href="/ir/finance">Finance</a>
                        <a href="/ir/analyst_report" >Analyst Report</a>
                        <a href="/ir/ir_material" >IR Material</a>
                      </SubButton>
                    </li>
                    <li>
                      <h2>
                        <a href="/contact" >
                          <span className="char" data-char="C"  style={{ '--char-index': 0 }}>C</span>
                          <span className="char" data-char="O"  style={{ '--char-index': 1 }}>O</span>
                          <span className="char" data-char="N"  style={{ '--char-index': 2 }}>N</span>
                          <span className="char" data-char="T"  style={{ '--char-index': 3 }}>T</span>
                          <span className="char" data-char="A"  style={{ '--char-index': 4 }}>A</span>
                          <span className="char" data-char="C"  style={{ '--char-index': 5 }}>C</span>
                          <span className="char" data-char="T"  style={{ '--char-index': 6 }}>T</span>
                        </a>
                      </h2>
                    </li>
                  </TotalButtonContainer>
                  <MoreIconButtonContainer AnimationEnabled={AnimationEnabled}>
                    {/* 인스타그램 버튼 */}
                    <MoreIconButton>
                      <MagneticButton className="cm-magnetic-btn" href="https://www.instagram.com/heerim_architects_official/" target="_blank" rel="noopener noreferrer">
                        <img src="/icon/instagram.svg" alt="YouTube Icon" />
                      </MagneticButton>
                      {/* 유튜브 버튼 */}
                      <MagneticButton className="cm-magnetic-btn" href="https://www.youtube.com/channel/UCPwQIrf17KFyqvXeq8NVY_Q" target="_blank" rel="noopener noreferrer">
                        <img src="/icon/youtube.svg" alt="YouTube Icon" />
                      </MagneticButton>
                      {/* 핀터레스트 버튼 */}
                      <MagneticButton className="cm-magnetic-btn" href="https://www.pinterest.co.kr/heerim_architects_official/" target="_blank" rel="noopener noreferrer">
                        <img src="/icon/pinterest.svg" alt="Pinterest Icon" />
                      </MagneticButton>
                    </MoreIconButton>
                    {/* 디자인 지도 버튼 */}
                    <LocationButton className="cm-magnetic-btn" style={{ marginLeft: "3vw" }} href="https://www.google.com/maps/d/viewer?mid=1ZYdnpbxRgC5-zu5GpoOU8zd_E-v24aXT&ll=13.728397502246512%2C71.13522019999999&z=3" target="_blank" rel="noopener noreferrer">
                      <img src="/icon/location.svg" alt="Location Icon" />
                      <a> Design map </a>
                    </LocationButton>
                    {/* CM 지도 버튼 */}
                    <LocationButton className="cm-magnetic-btn" style={{ marginLeft: "3vw" }} href="https://www.google.com/maps/d/viewer?mid=1aWEovb5OXGAdqH_D-QojV6l96tLYT2S0&ll=24.118227897040363%2C55.94565490000001&z=3" target="_blank" rel="noopener noreferrer">
                      <img src="/icon/location.svg" alt="Location Icon" />
                      <a> CM map </a>
                    </LocationButton>
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
