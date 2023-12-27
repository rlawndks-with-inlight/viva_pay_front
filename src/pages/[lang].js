// pages/home.js
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import UserLayout from 'src/layouts/UserLayout';
import langJson from 'src/data/lang.json';
import IconSlide from "src/components/Section2IconSlide";
import { Section3Title } from "src/components/Section3";
import Accordion from "src/components/Section3Accordion";
import { NewsItem, NewsButton } from "/src/components/Section4";
import { Search, Section5Title } from "src/components/Section5";
import HQ from "src/components/HQ";
import { Section2Content } from "src/components/Mobile/MobileSection2Content";
import { MobileIconSlide } from "src/components/Mobile/MobileSection2IconSlide";
import MobileAccordion from "src/components/Mobile/MobileSection3Accordion";
import { MobileNewsItem, MobileNewsButton } from "src/components/Mobile/MobileSection4";
import { MobileSearch } from "/src/components/Mobile/MobileSection5";
import styled from "styled-components";
import { useInView } from 'react-intersection-observer'; // react-intersection-observer 라이브러리 사용
import { IconSlideDemo } from "src/components/IconSlideDemo";
const sections = ["section1", "section2", "section3", "section4", "section5"]; // 섹션 이름

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
margin-left: 14vw;
font-size:3.1em;
font-weight: bold;
font-family: 'Playfair Display', serif;
color: white;
@media only screen and (max-width: 430px) {
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
const M4NewsList = styled.div`
margin-left: 10%;
margin-right: 10%;
text-align: left;
a{
    background-color: transparent;
    text-decoration: none;
}
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
const M5Contact = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 2em;
margin-left: 2vw;
`
const Section = styled.section`
width: 100%;
position: relative;
overflow: hidden;
height: ${(props) => props.height};
background-size: cover;
background-image:  url(${props => props.image});
`
const W1Title = styled.span`
display: block;
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
bottom: -100px;
right: 10%;
text-align: center;
p{
font-weight: bold;
color:white ;
writing-mode: vertical-rl; /* 세로로 글자 눕힘 */
  font-size: 10px; /* 원하는 글자 크기로 조절 */
  animation: moveUpDown 2.5s infinite; /* 1s 동안 무한 반복되는 애니메이션 */
  margin: 0; /* 기본 마진을 제거합니다. */
}
span{
display: block;
height: 14em;
width: 10px;
background-color:  rgb(255, 194, 0);
}
/* 파랑색 코드 rgb(0, 104, 232) 노랑색 코드 rgb(255, 194, 0) */
/* 모바일 화면에서 숨김 */
  @media only screen and (max-width: 730px), (max-height: 600px) {
    display: none;
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
    const { lang = 'en' } = router.query;
    const [activeSection, setActiveSection] = useState(0); // 활성 섹션 인덱스
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0); // 초기 화면 너비 설정
    const [windowHeight, setWindowHeight] = useState(0); // 초기 화면 높이 설정
    const sectionRefs = useRef([]); // 섹션의 ref를 추적
    const [hoverIndex, setHoverIndex] = useState(false);
    const [hoverTxtIndex, sethoverTxtIndex] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    const handleItemEnter = (index) => {
        setHoverIndex(index);
        sethoverTxtIndex(index);
    };

    useEffect(() => {
        if (!isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setIsAnimating(false);
            }, 1000);
        }
    }, [isAnimating]);

    const accordionItems = [
        {
            category: 'Incheon, Korea',
            title: [langJson[lang]?.ICN],
        }, {
            category: 'Seoul, Korea',
            title: [langJson[lang]?.YEOUIDO],
        }, {
            category: 'Gwacheon, Korea',
            title: [langJson[lang]?.HYUNDAI],
        }, {
            category: 'Baku, Azerbaijan',
            title: [langJson[lang]?.SOCAR],
        },
    ];

    const handleItemOver = (index) => {
        setHoverIndex(index);
    };
    const accordionImages = [
        {
            outerBackground: '/image/outer1.png',
            innerBackground: '/image/inner1.png',
        }, {
            outerBackground: '/image/outer2.png',
            innerBackground: '/image/inner2.png',
        }, {
            outerBackground: '/image/outer3.png',
            innerBackground: '/image/inner3.png',
        }, {
            outerBackground: '/image/outer4.png',
            innerBackground: '/image/inner4.png',
        },
    ];

    const handleScroll = (event) => {
        event.preventDefault();
        if (!scrolling) {
            setScrolling(true);
            const deltaY = event.deltaY;
            let nextSection = activeSection;
            if (deltaY > 0 && nextSection < sections.length - 1) {
                nextSection++;
            } else if (deltaY < 0 && nextSection > 0) {
                nextSection--;
            }
            if (nextSection !== activeSection && sectionRefs.current[nextSection]) {
                sectionRefs.current[nextSection].scrollIntoView({ behavior: "smooth" });
                setActiveSection(nextSection);
            }
            setTimeout(() => {
                setScrolling(false);
            }, 1000);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const isMobile = typeof window !== "undefined" ? window.innerWidth <= 1280 || window.innerHeight <= 550 : false;
            if (!isMobile) {
                // 모바일이 아닌 경우에는 스크롤 이벤트 리스너를 추가합니다.
                window.addEventListener("wheel", handleScroll, { passive: false });
            } else {
                // 모바일인 경우에는 스크롤 이벤트 리스너를 제거합니다.
                window.removeEventListener("wheel", handleScroll);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        // 모바일이 아닌 경우에만 기본 스크롤을 유지하기 위해 조건 추가
        if (!(window.innerWidth <= 1280 || window.innerHeight <= 550)) {
            window.addEventListener("wheel", handleScroll, { passive: false });
        }
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("wheel", handleScroll);
        };
    }, [activeSection, scrolling]);

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

    const isMobile = typeof window !== "undefined" ? window.innerWidth <= 1280 || window.innerHeight <= 550 : false;
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
                                            <Section2Content langJson={langJson} />
                                            <TopicsContainer />
                                        </AnimateUp>
                                    </M2>
                                    <IconSlideDemo />
                                    <AnimateUp>
                                        <M3Title>Our Service</M3Title>
                                        <M3Subtitle>Follow your dream. We support your dream.</M3Subtitle>
                                        <M3ImageContainer>
                                            <MobileAccordion langJson={langJson} />
                                        </M3ImageContainer>
                                        <M4NewsList>
                                            {[0, 1, 2, 3, 4, 5].map((item, index) => (
                                                <div>
                                                    <MobileNewsItem
                                                        key={index}
                                                        newsNumber={item}
                                                    />
                                                </div>
                                            ))}
                                        </M4NewsList>
                                    </AnimateUp>
                                    <AnimateUp>
                                        <MobileNewsButton />
                                    </AnimateUp>
                                    <AnimateUp>
                                        <M5Title>
                                            <span>성공</span>으로 가는 과정을 계획하는데 <span>함께</span>하겠습니다.
                                        </M5Title>
                                    </AnimateUp>
                                    <M5SearchContainer>
                                        <AnimateUp>
                                            <MobileSearch />
                                        </AnimateUp>
                                    </M5SearchContainer>
                                    <div className="bottom">
                                        <M5Contact>
                                            <HQ langJson={langJson} />
                                        </M5Contact>
                                    </div>
                                </Mobile>
                            ) : (sections.map((section, index) => (
                                <div
                                    key={section}
                                    id={section}
                                    className={`section ${index === activeSection ? "active-section" : ""}`}
                                    ref={el => (sectionRefs.current[index] = el)}
                                >
                                    {index === 0 ? (
                                        <Section height="100vh">
                                            <AnimateUp>
                                                <W1Title magtop="30vh" > {langJson[lang]?.FOLLOW}</W1Title>
                                                <W1Title > {langJson[lang]?.SUPPORT}</W1Title>
                                            </AnimateUp>
                                            <W1ScrollDownYellowStick>
                                                <p>S C R O L L D O W N </p>
                                                <span></span>{/* 노란 막대 */}
                                            </W1ScrollDownYellowStick>
                                            <img className="zoomInOut" style={{ position: "absolute", top: "0", width: "100%", height: "100vh", zIndex: "-1", }} src="/image/galaxy.png" />
                                        </Section>
                                    ) : index === 1 ? (
                                        <section style={{ display: "block" }}>
                                            <Section height="calc(100vh - 130px)" image="/image/blue.png">
                                                <div className="blue">
                                                    <div className="blueinner">
                                                        <AnimateRight>
                                                            <div className="yellow-box">
                                                                <p className="yellow-box-text">Who we are</p>
                                                            </div>
                                                        </AnimateRight>
                                                        <AnimateUp>
                                                            <div className="subtitle"> {langJson[lang]?.FOLLOW}</div>
                                                            <div className="subtitle"> {langJson[lang]?.SUPPORT}</div>
                                                            <div className="description">{langJson[lang]?.DESCIRPTION}</div>
                                                            <TopicsContainer />
                                                        </AnimateUp>
                                                    </div>
                                                </div>
                                            </Section>
                                            <IconSlideDemo />
                                        </section>
                                    ) : index === 2 ? (
                                        <Section>
                                            <AnimateUp>
                                                <Section3Title />
                                                <Accordion
                                                    accordionImages={accordionImages}
                                                    hoverIndex={hoverIndex}
                                                    handleItemOver={handleItemOver}
                                                    handleItemEnter={handleItemEnter}
                                                    hoverTxtIndex={hoverTxtIndex}
                                                    accordionItems={accordionItems}
                                                />
                                            </AnimateUp>
                                        </Section>
                                    ) : index === 3 ? (
                                        <Section height="100vh">
                                            <AnimateUp>
                                                <section className="newslistwrap">
                                                    <div className="news-list">
                                                        <div className="news-row">
                                                            {[0, 1, 2].map((item, index) => (
                                                                <NewsItem
                                                                    key={index}
                                                                    newsNumber={item}
                                                                />
                                                            ))}
                                                        </div>
                                                        <div className="news-row">
                                                            {[3, 4, 5].map((item, index) => (
                                                                <NewsItem
                                                                    key={index}
                                                                    newsNumber={item}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </section>
                                                <NewsButton />
                                            </AnimateUp>
                                        </Section>
                                    ) : (
                                        <Section>
                                            <AnimateUp>
                                                <Section5Title />
                                            </AnimateUp>
                                            <div className="searchheerim-container">
                                                <AnimateUp >
                                                    <Search />
                                                </AnimateUp>
                                            </div>
                                            <div className="bottom">
                                                <div className="seoulhqsupport">
                                                    <HQ langJson={langJson} />
                                                </div>
                                            </div>
                                        </Section>
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