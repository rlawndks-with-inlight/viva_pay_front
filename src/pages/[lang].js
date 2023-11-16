// pages/home.js
import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import UserLayout from 'src/layouts/UserLayout';
import langJson from 'src/data/lang.json'
import { useRouter } from "next/router";
import styled from "styled-components";
import { useInView } from 'react-intersection-observer'; // react-intersection-observer 라이브러리 사용
const sections = ["section1", "section2", "section3", "section4", "section5"]; // 섹션 이름
const totalIcons = 9; // 총 아이콘 개수
const iconsPerPageLarge = 6; // 큰 화면에서 표시할 아이콘 개수
const iconsPerPageSmall = 4; // 작은 화면에서 표시할 아이콘 개수

const AnimateUp = ({ children }) => {
    const [ref, inView] = useInView({
        triggerOnce: false, // 보일때 마다 트리거
    });

    return (
        <div className={`animatedup ${inView ? "in-view" : ""}`} ref={ref}>
            {children}
        </div>
    );
};

const AnimateRight = ({ children }) => {
    const [ref, inView] = useInView({
        triggerOnce: false, // 한 번만 트리거
    });

    return (
        <div className={`animatedright ${inView ? "in-view" : ""}`} ref={ref}>
            {children}
        </div>
    );
};
const WSearchDropdownContainer = styled.ul`
padding:0;
margin-left: 12em;
width: 125px;
text-decoration: none;
`
const WSearchDropdownButton = styled.li`
border-bottom: 5px solid #FFC200;
background-color: transparent;
cursor: pointer;
    color: white;
list-style: none;
a{
    text-decoration: none;
}
p{ /* aboutus,projects,expertise,ir 디자인 */
    margin: 0;
    font-size: 1.3em;
    color: #FFC200;
    padding-bottom: 0.5em;
}
`
const WSearchDropdownContent = styled.ul`
background-color: #FFC200;
list-style: none;
position: absolute;
display: ${(props) => (props.isVisible ? 'block' : 'none')};
padding: 0;
a {
    cursor: pointer;
    padding: 0.5em 0.9em 0.5em 1.35em;
    font-size: 1.1em;
    display: block;
    color: white;
    font-weight: bold;
    &:hover{
        background-color: rgba(255, 255, 255, 0.3); /* 투명도 조절 */
    }
}
`
const Mobile = styled.div`
padding: 0;
width: 100%;
`
const M1 = styled.div`
background-image: url("/image/galaxy.png");
background-size: cover;
height: 100vh;
border: 1px solid transparent;
`
const M1Title = styled.div`
margin-top: 30vh;
margin-left: 1.5em;
font-size:3.1em;
font-weight: bold;
font-family: 'Playfair Display', serif;
color: white;
@media only screen and (max-width: 400px) {
    margin-left: 1em;
    font-size: 12vw;
}
`
const M2 = styled.div`
background-image: url("/image/blue.png");
background-size: cover; 
border: 1px solid transparent;
`
const M2YellowBox = styled.div`
width: 6em; /* 네모 상자의 너비 설정 */
height: 1.4em; /* 네모 상자의 높이 설정 */
background-color:rgb(255, 194, 0); /* 노란색 배경색 설정 */
border-top-right-radius: 10px;
border-bottom-right-radius: 10px;
margin-top: 2em;
margin-left: 2.7em;
display: flex;
justify-content: center;
align-items: center;
p{
    color: black; /* 흰색 글자색 설정 */
    font-size: 0.9em; /* 글자 크기 설정 */
    font-weight: bold;
}
@media screen and (width >= 800px) {
      margin-left: 12vw;
    }
`
const M2Subtitle = styled.div`
margin-left: 0.8em;
font-size: 3em;
font-weight: bold;
font-family: 'Playfair Display', serif;
color: white;
@media screen and (width >= 800px) {
      margin-left: 12vw;
    }
`
const M2Description = styled.div`
margin-left: 1.7em;
font-size: 1.5em;
color: white;
@media screen and (width >= 800px) {
      margin-left: 12vw;
    }
`
const M2IconContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
background-color: white;
`
const M2IconButton = styled.button`
border: none;
background-color: transparent;
font-size: 0.9em;
font-weight: bold;
margin-bottom: 2em;
cursor: pointer;
@media only screen and (max-width: 600px) {
    margin: 0 0 5vh 0;
    font-size: 2vw;
}
img{
width: 4em;
height: 4em;
    @media only screen and (max-width: 600px) {
        margin: 0;
        width: 12vw;
        height: 12vw;
    }
}
`
const M3 = styled.div`
background-color: transparent;
`
const M3Title = styled.div`
margin-top: 0.5em;
margin-left: 0.9em;
font-weight: bold;
font-size: 3em;
font-family: 'Playfair Display', serif;
`
const M3Subtitle = styled.div`
margin-left: 3.5em;
font-weight: bold;
font-size: 0.8em;
`
const M3ImageContainer = styled.div`
margin-top: 2em;
width: 100%; /* 컨테이너의 너비를 화면 너비에 맞춥니다. */
object-fit: cover; /* 이미지가 잘리지 않고 화면에 맞게 크기 조정 */
a {
    text-decoration: none;
}
img{
    margin-left: 1%;
    object-fit: cover; /* 이미지가 잘리지 않고 화면에 맞게 크기 조정 */
    height: 21em;
    width: 98%;
}
div{ /* 4개 이미지 위의 장소, 건물 텍스트 디자인 관리 */
    position: absolute;
    left: 5%;
    margin-top: 14em;
    background: transparent; /* 투명한 배경 */
    color: white;
}
`
const Place = styled.p`
margin: 0;
padding: 0;
font-size: 1em;
`
const Building = styled.p`
margin: 0;
padding: 0;
font-size: 1.5em;
font-weight: bold;
`
const NewsList = styled.div`
margin-left: 10%;
margin-right: 10%;
text-align: left;
a{
    background-color: transparent;
    text-decoration: none;
}
`
const NewsContent = styled.p`
color: gray;
font-size: 0.9em;
margin-top: 0.4em;
margin-bottom: 0;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
`
const M4ButtonContainer = styled.div`
display: flex;
white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
width: 100%; /* 100% 너비로 설정 또는 원하는 너비로 설정 */
overflow-x: scroll;
::-webkit-scrollbar-thumb {
    background-color: blue;
}
::-webkit-scrollbar {
    width: 100%;
    height: 13px;
}
`
const M4Button = styled.a`
display: inline-block; /* 인라인 블록 요소로 만들어 옆에 다른 요소가 올 수 있도록 합니다. */
`
const M5Title = styled.div`
font-size: 2em;
margin-bottom: 0.7em;
text-align: center;
color: gray;
margin-top: 0.7em;
span{
    font-weight: bold;
}
`
const M5SearchContainer = styled.div`
background-color: rgb(0, 104, 232);
width: 100%;
padding-top: 3em;
span{
    font-size: 6vw;
    font-weight: bold;
}
p{
    font-size: 1.4vw;
    margin-left: 12vw;
    color: #CACACA;
}
@media only screen and (max-width: 360px) {
    span{
        font-size: 1.5em;
    }
}
@media only screen and (max-width: 1000px) {
    p{
        font-size: 1em;
    }
}
`
const M5SearchDropdownContainer = styled.ul`
padding:0;
margin-left: 12vw;
width: 130px;
text-decoration: none;
`
const M5SearchDropdownButton = styled.li`
border-bottom: 5px solid #FFC200;
background-color: transparent;
cursor: pointer;
color: white;
list-style: none;
a{
    text-decoration: none;
}
p{ /* 선택된 드롭다운 디자인 */
    margin: 0;
    font-size: 1.3em;
    color: #FFC200;
    padding-bottom: 0.5em;
}
`
const M5SearchDropdownContent = styled.ul`
background-color: #FFC200;
list-style: none;
position: absolute;
display: ${(props) => (props.isVisible ? 'block' : 'none')};
padding: 0;
a {
    cursor: pointer;
    padding: 0.5em 0.9em 0.5em 1.35em;
    font-size: 1.1em;
    display: block;
    color: white;
    font-weight: bold;
    &:hover{
        background-color: rgba(255, 255, 255, 0.3); /* 투명도 조절 */
    }
}
`
const M5SearchInput = styled.input`
background: transparent; /* 투명 배경 추가 */
border: none;
border-bottom: 0.3em solid white; /* 하단 테두리 추가 (선택 사항) */
width: 60%; /* 검색창의 가로 너비 조정 */
font-size: 1.2em; /* 폰트 크기 키우기 */
padding-left: 0.7em;
margin-left: 12vw;
margin-bottom: 0.8em;
::placeholder{
    color: white;
}
`
const M5SearchButton = styled.button`
font-size: 1.2em;
margin-bottom: 0.8em;
cursor: pointer;
img{
    margin-right :0.5em;
    width: 20px;
    height: 20px;
}
`
const M5SearchTag = styled.div`
padding: 5vw 0 5vw 0;
margin-left: 11.5vw;
button{
border: none; /* 외곽선 없애기 */
font-size: 0.9em;
background-color: transparent;
    a{
        font-size: 1.4vw;
        color: #CACACA;
        text-decoration: none;
    }
}
@media only screen and (max-width: 1000px) {
    button {
        a {
            font-size: 1em;
        }
    }
}
`
const M5Contact = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 2em;
margin-left: 2vw;
`
const Section = styled.div`
height: ${(props) => props.height};
background-size: cover;
background-image:  url(${props => props.image});
overflow: hidden;
`
const W1Title = styled.div`
margin-top: ${(props) => props.magtop};
margin-left: 14vw;
font-size: 5em;
font-weight: bold;
font-family: 'Playfair Display', serif;
border: 1px solid transparent;
color: white;
`
const W1ScrollDownYellowStick = styled.span`
position: absolute;
top: 70.5vh;
margin-left: 81vw;
p{
    font-weight: bold;
    margin: 0 0 200px 0;
   color:white ;
  writing-mode: vertical-rl; /* 세로로 글자 눕힘 */
  font-size: 10px; /* 원하는 글자 크기로 조절 */
  animation: moveUpDown 2.5s infinite; /* 1s 동안 무한 반복되는 애니메이션 */
  margin: 0; /* 기본 마진을 제거합니다. */
}
span{
    display: block;
height: 16em;
width: 10px;
background-color:  rgb(255, 194, 0);
}
/* 파랑색 코드 rgb(0, 104, 232) 노랑색 코드 rgb(255, 194, 0) */
/* 모바일 화면에서 숨김 */
  @media only screen and (max-width: 1280px), (max-height: 800px) {
    display: none;
  }
`
/* 2section sec2 2섹션 스타일  */
const W2IconContainer = styled.div`
display: flex;
overflow-x: hidden;
justify-content: space-between;
align-items: flex-end;
width: 100%;
background-color: white;
`
const W2IconButton = styled.button`
border: none;
background-color: transparent;
font-size: 0.9em;
font-weight: bold;
margin-top: 1em;
margin-bottom: 2em;
cursor: pointer;
img{
    width: 7em;
    height: 7em;
}
`
const PrevButton = styled.button`
border: none;
cursor: pointer;
margin-bottom: 4vh;
margin-left: 20%;
background-size: cover;
background-color: transparent;
@media only screen and (max-width: 1100px), (max-height: 800px) {
margin-left: 5%;
}
@media only screen and (max-width: 600px), (max-height: 520px) {
margin: 0 0 5vh 0;
    img{
        width: 30px;
        height: 45px;
    }
}
`
const NextButton = styled.button`
border: none;
cursor: pointer;
margin-bottom: 4vh;
margin-right: 20%;
background-size: cover;
background-color: transparent;
@media only screen and (max-width: 1100px), (max-height: 800px) {
margin-right: 5%;
}
@media only screen and (max-width: 600px), (max-height: 520px) {
margin: 0 0 5vh 0;
    img{
        width: 30px;
        height: 45px;
    }
}
`
const WSearchButton = styled.button`
margin-bottom: 0.85em;
font-size: 1.2em;
cursor: pointer;
    img{
        margin-left: 1em;
        width: 20px;
        height: 20px;
    }
`
const Topic = ({ title, initialValue, finalValue }) => {
    const [currentValue, setCurrentValue] = useState(initialValue);
    const [inViewRef, inView] = useInView({
        triggerOnce: false, // 계속 트리거 ture는 한번만 트리거
    });

    useEffect(() => {
        if (inView) {
            let animationInterval;
            if (currentValue < finalValue) {
                const animationStep = (finalValue - initialValue) / 100; // 올라가는 단위 조절
                animationInterval = setInterval(() => {
                    const newValue = currentValue + animationStep;
                    setCurrentValue(Math.min(newValue, finalValue));

                    if (newValue >= finalValue) {
                        clearInterval(animationInterval); // 애니메이션 멈춤
                    }
                }, 40); // 올라가는 속도 조절
            }

            return () => clearInterval(animationInterval);
        } else {
            // 뷰를 나가면 리셋
            setCurrentValue(initialValue);
        }
    }, [inView, currentValue, finalValue, initialValue]);

    const addPlusSign = title === "History of Payvery" || title === "Professional Employees" || title === "Overseas Projects";

    return (
        <div ref={inViewRef}>
            <p className="topic-title">{title}</p>
            <p className={`topic-number ${inView ? "in-view" : ""}`}>
                {addPlusSign ? Math.round(currentValue) + "+" : Math.round(currentValue)}
            </p>
        </div>
    );
};
const TopicsContainer = () => {
    return (
        <div className="topics-container">
            <Topic title="History of Payvery" initialValue={0} finalValue={50} />
            <Topic title="Branch offices" initialValue={0} finalValue={15} />
            <Topic title="Professional Employees" initialValue={0} finalValue={1400} />
            <Topic title="Overseas Projects" initialValue={0} finalValue={300} />
            <Topic title="World Ranking" initialValue={0} finalValue={8} />
        </div>
    );
};

