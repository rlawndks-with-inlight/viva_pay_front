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
background-color: ${(props) => (props.activeSection === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.7)')};
`
const Logo = styled.a`/* heerim 로고 */
text-align: center; /* 텍스트 가운데 정렬 */
text-decoration: none; /* 링크의 기본 밑줄 스타일 제거 */
background-color: transparent; /* 배경색 투명으로 설정 */
border: none; /* 테두리 제거 */
cursor: pointer; /* 포인터 커서로 변경 */
display: flex; /* 자식 요소를 가로로 나란히 정렬 */
flex-direction: column; /* 자식 요소를 세로로 정렬 */
align-items: center; /* 자식 요소를 수직 가운데 정렬 */
z-index: 2;
`
const Logotext = styled.span` /* 로고 글자 스타일 */
font-size: ${(props) => props.fontSize};
font-weight: ${(props) => props.fontWeight};
font-style: italic; /* 텍스트를 기울임체로 스타일링 */
color: ${(props) => (props.activeSection === 0 ? 'white' : 'black')};
margin-left: 7vw;
margin-top: ${(props) => props.marginTop};
`
const HeaderButtons = styled.div` /* 헤더의 오른쪽 스타일 */
display: flex;
gap: 14px;
font-size: 24px;/* 한영 버튼 크기 */
align-items: center;
margin-right: 11vw;
margin-top: 3vw;
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
`
const More = styled.button` /* 더보기 버튼 */
background: transparent;
border: none;
font-size: 16px;
cursor: pointer;
color: white;
`
const MoreContainer = styled.div` /* more 모달 스타일링 */
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgb(146, 208, 30);; /* 녹색 배경 추가 */
z-index: 1;
`
const MoreClose = styled.button` /* more close 버튼 */
position: absolute;
top: 70px; /* 원하는 위치로 조정하세요 */
right: 12vw; /* 원하는 위치로 조정하세요 */
color: white;
background: transparent; /* 투명 배경 추가 */
border: none;
cursor: pointer;
font-size: 1.5rem;
font-weight: bold;
z-index: 1;
`
const TotalButtonContainer = styled.div` /* 더보기 내용 전체 버튼 */
display: flex;
margin-left: 12vw;
margin-top: 5vw;
`
const TitleButton = styled.button`
display: block; /* 메인 버튼을 블록 레벨 요소로 변경 */
font-size: 44px;
font-weight: bold;
text-align: center; /* 텍스트 중앙 정렬 */
text-decoration: none;
color: white; /* 메인 버튼 텍스트 색상을 흰색으로 설정 */
background-color: transparent; /* 배경을 투명하게 설정 */
padding: 190px 100px 0 0;  /* 버튼 패딩 조절 */
border: none; /* 버튼 테두리 제거 */
  a{
    color: white;
    text-decoration: none;
  }
`
const SubButton = styled.button`
display: flex;
flex-direction: column; /* 서브 버튼을 세로로 정렬 */
align-items: flex-start; /* 왼쪽 정렬 */
border: none;
padding: 0;
margin: 30px 0 0 0;
font-size: 24px;
background: transparent; /* 투명 배경 추가 */
text-align: left; /* 텍스트 왼쪽 정렬 */
  a{
    text-decoration: none;
    margin-bottom: 30px;
    color: white; /* 서브 버튼 텍스트 색상 설정 */
    &:hover{
      color: white; /* 호버 시 밑줄의 색상을 흰색으로 변경 */
      text-decoration: underline; /* 호버 시 밑줄 표시 */
    }
  }
`
const MoreIconButtonContainer = styled.div`
display: flex; /* 더보기 아래쪽 아이콘 버튼 스타일*/
margin-left: 12vw;
margin-top: 9vw;
text-align: center;
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
`
const LocationButton = styled.div`
display: flex; /* 더보기 아래쪽 map 버튼 스타일*/
flex-direction: row;
background-color: rgb(131, 187, 72); /* 회색 배경 추가 */
border-radius: 50px; /* 회색 배경과 함께 버튼에 radius 추가 */
padding: 10px;
cursor: pointer;
  img{
    width: 25px;
    height: 25px;
  }
  a{
    font-size: 20px;
    margin: 0 15px 0 15px;
    color: white;
  }
  &:hover{
    opacity: 0.7; /* 호버 시 투명도를 0.7로 변경 (1이 원래 투명도) */
}
`
const Header = ({ activeSection, isMoreClicked, handleMoreButtonClick, setIsMoreClicked, closeMore, updateHeaderVisibility }) => {
    const router = useRouter();
    const { lang = 'kr' } = router.query;
    const [isVisible, setIsVisible] = useState(false);
    const [isScrollingDisabled, setScrollingDisabled] = useState(false);


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
                    <Logo onClick={() => { window.location.reload() }}>
                        <Logotext fontSize="36px" fontWeight="bold" marginTop="2vw" activeSection={activeSection}>
                            PAYVERY</Logotext>
                        <Logotext fontSize="12px" activeSection={activeSection}></Logotext>
                    </Logo>
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
                    <TotalButtonContainer>
                        <div >
                            <TitleButton>
                                <Link href="/IR" >ABOUT US</Link>
                            </TitleButton>
                            <SubButton>
                                <Link href="/about-us/corporate-profile" >Corporate Profile</Link>
                                <Link href="/about-us/leadership" >Leadership</Link>
                                <Link href="/about-us/News" >News</Link>
                                <Link href="/about-us/PR" >PR </Link>
                                <Link href="/about-us/Recruit" >Recruit</Link>
                            </SubButton>
                        </div>
                        <div >
                            <TitleButton >
                                <Link href="/IR" >PROJECTS</Link>
                            </TitleButton>
                            <SubButton >
                                <Link href="/projects/Selected Works">Selected Works</Link>
                                <Link href="/projects/All" >All</Link>
                                <Link href="/projects/DESIGN" >DESIGN</Link>
                                <Link href="/projects/CM" >CM</Link>
                            </SubButton>
                        </div>
                        <div >
                            <TitleButton>
                                <Link href="/IR" >EXPERTISE</Link>
                            </TitleButton>
                            <SubButton >
                                <Link href="/EXPERTISE/Services" >Services</Link>
                                <Link href="/EXPERTISE/Markets" >Markets</Link>
                                <Link href="/EXPERTISE/Research" >Research & Idea</Link>
                                <Link href="/EXPERTISE/VR" >VR/AR</Link>
                            </SubButton>
                        </div>
                        <div>
                            <TitleButton>
                                <Link href="/IR" >IR</Link>
                            </TitleButton>
                            <SubButton >
                                <Link href="/IR/Finance">Finance</Link>
                                <Link href="/IR/Analyst_Report" >Analyst Report</Link>
                                <Link href="/IR/IR_Material" >IR Material</Link>
                            </SubButton>
                        </div>
                        <div>
                            <TitleButton>
                                <Link href="/IR" >CONTACT</Link>
                            </TitleButton>
                        </div>
                    </TotalButtonContainer>
                    {/* 인스타그램 버튼 */}
                    <MoreIconButtonContainer>
                        {/* 인스타그램 버튼 */}
                        <MoreIconButton>
                            <Link href="https://www.instagram.com/heerim_architects_official/" target="_blank" rel="noopener noreferrer">
                                <img src="/icon/instagram.svg" alt="Instagram Icon" />
                            </Link>
                            {/* 유튜브 버튼 */}
                            <Link style={{ marginLeft: "35px" }} href="https://www.youtube.com/channel/UCPwQIrf17KFyqvXeq8NVY_Q" target="_blank" rel="noopener noreferrer">
                                <img src="/icon/youtube.svg" alt="YouTube Icon" />
                            </Link>
                            {/* 핀터레스트 버튼 */}
                            <Link style={{ marginLeft: "35px" }} href="https://www.pinterest.co.kr/heerim_architects_official/" target="_blank" rel="noopener noreferrer">
                                <img src="/icon/pinterest.svg" alt="Pinterest Icon" />
                            </Link>
                        </MoreIconButton>
                        {/* 디자인 지도 버튼 */}
                        <LocationButton style={{ marginLeft: "35px" }} href="https://www.google.com/maps/d/viewer?mid=1ZYdnpbxRgC5-zu5GpoOU8zd_E-v24aXT&ll=13.728397502246512%2C71.13522019999999&z=3" target="_blank" rel="noopener noreferrer">
                            <img src="/icon/location.svg" alt="Location Icon" />
                            <a> Design map </a>
                        </LocationButton>
                        {/* CM 지도 버튼 */}
                        <LocationButton style={{ marginLeft: "10px" }} href="https://www.google.com/maps/d/viewer?mid=1aWEovb5OXGAdqH_D-QojV6l96tLYT2S0&ll=24.118227897040363%2C55.94565490000001&z=3" target="_blank" rel="noopener noreferrer">
                            <img src="/icon/location.svg" alt="Location Icon" />
                            <a> CM map </a>
                        </LocationButton>
                    </MoreIconButtonContainer>
                </MoreContainer>
            )}
        </Headerwrappers >
    );
};

export default Header;
