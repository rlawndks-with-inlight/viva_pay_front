// pages/home.js
import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import UserLayout from 'src/layouts/UserLayout';
import langJson from 'src/data/lang.json'
import { useRouter } from "next/router";
import styled from "styled-components";
const sections = ["section1", "section2", "section3", "section4", "section5"]; // 섹션 이름
const totalIcons = 16; // 총 아이콘 개수
const iconsPerPageLarge = 6; // 큰 화면에서 표시할 아이콘 개수
const iconsPerPageSmall = 4; // 작은 화면에서 표시할 아이콘 개수

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
@media only screen and (max-width: 320px) {
    font-size: 15vw;
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
`
const M2Subtitle = styled.div`
margin-left: 0.8em;
font-size: 3em;
font-weight: bold;
font-family: 'Playfair Display', serif;
color: white;
`
const M2Description = styled.div`
margin-left: 1.7em;
font-size: 1.5em;
color: white;
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
@media only screen and (min-width: 540px) {
  }
  }
  div{
position: absolute;
left: 5%;
margin-top: 14em;
background: transparent; /* 투명한 배경 */
z-index: 5;
color: white;
@media only screen and (width: 540px), (height: 720px) {
margin-top: 95px;
  }
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
overflow: hidden; 
white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
width: 100%; /* 100% 너비로 설정 또는 원하는 너비로 설정 */
`
const M4Button = styled.a`
display: inline-block; /* 인라인 블록 요소로 만들어 옆에 다른 요소가 올 수 있도록 합니다. */
`
const M5Title = styled.div`
font-size: 1em;
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
    font-size: 2em;
    font-weight: bold;
}
p{
  font-size: 0.8em;
  margin-left: 12vw;
  color: #CACACA;
}
@media only screen and (max-width: 360px) {
    span{
        font-size: 9vw;
    }
}
`
const M5SearchInput = styled.input`
background: transparent; /* 투명 배경 추가 */
border: none;
border-bottom: 0.3em solid white; /* 하단 테두리 추가 (선택 사항) */
width: 65%; /* 검색창의 가로 너비 조정 */
height: 1.3em;
font-size: 1.2em; /* 폰트 크기 키우기 */
margin-top: 2.5em; /* 위쪽 여백 추가 */
margin-left: 11vw;
padding-left: 0.7em;
::placeholder{
    color: white;
}
`
const M5SearchTag = styled.div`
padding: 5vw 0 5vw 0;
margin-left: 10vw;
button{
border: none; /* 외곽선 없애기 */
font-size: 0.9em;
background-color: transparent;
    a{
  color: #CACACA;
text-decoration: none;
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
height: 100vh;
background-size: cover;
background-color: ${(props) => props.background};
background-image:  url(${props => props.image});
overflow: hidden;
@media only screen and (max-width: 320px) {
}
`
const W1Title = styled.div`
margin-top: ${(props) => props.magtop};
margin-left: 9.5vw;
font-size: 3.1em;
font-weight: bold;
font-family: 'Playfair Display', serif;
border: 1px solid transparent;
color: white;
`
/* 2section sec2 2섹션 스타일  */

const W2IconButton = styled.button`
border: none;
background-color: transparent;
font-size: 0.9em;
font-weight: bold;
margin-bottom: 4vh;
cursor: pointer;
@media only screen and (max-width: 600px) {
  margin: 0 0 5vh 0;
  font-size: 2vw;
}
    img{
  width: 10vh;
  height: 10vh;

    @media only screen and (max-width: 600px) {
        margin: 0;
        width: 12vw;
        height: 12vw;
    }

    }
`
const PrevButton = styled.button`
border: none;
cursor: pointer;
margin-bottom: 4vh;
margin-left: 20%;
z-index: 1;
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
z-index: 1;
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
const SearchButton = styled.button`
cursor: pointer;
    img{
        width: 20px;
        height: 20px;
    }
`
const Topic = ({ title, initialValue, finalValue, inView }) => {
    const [currentValue, setCurrentValue] = useState(inView && window.innerWidth <=930 ? initialValue : finalValue);

    useEffect(() => {
        // 화면 너비가 930 이상일 때만 실행
        if (window.innerWidth >= 930) {
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
        }
    }, [inView, currentValue, finalValue, initialValue]);

    const addPlusSign = title === "History of Payvery" || title === "Professional Employees" || title === "Overseas Projects";

    return (
        <div>
            <p className="topic-title">{title}</p>
            <p className='topic-number'>
                {addPlusSign ? Math.round(currentValue) + "+" : Math.round(currentValue)}
            </p>
        </div>
    );
};


const TopicsContainer = ({ inView }) => {
    const isWideScreen = window.innerWidth >= 930;
    return (
        <div className={`topics-container ${inView && isWideScreen ? "in-view" : ""}`}>
            <Topic title="History of Payvery" initialValue={0} finalValue={50} inView={inView && isWideScreen} />
            <Topic title="Branch offices" initialValue={0} finalValue={15} inView={inView && isWideScreen} />
            <Topic title="Professional Employees" initialValue={0} finalValue={1400} inView={inView && isWideScreen} />
            <Topic title="Overseas Projects" initialValue={0} finalValue={300} inView={inView && isWideScreen} />
            <Topic title="World Ranking" initialValue={0} finalValue={8} inView={inView && isWideScreen} />
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
    const [inViewItems2, setInViewItems2] = useState([]);
    const [inViewItems3, setInViewItems3] = useState([]);
    const [inViewItems4, setInViewItems4] = useState([]);
    const [inViewItems5, setInViewItems5] = useState([]);
    const [section2InView, setSection2InView] = useState(false);
    const [section3InView, setSection3InView] = useState(false);
    const [section4InView, setSection4InView] = useState(false);
    const [section5InView, setSection5InView] = useState(false);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [hoveredText, setHoveredText] = useState(null);
    const [windowWidth, setWindowWidth] = useState(0); // 초기 화면 너비 설정
    const [windowHeight, setWindowHeight] = useState(0); // 초기 화면 높이 설정
    let isSmoothScrollEnabled = activeSection < 2; // 섹션 2까지만 부드러운 스크롤 활성화

    const handleImageHover = (imageSrc, text) => {
        setHoveredImage(imageSrc);
        setHoveredText(text);
    };

    const handleImageLeave = () => {
        setHoveredImage(null);
        setHoveredText(null);
    };

    // 숫자 0부터 증가하는 애니메이션
    useEffect(() => {
        const handleScroll = () => {
            const section2 = document.getElementById("section2");
            if (section2) {
                const rect = section2.getBoundingClientRect();
                const isSection2InView = rect.top >= 0 && rect.bottom <= window.innerHeight;
                if (isSection2InView !== section2InView) {
                    setSection2InView(isSection2InView);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [section2InView]);

    useEffect(() => {
        if (section2InView) {
            setInViewItems2([""]); // section2가 화면에 나타날 때 inViewItems2를 업데이트
        }
    }, [section2InView]);

    // fade-in 애니메이션
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth >= 930) {
                const updatedInViewItems3 = [];
                const updatedInViewItems4 = [];
                const updatedInViewItems5 = [];
                const fadeIn3 = document.querySelectorAll(".section3");
                const fadeIn4 = document.querySelectorAll(".section4");
                const fadeIn5 = document.querySelectorAll(".section5");


                fadeIn3.forEach((item3) => {
                    const itemRect3 = item3.getBoundingClientRect();
                    if (itemRect3.top < window.innerHeight && itemRect3.bottom >= 0) {
                        updatedInViewItems3.push(item3.id);
                    }
                });

                fadeIn4.forEach((item4) => {
                    const itemRect4 = item4.getBoundingClientRect();
                    if (itemRect4.top < window.innerHeight && itemRect4.bottom >= 0) {
                        updatedInViewItems4.push(item4.id);
                    }
                });

                fadeIn5.forEach((item5) => {
                    const itemRect5 = item5.getBoundingClientRect();
                    if (itemRect5.top < window.innerHeight && itemRect5.bottom >= 0) {
                        updatedInViewItems5.push(item5.id);
                    }
                });

                setInViewItems3(updatedInViewItems3);
                setInViewItems4(updatedInViewItems4);
                setInViewItems5(updatedInViewItems5);
            }
        };

        // 스크롤 이벤트 리스너 등록
        window.addEventListener("scroll", handleScroll);

        // 컴포넌트가 언마운트되면 이벤트 리스너 제거
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
            6: "/https://www.heerim.com/kr/project/project_list.php?cate=7",
            7: "/https://www.heerim.com/kr/project/project_list.php?cate=8",
            8: "/https://www.heerim.com/kr/project/project_list.php?cate=9",
            9: "/https://www.heerim.com/kr/project/project_list.php?cate=10",
            10: "/https://www.heerim.com/kr/project/project_list.php?cate=11",
            11: "/https://www.heerim.com/kr/project/project_list.php?cate=12",
            12: "/https://www.heerim.com/kr/project/project_list.php?cate=13",
            13: "/https://www.heerim.com/kr/project/project_list.php?cate=14",
            14: "/https://www.heerim.com/kr/project/project_list.php?cate=15",
            15: "/https://www.heerim.com/kr/project/project_list.php?cate=16",
            16: "/https://www.heerim.com/kr/project/project_list.php?cate=17",
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
            6: "description6",
            7: "description7",
            8: "description8",
            9: "description9",
            10: "description10",
            11: "description11",
            12: "description12",
            13: "description13",
            14: "description14",
            15: "description15",
            16: "description16",
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

            // 화면 너비가 1300 이하인 경우 아이콘 개수를 작게 설정, 그렇지 않으면 크게 설정
            if (window.innerWidth <= 1300 || window.innerHeight <= 800) {
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

            // 화면 크기가 1300 보다 큰 경우에만 스크롤 이벤트 리스너 추가
            if (windowWidth > 1300 && windowHeight >= 800) {
                window.addEventListener("wheel", handleScroll, { passive: false });
            }
        }

        // 이 컴포넌트가 언마운트될 때 이벤트 리스너 정리
        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
            window.removeEventListener("wheel", handleScroll);
        };
    }, [activeSection, loading, windowWidth, windowHeight]);

    const updateWindowDimensions = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };
    
    
    const handleScroll = (e) => {
        if (windowWidth > 1300 || windowHeight >= 800) {
            // 스크롤 이벤트를 중지합니다.
            e.preventDefault();
    
            if (isSmoothScrollEnabled) {
                // 마우스 휠 방향에 따라 이동할 섹션을 결정합니다.
                let newActiveSection = activeSection;
                if (e.deltaY > 0 && activeSection < sections.length - 1) {
                    newActiveSection = activeSection + 1;
                } else if (e.deltaY < 0 && activeSection > 0) {
                    newActiveSection = activeSection - 1;
                }
    
                // 새로운 활성 섹션을 설정합니다.
                setActiveSection(newActiveSection);
    
                // 화면을 스크롤하여 새로운 섹션의 가운데로 이동합니다.
                const element = sectionRefs.current[newActiveSection];
                if (element) {
                    const sectionTop = element.offsetTop;
                    const sectionHeight = element.clientHeight;
                    const screenCenter = windowHeight / 2;
                    const scrollToY = sectionTop + sectionHeight / 2 - screenCenter;
    
                    // Check screen width before scrolling
                    window.scrollTo({ top: scrollToY, behavior: "smooth" });
                }
    
                // 섹션 2 이후로는 일반 스크롤 동작을 활성화합니다.
                if (newActiveSection > 2) {
                    isSmoothScrollEnabled = false;
                }
            } else if (activeSection !== 1 && activeSection !== 2) {
                // 현재 섹션이 1 또는 2가 아닌 경우에만 일반 스크롤 동작을 수행합니다.
                // 이전 또는 다음 섹션으로 이동하는 기능을 추가할 필요가 없습니다.
            }
        }
    };
    
    // 이후의 스크롤 이벤트를 처리할 때, 이전에 설정한 스크롤 핸들러를 제거합니다.
    useEffect(() => {
        if (!isSmoothScrollEnabled) {
            window.removeEventListener("wheel", handleScroll);
        } else {
            window.addEventListener("wheel", handleScroll);
        }
    }, [isSmoothScrollEnabled]);
    
    

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

    const isMobile = typeof window !== "undefined" ? window.innerWidth <= 930 : false;
    const initialValueForMobile = 50; // 예를 들어, 초기값을 변경하려면 여기에 값을 설정
    const initialValue = isMobile ? initialValueForMobile : 0;
    return (
        <>
            {!loading && (
                <UserLayout activeSection={activeSection}>
                    <>
                        <div className="layout">
                            {isMobile ? (
                                <Mobile>
                                    <M1>
                                        <M1Title>{langJson[lang]?.FOLLOW}</M1Title>
                                        <M1Title style={{ marginTop:"0", marginBottom: "5em" }}> {langJson[lang]?.SUPPORT}</M1Title>
                                    </M1>
                                    <M2>
                                        <M2YellowBox><p>Who we are</p></M2YellowBox>
                                        <M2Subtitle> {langJson[lang]?.FOLLOW}</M2Subtitle>
                                        <M2Subtitle> {langJson[lang]?.SUPPORT}</M2Subtitle>
                                        <M2Description>{langJson[lang]?.DESCIRPTION}</M2Description>
                                        <TopicsContainer />
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
                                                    src={`/icon/${iconIndex}.png`}
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
                                        <M3Title>Our Service</M3Title>
                                        <M3Subtitle>Follow your dream. We support your dream.</M3Subtitle>
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
                                    </M3>
                                    <NewsList>
                                        {/* 뉴스 아이템 1 */}
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
                                        {/* 뉴스 아이템 2 */}
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
                                        {/* 뉴스 아이템 3 */}
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
                                        {/* 뉴스 아이템 4 */}
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
                                        {/* 뉴스 아이템 5 */}
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
                                        {/* 뉴스 아이템 6 */}
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
                                    </NewsList>
                                    <M4ButtonContainer>
                                        {/* news1 버튼 */}
                                        <M4Button className="newsbutton" href="https://www.youtube.com/watch?v=OLrv8OGTUnQ" target="_blank" rel="noopener noreferrer">
                                            <img src="/image/newsimage1.png" alt="youtube1 Image" />
                                        </M4Button>
                                        {/* news2 버튼 */}
                                        <M4Button className="newsbutton" style={{ marginLeft: "15px" }} href="https://www.youtube.com/watch?v=REof-nC8Ck8&feature=youtu.be" target="_blank" rel="noopener noreferrer">
                                            <img src="/image/newsimage2.png" alt="youtube2 Image" />
                                        </M4Button>
                                        {/* news3 버튼 */}
                                        <M4Button className="newsbutton" style={{ marginLeft: "15px" }} href="https://www.youtube.com/watch?v=Lu8uHwNpHEQ" target="_blank" rel="noopener noreferrer">
                                            <img src="/image/newsimage3.png" alt="youtube3 Image" />
                                        </M4Button>
                                    </M4ButtonContainer>
                                    <M5Title>
                                        <span>성공</span>으로 가는 과정을 계획하는데 <span>함께</span>하겠습니다.
                                    </M5Title>
                                    <M5SearchContainer>
                                        <span style={{ marginLeft: "12vw", color: "#FFC200" }}>Search</span>
                                        <span style={{ color: "white" }}>Payvery.com</span>
                                        <p>Creative Leadership of Payvery designs the new future never experienced before.</p>
                                        <div className="searchheerim">
                                            <M5SearchInput
                                                type="text"
                                                placeholder="Type here"
                                                value={searchQuery}
                                                onChange={handleSearchInputChange} // 검색 입력란 스타일 추가
                                            />
                                            <SearchButton className="searchheerim-button" onClick={() => { window.location.href = "/404"; }} style={{
                                                background: "transparent", // Set the background to transparent
                                                border: "none", // Remove the border
                                                borderBottom: "5px solid white",
                                            }}>
                                                <img src="/icon/search.png" alt="Search Icon" />
                                            </SearchButton>
                                        </div>
                                        <M5SearchTag>
                                            <button onClick={() => { window.location.reload() }}><Link href="/Payvery">#Payvery</Link></button>
                                            <button onClick={() => { window.location.reload() }}><Link href="/Purplevery">#Purplevery</Link></button>
                                            <button onClick={() => { window.location.reload() }}><Link href="/Pg">#Pg</Link></button>
                                            <button onClick={() => { window.location.reload() }}><Link href="/Payment_gateway">#Payment_gateway</Link></button>
                                            <button onClick={() => { window.location.reload() }}><Link href="/Customer">#Customer</Link></button>
                                        </M5SearchTag>
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
                                        <div className="section1">
                                        <Section height="100vh" image="/image/galaxy.png">
                                            <W1Title magtop="4em" > {langJson[lang]?.FOLLOW}</W1Title>
                                            <W1Title magtop="2em" > {langJson[lang]?.SUPPORT}</W1Title>
                                        </Section>
                                        </div>
                                    ) : index === 1 ? (
                                        <div className="section2">
                                        <Section image="/image/blue.png">
                                            <div className="yellow">
                                                {/* 노란색 배경에 녹색 박스 모양의 텍스트 박스와 소제목, 설명 */}
                                                <div className={`yellow-box ${inViewItems2.includes("") ? "in-view" : ""}`}>
                                                    <p className="yellow-box-text">Who we are</p>
                                                </div>
                                                <div className={`subtitle ${inViewItems2.includes("") ? "in-view" : ""}`}> {langJson[lang]?.FOLLOW}</div>
                                                <div className={`subtitle ${inViewItems2.includes("") ? "in-view" : ""}`} style={{ marginTop: "1em" }}> {langJson[lang]?.SUPPORT}</div>
                                                <div className={`description ${inViewItems2.includes("") ? "in-view" : ""}`} style={{ marginTop: '2vw' }}>{langJson[lang]?.DESCIRPTION}</div>
                                                {/* 주제와 설명 */}
                                                <div>
                                                    <TopicsContainer inView={inViewItems2.includes("")} />
                                                </div>
                                                <div className="icon-container">
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
                                                                src={`/icon/${iconIndex}.png`}
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
                                                </div>
                                            </div>
                                        </Section>
                                        </div>
                                    ) : index === 2 ? (
                                        <div className="section3">
                                        <Section>
                                            <div className="title">Our Service
                                            </div>
                                            <div className="sec3description"style={{ color: "black", margin: "none" }}>{langJson[lang]?.DESCIRPTION}
                                            </div>
                                            <div className="image-container"
                                                onMouseLeave={handleImageLeave}>
                                                {hoveredImage ? (
                                                    <div className="hoverimage-container">
                                                        <img className="hoverimage" src={hoveredImage} alt="Hovered Image" />
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
                                                            href="/404"
                                                            onMouseEnter={() => handleImageHover("/image/image121.jpg", (
                                                                <div className="hoverimage-overlay">
                                                                    <div className="hoverimage-text">
                                                                        <p className="hoverplace">Incheon, Korea</p>
                                                                        <p className="hoverbuilding">{langJson[lang]?.ICN}</p>
                                                                        <p className="hoverbuilding">{langJson[lang]?.ICNA}</p>
                                                                        <button className="hoverread-more-button" onClick={() => { window.location.href = "/404"; }}>
                                                                            <span className="hoverread-more-text">Read more</span>
                                                                            <span className="hoverarrow-icon">→</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))
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
                                                            ))
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
                                                            ))
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
                                                            ))
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
                                        </Section>
                                        </div>
                                    ) : index === 3 ? (
                                        <div className="section4">
                                        <Section >
                                            {/* 뉴스 아이템 리스트 */}
                                            <div className="news-list">
                                                {/* 첫 번째 행 */}
                                                <div className="news-row">
                                                    {/* 뉴스 아이템 1 */}
                                                    <a href="/404" className="news-item">
                                                        <div className="news-box">
                                                            <p className="news-text">News</p>
                                                        </div>
                                                        <p className="news-title">{langJson[lang]?.FIRSTNEWS}
                                                        </p>
                                                        <span className="news-more-link"> Read more</span>
                                                        <span className="arrow-icon" style={{ marginLeft: "20px", color: "orange", fontWeight: "bold" }}>→</span>
                                                    </a>
                                                    {/* 뉴스 아이템 2 */}
                                                    <a href="/404" className="news-item">
                                                        <div className="news-box">
                                                            <p className="news-text">News</p>
                                                        </div>
                                                        <p className="news-title">{langJson[lang]?.SECONDNEWS}
                                                        </p>
                                                        <span className="news-more-link"> Read more</span>
                                                        <span className="arrow-icon" >→</span>
                                                    </a>
                                                    {/* 뉴스 아이템 3 */}
                                                    <a href="/404" className="news-item">
                                                        <div className="news-box">
                                                            <p className="news-text">News</p>
                                                        </div>
                                                        <p className="news-title">{langJson[lang]?.THIRDNEWS}
                                                        </p>
                                                        <span className="news-more-link"> Read more</span>
                                                        <span className="arrow-icon" >→</span>
                                                    </a>
                                                </div>
                                                {/* 두 번째 행 */}
                                                <div className="news-row">
                                                    {/* 뉴스 아이템 4 */}
                                                    <a href="/404" className="news-item">
                                                        <div className="news-box">
                                                            <p className="news-text">News</p>
                                                        </div>
                                                        <p className="news-title">{langJson[lang]?.FOURTHNEWS}
                                                        </p>
                                                        <span className="news-more-link"> Read more</span>
                                                        <span className="arrow-icon">→</span>
                                                    </a>
                                                    {/* 뉴스 아이템 5 */}
                                                    <a href="/404" className="news-item">
                                                        <div className="news-box">
                                                            <p className="news-text">News</p>
                                                        </div>
                                                        <p className="news-title">{langJson[lang]?.FIFTHNEWS}
                                                        </p>
                                                        <span className="news-more-link"> Read more</span>
                                                        <span className="arrow-icon" >→</span>
                                                    </a>
                                                    {/* 뉴스 아이템 6 */}
                                                    <a href="/404" className="news-item">
                                                        <div className="news-box">
                                                            <p className="news-text">News</p>
                                                        </div>
                                                        <p className="news-title">{langJson[lang]?.SIXTHNEWS}
                                                        </p>
                                                        <span className="news-more-link"> Read more</span>
                                                        <span className="arrow-icon" >→</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div style={{}}>
                                                {/* 뉴스 액자 버튼 */}
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
                                            </div>
                                            
                                            <div className="sec5title">
                                                <span class="bold-text">성공</span>으로 가는 과정을 계획하는데 <span class="bold-text">함께</span>하겠습니다.
                                            </div>
                                            <div className="searchheerim-container">
                                                <span className="search-title">Search
                                                </span>
                                                <span className="search-title2 " style={{ marginLeft: "10px" }}>Payvery.com
                                                </span>
                                                <p className="searchsub">Creative Leadership of Payvery designs the new future never experienced before.</p>
                                                <div className="searchheerim">
                                                    <input
                                                        className="searchheerim-input"
                                                        type="text"
                                                        placeholder="Type here"
                                                        value={searchQuery}
                                                        onChange={handleSearchInputChange} // 검색 입력란 스타일 추가
                                                    />
                                                    <SearchButton className="searchheerim-button" onClick={() => { window.location.href = "/404"; }} style={{
                                                        background: "transparent", // Set the background to transparent
                                                        border: "none", // Remove the border
                                                        color: "white",
                                                        borderBottom: "5px solid white",
                                                    }}>
                                                        Search
                                                        <img src="/icon/search.png" alt="Search Icon" />
                                                    </SearchButton>
                                                </div>
                                                <div className="searchtag-keywords">
                                                    <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Payvery">#Payvery</Link></button>
                                                    <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Purplevery">#Purplevery</Link></button>
                                                    <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Pg">#Pg</Link></button>
                                                    <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Payment_gateway">#Payment_gateway</Link></button>
                                                    <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Customer">#Customer</Link></button>
                                                </div>
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
                                        <div>{}</div>
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
Home.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Home;