const Home = () => {

    const router = useRouter();
    const { lang = 'kr' } = router.query;
    const [activeSection, setActiveSection] = useState(0); // 활성 섹션 인덱스
    const [iconIndexes, setIconIndexes] = useState(Array.from({ length: iconsPerPageLarge }, (_, i) => i)); // 표시되는 아이콘 인덱스 배열
    const sectionRefs = useRef([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
    const [hoveredImage, setHoveredImage] = useState(null);
    const [hoveredText, setHoveredText] = useState(null);
    const [hoveredImageLink, setHoveredImageLink] = useState(null);
    const [windowWidth, setWindowWidth] = useState(0); // 초기 화면 너비 설정
    const [windowHeight, setWindowHeight] = useState(0); // 초기 화면 높이 설정
    const [refSection1, inViewSection1] = useInView({ triggerOnce: true });
    const [refSection2, inViewSection2] = useInView({ triggerOnce: true });
    const [refSection3, inViewSection3] = useInView({ triggerOnce: true });
    const [isSearchDropdownVisible, setIsSearchDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('All');

    const toggleDropdown = () => {
        setIsSearchDropdownVisible(!isSearchDropdownVisible);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsSearchDropdownVisible(false);
    };

    const handleScroll = (event) => {
        if (event.deltaY > 0) {
            // Scrolling down
            if (activeSection < sections.length - 1) {
                setActiveSection((prev) => prev + 1);
            }
        } else {
            // Scrolling up
            if (activeSection > 0) {
                setActiveSection((prev) => prev - 1);
            }
        }
    };

    // Attach the handleScroll function to the window's wheel event
    useEffect(() => {
        window.addEventListener("wheel", handleScroll);

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, [activeSection]);

    const handleImageHover = (imageSrc, text, link) => {
        setHoveredImage(imageSrc);
        setHoveredText(text);
        setHoveredImageLink(link);
    };

    const handleImageLeave = () => {
        setHoveredImage(null);
        setHoveredText(null);
        setHoveredImageLink(null); // 마우스를 떠날 때 링크 초기화
    };


    // 클릭된 아이콘에 대한 처리
    const handleIconClick = (iconIndex) => {
        // 각 아이콘에 대한 링크를 정의합니다.
        const iconLinks = {
            0: "/https://www.heerim.com/kr/project/project_list.php?cate=1",
            1: "/https://www.heerim.com/kr/project/project_list.php?cate=2",
            2: "/https://www.heerim.com/kr/project/project_list.php?cate=3",
            3: "/https://www.heerim.com/kr/project/project_list.php?cate=4",
            4: "/https://www.heerim.com/kr/project/project_list.php?cate=5",
            5: "/https://www.heerim.com/kr/project/project_list.php?cate=6",
            // 다른 아이콘들에 대한 링크를 추가하세요
        };

        // 클릭된 아이콘에 해당하는 링크로 이동합니다.
        const link = iconLinks[iconIndex];
        if (link) {
            window.location.href = link;
        }
    };

    // 아이콘에 대한 설명을 반환
    const getIconDescription = (iconIndex) => {
        // 각 아이콘에 대한 설명을 정의합니다.
        const iconDescriptions = {
            0: "description0",
            1: "description1",
            2: "description2",
            3: "description3",
            4: "description4",
            5: "description5",
            // 다른 아이콘들에 대한 설명을 추가하세요
        };

        // 클릭된 아이콘에 해당하는 설명을 반환합니다.
        return iconDescriptions[iconIndex] || "";
    };

    // 화면 너비 변화 감지 및 아이콘 개수 업데이트
    useEffect(() => {
        // 함수를 선언하여 화면 크기를 업데이트하는 로직
        const updateWindowDimensions = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);

            // 화면 너비가 800 이하인 경우 아이콘 개수를 작게 설정, 그렇지 않으면 크게 설정
            if (window.innerWidth <= 800 || window.innerHeight <= 800) {
                setIconIndexes(Array.from({ length: iconsPerPageSmall }, (_, i) => i));
            } else {
                setIconIndexes(Array.from({ length: iconsPerPageLarge }, (_, i) => i));
            }
        };

        // 초기화 단계에서 한 번 실행하고, 화면 크기가 변경될 때마다 실행
        updateWindowDimensions();
        window.addEventListener("resize", updateWindowDimensions);

        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
        };
    }, []);

    // 한,영 번역
    useEffect(() => {
        setLoading(true);

        if (!(lang === "kr" || lang === "en" || !lang)) {
            router.push("/404");
        } else {
            setLoading(false);
        }
    }, [router.query]);

    useEffect(() => {
        // 스크립트 로딩 및 언어 확인 이후에 화면 크기 업데이트 리스너 추가
        if (!loading) {
            // 함수를 선언하여 화면 크기를 업데이트하는 로직
            const updateWindowDimensions = () => {
                setWindowWidth(window.innerWidth);
                setWindowHeight(window.innerHeight);
            };

            // 초기화 단계에서 한 번 실행하고, 화면 크기가 변경될 때마다 실행
            updateWindowDimensions();
            window.addEventListener("resize", updateWindowDimensions);
        }

        // 이 컴포넌트가 언마운트될 때 이벤트 리스너 정리
        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
        };
    }, [activeSection, loading, windowWidth, windowHeight]);

    const updateWindowDimensions = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };


    // 이전 아이콘 표시 함수
    const showPreviousIcons = () => {
        const newIconIndexes = iconIndexes.map((index) => {
            let newIndex = index - 1;
            if (newIndex < 0) {
                newIndex = totalIcons - 1;
            }
            return newIndex;
        });
        setIconIndexes(newIconIndexes);
    };

    // 다음 아이콘 표시 함수
    const showNextIcons = () => {
        const newIconIndexes = iconIndexes.map((index) => {
            let newIndex = index + 1;
            if (newIndex >= totalIcons) {
                newIndex = 0;
            }
            return newIndex;
        });
        setIconIndexes(newIconIndexes);
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
        // closeSearch();
    };

    const isMobile = typeof window !== "undefined" ? window.innerWidth <= 1280 : false;
    return (
        <>
            {!loading && (
                <UserLayout activeSection={activeSection}>
                    <>
                        <div className="layout">
                            {isMobile ? (
                                <Mobile>
                                    <M1>
                                        <AnimateUp>
                                            <M1Title>{langJson[lang]?.FOLLOW}</M1Title>
                                            <M1Title style={{ marginTop: "0", marginBottom: "5em" }}> {langJson[lang]?.SUPPORT}</M1Title>
                                        </AnimateUp>
                                    </M1>
                                    <M2>
                                        <AnimateRight>
                                            <M2YellowBox><p>Who we are</p></M2YellowBox>
                                        </AnimateRight>
                                        <AnimateUp>
                                            <M2Subtitle> {langJson[lang]?.FOLLOW}</M2Subtitle>
                                        </AnimateUp>
                                        <AnimateUp>
                                            <M2Subtitle> {langJson[lang]?.SUPPORT}</M2Subtitle>
                                        </AnimateUp>
                                        <AnimateUp>
                                            <M2Description>{langJson[lang]?.DESCIRPTION}</M2Description>
                                        </AnimateUp>
                                        <AnimateUp>
                                            <TopicsContainer />
                                        </AnimateUp>
                                    </M2>
                                    <M2IconContainer>
                                        {/* 이전 버튼 */}
                                        <PrevButton className="prev-button" onClick={showPreviousIcons}>
                                            <img src="/icon/prev.png" alt="Prev icon" />
                                        </PrevButton>
                                        {/* 아이콘 내용 */}
                                        {iconIndexes.map((iconIndex) => (
                                            <M2IconButton
                                                key={`icon-${iconIndex}`}
                                                onClick={() => handleIconClick(iconIndex)}
                                            >
                                                <img
                                                    src={`/icon/${iconIndex}.svg`}
                                                    alt={`Icon ${iconIndex}`}
                                                />
                                                <div className="section2icon-description">
                                                    {/* 아이콘에 대한 설명 */}
                                                    {getIconDescription(iconIndex)}
                                                </div>
                                            </M2IconButton>
                                        ))}
                                        {/* 다음 버튼 */}
                                        <NextButton className="next-button" onClick={showNextIcons}>
                                            <img src="/icon/next.png" alt="Next icon" />
                                        </NextButton>
                                    </M2IconContainer>
                                    <M3>
                                        <AnimateUp>
                                            <M3Title>Our Service</M3Title>
                                        </AnimateUp>
                                        <AnimateUp>
                                            <M3Subtitle>Follow your dream. We support your dream.</M3Subtitle>
                                        </AnimateUp>
                                        <AnimateUp>
                                            <M3ImageContainer>
                                                <a
                                                    href="/404">
                                                    <div>
                                                        <Place>Incheon, Korea</Place>
                                                        <Building>{langJson[lang]?.MICN}</Building>
                                                    </div>
                                                    <img src="/image/macbook.png" alt="Image 1" />
                                                </a>
                                                <a
                                                    href="/404">
                                                    <div >
                                                        <Place>Seoul, Korea</Place>
                                                        <Building>{langJson[lang]?.MYEOUIDO}</Building>
                                                    </div>
                                                    <img src="/image/cardreader.png" alt="Image 2" />
                                                </a>
                                                <a
                                                    href="/404">
                                                    <div>
                                                        <Place>Seongnam, Korea</Place>
                                                        <Building>{langJson[lang]?.MHYUNDAI}</Building>
                                                    </div>
                                                    <img src="/image/kiosk.png" alt="Image 3" />
                                                </a>
                                                <a
                                                    href="/404">
                                                    <div>
                                                        <Place >Baku, Azerbaijan</Place>
                                                        <Building>{langJson[lang]?.SOCAR}</Building>
                                                    </div>
                                                    <img src="/image/scanner.png" alt="Image 4" />
                                                </a>
                                            </M3ImageContainer>
                                        </AnimateUp>
                                    </M3>
                                    <NewsList>
                                        {/* 뉴스 아이템 1 */}
                                        <AnimateUp>
                                            <a href="/404">
                                                <div style={{ marginTop: "0.5em" }}>
                                                    <div className="news-box">
                                                        <p className="news-text">News</p>
                                                    </div>
                                                    <NewsContent>{langJson[lang]?.FIRSTNEWS}
                                                    </NewsContent>
                                                    <span className="news-more-link"> Read more</span>
                                                    <span className="arrow-icon" >→</span>
                                                </div>
                                            </a>
                                        </AnimateUp>
                                        {/* 뉴스 아이템 2 */}
                                        <AnimateUp>
                                            <a href="/404"  >
                                                <div style={{ marginTop: "0.5em" }}>
                                                    <div className="news-box">
                                                        <p className="news-text">News</p>
                                                    </div>
                                                    <NewsContent>{langJson[lang]?.SECONDNEWS}
                                                    </NewsContent>
                                                    <span className="news-more-link"> Read more</span>
                                                    <span className="arrow-icon" >→</span>
                                                </div>
                                            </a>
                                        </AnimateUp>
                                        {/* 뉴스 아이템 3 */}
                                        <AnimateUp>
                                            <a href="/404"  >
                                                <div style={{ marginTop: "0.5em" }}>
                                                    <div className="news-box">
                                                        <p className="news-text">News</p>
                                                    </div>
                                                    <NewsContent>{langJson[lang]?.THIRDNEWS}
                                                    </NewsContent>
                                                    <span className="news-more-link"> Read more</span>
                                                    <span className="arrow-icon" >→</span>
                                                </div>
                                            </a>
                                        </AnimateUp>
                                        {/* 뉴스 아이템 4 */}
                                        <AnimateUp>
                                            <a href="/404" >
                                                <div style={{ marginTop: "0.5em" }}>
                                                    <div className="news-box">
                                                        <p className="news-text">News</p>
                                                    </div>
                                                    <NewsContent>{langJson[lang]?.FOURTHNEWS}
                                                    </NewsContent>
                                                    <span className="news-more-link"> Read more</span>
                                                    <span className="arrow-icon">→</span>
                                                </div>
                                            </a>
                                        </AnimateUp>
                                        {/* 뉴스 아이템 5 */}
                                        <AnimateUp>
                                            <a href="/404">
                                                <div style={{ marginTop: "0.5em" }}>
                                                    <div className="news-box">
                                                        <p className="news-text">News</p>
                                                    </div>
                                                    <NewsContent>{langJson[lang]?.FIFTHNEWS}
                                                    </NewsContent>
                                                    <span className="news-more-link"> Read more</span>
                                                    <span className="arrow-icon" >→</span>
                                                </div>
                                            </a>
                                        </AnimateUp>
                                        {/* 뉴스 아이템 6 */}
                                        <AnimateUp>
                                            <a href="/404" >
                                                <div style={{ marginTop: "0.5em" }}>
                                                    <div className="news-box">
                                                        <p className="news-text">News</p>
                                                    </div>
                                                    <NewsContent>{langJson[lang]?.SIXTHNEWS}
                                                    </NewsContent>
                                                    <span className="news-more-link"> Read more</span>
                                                    <span className="arrow-icon" >→</span></div>
                                            </a>
                                        </AnimateUp>
                                    </NewsList>
                                    <AnimateUp>
                                        <M4ButtonContainer>
                                            {/* news1 버튼 */}
                                            <M4Button href="https://www.youtube.com/watch?v=OLrv8OGTUnQ" target="_blank" rel="noopener noreferrer">
                                                <img src="/image/newsimage1.png" alt="youtube1 Image" />
                                            </M4Button>
                                            {/* news2 버튼 */}
                                            <M4Button href="https://www.youtube.com/watch?v=REof-nC8Ck8&feature=youtu.be" target="_blank" rel="noopener noreferrer">
                                                <img src="/image/newsimage2.png" alt="youtube2 Image" />
                                            </M4Button>
                                            {/* news3 버튼 */}
                                            <M4Button href="https://www.youtube.com/watch?v=Lu8uHwNpHEQ" target="_blank" rel="noopener noreferrer">
                                                <img src="/image/newsimage3.png" alt="youtube3 Image" />
                                            </M4Button>
                                        </M4ButtonContainer>
                                    </AnimateUp>
                                    <AnimateUp>
                                        <M5Title>
                                            <span>성공</span>으로 가는 과정을 계획하는데 <span>함께</span>하겠습니다.
                                        </M5Title>
                                    </AnimateUp>
                                    <M5SearchContainer>
                                        <AnimateUp>
                                            <span style={{ marginLeft: "12vw", color: "#FFC200", }}>Search</span>
                                            <span style={{ color: "white" }}>Payvery.com</span>
                                        </AnimateUp>
                                        <AnimateUp>
                                            <p style={{}}>Creative Leadership of Payvery designs the new future never experienced before.</p>
                                        </AnimateUp>
                                        <div className="searchheerim">
                                            <AnimateUp>
                                                <M5SearchDropdownContainer>
                                                    <M5SearchDropdownButton onClick={toggleDropdown}>
                                                        <p>{selectedOption} {isSearchDropdownVisible ? '▲' : '▼'} </p>
                                                    </M5SearchDropdownButton>
                                                    <M5SearchDropdownContent isVisible={isSearchDropdownVisible}>
                                                        <li>
                                                            <a onClick={() => handleOptionClick('All')}>All</a>
                                                            <a onClick={() => handleOptionClick('Project')}>Project</a>
                                                            <a onClick={() => handleOptionClick('News')}>News</a>
                                                            <a onClick={() => handleOptionClick('Leadership')}>Leadership</a>
                                                        </li>
                                                    </M5SearchDropdownContent>
                                                </M5SearchDropdownContainer>
                                                <M5SearchInput
                                                    type="text"
                                                    placeholder="Type here"
                                                    value={searchQuery}
                                                    onChange={handleSearchInputChange} // 검색 입력란 스타일 추가
                                                />
                                                <M5SearchButton className="searchheerim-button" onClick={() => { window.location.href = "/404"; }} style={{
                                                    background: "transparent", // Set the background to transparent
                                                    border: "none", // Remove the border
                                                    margin: "none",
                                                    borderBottom: "5px solid white",
                                                }}>
                                                    <img src="/icon/search.png" alt="Search Icon" />
                                                </M5SearchButton>
                                                <M5SearchTag>
                                                    <button onClick={() => { window.location.reload() }}><Link href="/Payvery">#Payvery</Link></button>
                                                    <button onClick={() => { window.location.reload() }}><Link href="/Purplevery">#Purplevery</Link></button>
                                                    <button onClick={() => { window.location.reload() }}><Link href="/Pg">#Pg</Link></button>
                                                    <button onClick={() => { window.location.reload() }}><Link href="/Payment_gateway">#Payment_gateway</Link></button>
                                                    <button onClick={() => { window.location.reload() }}><Link href="/Customer">#Customer</Link></button>
                                                </M5SearchTag>
                                            </AnimateUp>
                                        </div>
                                        <AnimateUp>
                                        </AnimateUp>
                                    </M5SearchContainer>
                                    <div className="bottom">
                                        <M5Contact>
                                            <div className="hq">
                                                <div className="address">
                                                    <div className="hq1">
                                                        <img src="/icon/location.png" alt="Location Icon" /> Add
                                                    </div>
                                                    <div className="hq1">
                                                        <img src="/icon/mobile.png" alt="Mobile Icon" /> Tel
                                                    </div>
                                                </div>
                                                <div className="address">
                                                    <div className="hq2">{langJson[lang]?.ADDRESS}</div>
                                                    <div className="hq2">070-8080-3499</div>
                                                </div>
                                            </div>
                                            <div className="sup">
                                                <div className="address">
                                                    <div className="hq3">
                                                        <img src="/icon/email.png" alt="Email Icon" /> E-mail</div>
                                                    <div className="hq3">
                                                        <img src="/icon/fax.png" alt="FAX Icon" /> FAX</div>
                                                </div>
                                                <div className="address">
                                                    <div className="hq4">purplevery222@gmail.com</div>
                                                    <div className="hq4">0504-144-9419</div>
                                                </div>
                                            </div>
                                        </M5Contact>
                                    </div>
                                </Mobile>
                            ) : (sections.map((section, index) => (
                                <div
                                    key={section}
                                    id={section}
                                    className={`section ${index === activeSection ? "active-section" : ""}`}
                                    ref={(el) => (sectionRefs.current[index] = el)}
                                >
                                    {index === 0 ? (
                                        <div className="section1" ref={refSection1}>
                                            <Section height="100vh" image="/image/galaxy.png">
                                                <AnimateUp>
                                                    <W1Title magtop="30vh" > {langJson[lang]?.FOLLOW}</W1Title>
                                                    <W1Title > {langJson[lang]?.SUPPORT}</W1Title>
                                                </AnimateUp>
                                                <W1ScrollDownYellowStick>
                                                    <p>S C R O L L D O W N </p>
                                                    <AnimateUp>
                                                        <span></span>
                                                    </AnimateUp>
                                                </W1ScrollDownYellowStick>
                                            </Section>
                                        </div>
                                    ) : index === 1 ? (
                                        <div className="section2" ref={refSection2}>
                                            <Section image="/image/blue.png">
                                                <div className="yellow">
                                                    <AnimateRight>
                                                        {/* 노란색 배경에 녹색 박스 모양의 텍스트 박스와 소제목, 설명 */}
                                                        <div className="yellow-box">
                                                            <p className="yellow-box-text">Who we are</p>
                                                        </div>
                                                    </AnimateRight>
                                                    <AnimateUp>
                                                        <div className="subtitle"> {langJson[lang]?.FOLLOW}</div>
                                                        <div className="subtitle"> {langJson[lang]?.SUPPORT}</div>
                                                        <div className="description" style={{ marginTop: '2vw' }}>{langJson[lang]?.DESCIRPTION}</div>
                                                        {/* 주제와 설명 */}
                                                    </AnimateUp>
                                                    <AnimateUp>
                                                        <TopicsContainer />
                                                    </AnimateUp>
                                                </div>
                                            </Section>
                                            <W2IconContainer>
                                                {/* 이전 버튼 */}
                                                <PrevButton className="prev-button" onClick={showPreviousIcons}>
                                                    <img src="/icon/prev.png" alt="Prev icon" />
                                                </PrevButton>
                                                {/* 아이콘 내용 */}
                                                {iconIndexes.map((iconIndex) => (
                                                    <W2IconButton
                                                        key={`icon-${iconIndex}`}
                                                        onClick={() => handleIconClick(iconIndex)}
                                                    >
                                                        <img
                                                            src={`/icon/${iconIndex}.svg`}
                                                            alt={`Icon ${iconIndex}`}
                                                        />
                                                        <div className="section2icon-description">
                                                            {/* 아이콘에 대한 설명 */}
                                                            {getIconDescription(iconIndex)}
                                                        </div>
                                                    </W2IconButton>
                                                ))}
                                                {/* 다음 버튼 */}
                                                <NextButton className="next-button" onClick={showNextIcons}>
                                                    <img src="/icon/next.png" alt="Next icon" />
                                                </NextButton>
                                            </W2IconContainer>
                                        </div>
                                    ) : index === 2 ? (
                                        <div className="section3" ref={refSection3}>
                                            <Section>
                                                <AnimateUp>
                                                    <div className="title">Our Service</div>
                                                </AnimateUp>
                                                <AnimateUp>
                                                    <div className="sec3description" style={{ color: "black", margin: "none" }}>{langJson[lang]?.DESCIRPTION}
                                                    </div>
                                                </AnimateUp>
                                                <AnimateUp>
                                                    <div className="image-container"
                                                        onMouseLeave={handleImageLeave}>
                                                        {hoveredImage ? (
                                                            <div className="hoverimage-container">
                                                                <a href={hoveredImageLink} onClick={() => { window.location.href = hoveredImageLink; }}>
                                                                    <img className="hoverimage" src={hoveredImage} alt="Hovered Image" />
                                                                </a>
                                                                {hoveredText && (
                                                                    <div className="image-text">
                                                                        {hoveredText}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <a
                                                                    className="image-button"
                                                                    onMouseEnter={() => handleImageHover("/image/image121.jpg", (
                                                                        <a href="https://www.youtube.com/watch?v=24MZgXC-it0">
                                                                            <div className="hoverimage-overlay" >
                                                                                <div className="hoverimage-text">
                                                                                    <p className="hoverplace">Incheon, Korea</p>
                                                                                    <p className="hoverbuilding">{langJson[lang]?.ICN}</p>
                                                                                    <p className="hoverbuilding">{langJson[lang]?.ICNA}</p>
                                                                                    <button className="hoverread-more-button">
                                                                                        <span className="hoverread-more-text">Read more</span>
                                                                                        <span className="hoverarrow-icon">→</span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    ), "https://www.youtube.com/watch?v=24MZgXC-it0")
                                                                    }
                                                                >
                                                                    <img src="/image/macbook.png" alt="Image 1" />
                                                                    <div className="image-overlay">
                                                                        <div className="image-text">
                                                                            <p className="place">Incheon, Korea</p>
                                                                            <p className="building">{langJson[lang]?.ICN}</p>
                                                                            <p className="building">{langJson[lang]?.ICNA}</p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a
                                                                    className="image-button"
                                                                    href="/404"
                                                                    onMouseEnter={() => handleImageHover("/image/image221.jpg", (
                                                                        <a href="https://www.youtube.com/watch?v=24MZgXC-it0">
                                                                            <div className="hoverimage-overlay">
                                                                                <div className="hoverimage-text">
                                                                                    <p className="hoverplace">Seoul, Korea</p>
                                                                                    <p className="hoverbuilding">{langJson[lang]?.YEOUIDO}</p>
                                                                                    <p className="hoverbuilding">{langJson[lang]?.ARTS}</p>
                                                                                    <button className="hoverread-more-button" onClick={() => { window.location.href = "/404"; }}>
                                                                                        <span className="hoverread-more-text">Read more</span>
                                                                                        <span className="hoverarrow-icon">→</span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    ), "https://www.youtube.com/watch?v=24MZgXC-it0")
                                                                    }
                                                                >
                                                                    <img src="/image/cardreader.png" alt="Image 2" />
                                                                    <div className="image-overlay">
                                                                        <div className="image-text">
                                                                            <p className="place">Seoul, Korea</p>
                                                                            <p className="building">{langJson[lang]?.YEOUIDO}</p>
                                                                            <p className="building">{langJson[lang]?.ARTS}</p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a
                                                                    className="image-button"
                                                                    href="/404"
                                                                    onMouseEnter={() => handleImageHover("/image/image321.jpg", (
                                                                        <a href="https://www.youtube.com/watch?v=24MZgXC-it0">
                                                                            <div className="hoverimage-overlay">
                                                                                <div className="hoverimage-text">
                                                                                    <p className="hoverplace">Seongnam, Korea</p>
                                                                                    <p className="hoverbuilding">{langJson[lang]?.HYUNDAI}</p>
                                                                                    <p className="hoverbuilding">{langJson[lang]?.CENTER}</p>
                                                                                    <button className="hoverread-more-button" onClick={() => { window.location.href = "/404"; }}>
                                                                                        <span className="hoverread-more-text">Read more</span>
                                                                                        <span className="hoverarrow-icon">→</span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    ), "https://www.youtube.com/watch?v=24MZgXC-it0")
                                                                    }
                                                                >
                                                                    <img src="/image/kiosk.png" alt="Image 3" />
                                                                    <div className="image-overlay">
                                                                        <div className="image-text">
                                                                            <p className="place">Seongnam, Korea</p>
                                                                            <p className="building">{langJson[lang]?.HYUNDAI}</p>
                                                                            <p className="building">{langJson[lang]?.CENTER}</p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a
                                                                    className="image-button"
                                                                    href="/404"
                                                                    onMouseEnter={() => handleImageHover("/image/image421.jpg", (
                                                                        <a href="https://www.youtube.com/watch?v=24MZgXC-it0">
                                                                            <div className="hoverimage-overlay">
                                                                                <div className="hoverimage-text">
                                                                                    <p className="hoverplace">Baku, Azerbaijan</p>
                                                                                    <p className="hoverbuilding">{langJson[lang]?.SOCAR}</p>
                                                                                    <button className="hoverread-more-button" onClick={() => { window.location.href = "/404"; }}>
                                                                                        <span className="hoverread-more-text">Read more</span>
                                                                                        <span className="hoverarrow-icon">→</span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    ), "https://www.youtube.com/watch?v=24MZgXC-it0")
                                                                    }
                                                                >
                                                                    <img src="/image/scanner.png" alt="Image 4" />
                                                                    <div className="image-overlay">
                                                                        <div className="image-text">
                                                                            <p className="place">Baku, Azerbaijan</p>
                                                                            <p className="building">{langJson[lang]?.SOCAR}</p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </>
                                                        )}
                                                    </div>
                                                </AnimateUp>
                                            </Section>
                                        </div>
                                    ) : index === 3 ? (
                                        <div className="section4">
                                            <Section >
                                                {/* 뉴스 아이템 리스트 */}
                                                <div className="news-list">
                                                    <AnimateUp>
                                                        {/* 첫 번째 행 */}
                                                        <div className="news-row">
                                                            {/* 뉴스 아이템 1 */}
                                                            <a href="/news1" className="news-item">
                                                                <div className="news-box">
                                                                    <p className="news-text">News</p>
                                                                </div>
                                                                <p className="news-title">{langJson[lang]?.FIRSTNEWS}
                                                                </p>
                                                                <span className="news-more-link"> Read more</span>
                                                                <span className="arrow-icon" style={{ marginLeft: "20px", color: "orange", fontWeight: "bold" }}>→</span>
                                                            </a>
                                                            {/* 뉴스 아이템 2 */}
                                                            <a href="/news2" className="news-item">
                                                                <div className="news-box">
                                                                    <p className="news-text">News</p>
                                                                </div>
                                                                <p className="news-title">{langJson[lang]?.SECONDNEWS}
                                                                </p>
                                                                <span className="news-more-link"> Read more</span>
                                                                <span className="arrow-icon" >→</span>
                                                            </a>
                                                            {/* 뉴스 아이템 3 */}
                                                            <a href="/news3" className="news-item">
                                                                <div className="news-box">
                                                                    <p className="news-text">News</p>
                                                                </div>
                                                                <p className="news-title">{langJson[lang]?.THIRDNEWS}
                                                                </p>
                                                                <span className="news-more-link"> Read more</span>
                                                                <span className="arrow-icon" >→</span>
                                                            </a>
                                                        </div>
                                                    </AnimateUp>
                                                    {/* 두 번째 행 */}
                                                    <AnimateUp>
                                                        <div className="news-row">
                                                            {/* 뉴스 아이템 4 */}
                                                            <a href="/news4" className="news-item">
                                                                <div className="news-box">
                                                                    <p className="news-text">News</p>
                                                                </div>
                                                                <p className="news-title">{langJson[lang]?.FOURTHNEWS}
                                                                </p>
                                                                <span className="news-more-link"> Read more</span>
                                                                <span className="arrow-icon">→</span>
                                                            </a>
                                                            {/* 뉴스 아이템 5 */}
                                                            <a href="/news5" className="news-item">
                                                                <div className="news-box">
                                                                    <p className="news-text">News</p>
                                                                </div>
                                                                <p className="news-title">{langJson[lang]?.FIFTHNEWS}
                                                                </p>
                                                                <span className="news-more-link"> Read more</span>
                                                                <span className="arrow-icon" >→</span>
                                                            </a>
                                                            {/* 뉴스 아이템 6 */}
                                                            <a href="/news6" className="news-item">
                                                                <div className="news-box">
                                                                    <p className="news-text">News</p>
                                                                </div>
                                                                <p className="news-title">{langJson[lang]?.SIXTHNEWS}
                                                                </p>
                                                                <span className="news-more-link"> Read more</span>
                                                                <span className="arrow-icon" >→</span>
                                                            </a>
                                                        </div>
                                                    </AnimateUp>
                                                </div>
                                                {/* 뉴스 액자 버튼 */}
                                                <AnimateUp>
                                                    <div className="newsbutton-container">
                                                        {/* news1 버튼 */}
                                                        <a className="newsbutton" href="https://www.youtube.com/watch?v=OLrv8OGTUnQ" target="_blank" rel="noopener noreferrer">
                                                            <img src="/image/newsimage1.png" alt="youtube1 Image" />
                                                        </a>
                                                        {/* news2 버튼 */}
                                                        <a className="newsbutton" style={{ marginLeft: "15px" }} href="https://www.youtube.com/watch?v=REof-nC8Ck8&feature=youtu.be" target="_blank" rel="noopener noreferrer">
                                                            <img src="/image/newsimage2.png" alt="youtube2 Image" />
                                                        </a>
                                                        {/* news3 버튼 */}
                                                        <a className="newsbutton" style={{ marginLeft: "15px" }} href="https://www.youtube.com/watch?v=Lu8uHwNpHEQ" target="_blank" rel="noopener noreferrer">
                                                            <img src="/image/newsimage3.png" alt="youtube3 Image" />
                                                        </a>
                                                    </div>
                                                </AnimateUp>
                                                <AnimateUp>
                                                    <div className="sec5title">
                                                        <span class="bold-text">성공</span>으로 가는 과정을 계획하는데 <span class="bold-text">함께</span>하겠습니다.
                                                    </div>
                                                </AnimateUp>
                                                <div className="searchheerim-container">
                                                    <AnimateUp>
                                                        <span className="search-title">Search
                                                        </span>
                                                        <span className="search-title2 " style={{ marginLeft: "10px" }}>Payvery.com
                                                        </span>
                                                    </AnimateUp>
                                                    <AnimateUp>
                                                        <p className="searchsub">Creative Leadership of Payvery designs the new future never experienced before.</p>
                                                    </AnimateUp>
                                                    <AnimateUp>
                                                        <div className="searchheerim">
                                                            <div style={{ display: "flex" }}>
                                                                <WSearchDropdownContainer>
                                                                    <WSearchDropdownButton onClick={toggleDropdown}>
                                                                        <p>{selectedOption}{isSearchDropdownVisible ? '▲' : '▼'}</p>
                                                                    </WSearchDropdownButton>
                                                                    <WSearchDropdownContent isVisible={isSearchDropdownVisible}>
                                                                        <li>
                                                                            <a onClick={() => handleOptionClick('All')}>All</a>
                                                                            <a onClick={() => handleOptionClick('Project')}>Project</a>
                                                                            <a onClick={() => handleOptionClick('News')}>News</a>
                                                                            <a onClick={() => handleOptionClick('Leadership')}>Leadership</a>
                                                                        </li>
                                                                    </WSearchDropdownContent>
                                                                </WSearchDropdownContainer>
                                                                <input
                                                                    className="searchheerim-input"
                                                                    type="text"
                                                                    placeholder="Type here"
                                                                    value={searchQuery}
                                                                    onChange={handleSearchInputChange} // 검색 입력란 스타일 추가
                                                                />
                                                                <WSearchButton className="searchheerim-button" onClick={() => { window.location.href = "/404"; }} style={{
                                                                    background: "transparent",
                                                                    border: "none",
                                                                    color: "white",
                                                                    borderBottom: "5px solid white",
                                                                }}>
                                                                    Search
                                                                    <img src="/icon/search.png" alt="Search Icon" />
                                                                </WSearchButton>
                                                            </div>
                                                            <div className="searchtag-keywords">
                                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Payvery">#Payvery</Link></button>
                                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Purplevery">#Purplevery</Link></button>
                                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Pg">#Pg</Link></button>
                                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Payment_gateway">#Payment_gateway</Link></button>
                                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Customer">#Customer</Link></button>
                                                            </div>
                                                        </div>
                                                    </AnimateUp>
                                                </div>
                                                <div className="bottom">
                                                    <div className="seoulhqsupport">
                                                        <div className="hq">
                                                            <div className="address">
                                                                <div className="hq1">
                                                                    <img src="/icon/location.png" alt="Location Icon" /> Add
                                                                </div>
                                                                <div className="hq1">
                                                                    <img src="/icon/mobile.png" alt="Mobile Icon" /> Tel
                                                                </div>
                                                            </div>
                                                            <div className="address">
                                                                <div className="hq2">{langJson[lang]?.ADDRESS}</div>
                                                                <div className="hq2">070-8080-3499</div>
                                                            </div>
                                                        </div>
                                                        <div className="sup">
                                                            <div className="address">
                                                                <div className="hq3">
                                                                    <img src="/icon/email.png" alt="Email Icon" /> E-mail</div>
                                                                <div className="hq3">
                                                                    <img src="/icon/fax.png" alt="FAX Icon" /> FAX</div>
                                                            </div>
                                                            <div className="address">
                                                                <div className="hq4">purplevery222@gmail.com</div>
                                                                <div className="hq4">0504-144-9419</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Section>
                                        </div>
                                    ) : (
                                        <div>{ }</div>
                                    )}
                                </div>
                            ))
                            )}
                        </div>
                    </>
                </UserLayout>
            )}
        </>
    );
};
export default Home;