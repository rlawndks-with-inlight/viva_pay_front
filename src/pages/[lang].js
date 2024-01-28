// pages/home.js
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import UserLayout from 'src/layouts/UserLayout';
import langJson from 'src/data/lang.json';
import { Section3Title } from "src/components/Section3";
import Accordion from "src/components/Section3Accordion";
import { Search, Section5Title } from "src/components/Section5";
import HQ from "src/components/HQ"; // 공통 아래는 1280이하 사이즈
import { MSection2Content } from "src/components/Mobile/MobileSection2Content";
import MobileAccordion from "src/components/Mobile/MobileSection3Accordion";
import { MobileSearch } from "/src/components/Mobile/MobileSection5";
import styled from "styled-components";
import { useInView } from 'react-intersection-observer'; // react-intersection-observer 라이브러리 사용
import { Marquee } from "src/components/Section2Slide";
import { CountUp } from "countup.js";
import TestAccordion from "src/components/TestAccordion";
const sections = ["section1", "section2", "section3", "section4"]; // 섹션 이름

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
const M1 = styled.div`
height: 100vh;
border: 0.1px transparent solid;
  @media screen and (max-width: 1280px) {
    height: 600px;
  }
  @media screen and (max-width: 500px) {
    height: 500px;
  }
  @media screen and (max-width: 400px) {
    height: 400px;
  }
  @media screen and (max-height: 550px) and (min-width: 1280px ) {
    height: 500px;
  }
`
const M3Title = styled.div`
margin-top: 0.5em;
margin-left: 0.9em;
font-weight: bold;
font-size: 3em;
font-family: 'Playfair Display', serif;
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
const M5SearchContainer = styled.div`
background: 
radial-gradient(at 20% 75%, hsla(282,60%,70%,1) 0px, transparent 10%),
radial-gradient(at 0% 0%, hsla(249,97%,65%,1) 0px, transparent 50%),
radial-gradient(at 55% 0%, hsla(224,92%,60%,1) 0px, transparent 50%),
radial-gradient(at 66% 13%, hsla(237,97%,79%,1) 0px, transparent 20%),
radial-gradient(at 92% 36%, hsla(197,61%,73%,1) 0px, transparent 50%),
radial-gradient(at 95% 94%, hsla(190,100%,76%,1) 0px, transparent 50%),
radial-gradient(at 10% 93%, hsla(306,65%,61%,1) 0px, transparent 40%),
radial-gradient(at 0% 19%, hsla(253,97%,67%,1) 0px, transparent 30%),
radial-gradient(at 72% 68%, hsla(207,84%,69%,1) 0px, transparent 50%),
radial-gradient(at 24% 58%, hsla(289,98%,63%,1) 0px, transparent 40%),
  #99c5ff;
  /*
radial-gradient(#50AFFB 23%, transparent 67% 100%) 385px -24px,
 radial-gradient(#BF75F6 0, transparent 60% 100%) -940px 290px,
  radial-gradient(#50AFFB 40%, transparent 57% 100%) 495px -44px,
   radial-gradient(#50AFFB 30%, transparent 67% 100%) 122px -120px,
    radial-gradient(#6B4FFD 10%, transparent 60% 100%) -420px 120px,
  radial-gradient(#94E7FD 25%, transparent 50% 100%) 520px -250px,
  #215BDB;
   */
background-repeat: repeat-y;
width: 100vw;
padding-top: 3em;
`
const M5Contact = styled.div`
display: flex;
flex-direction: column;
`
const Section = styled.section`
width: 100%;
position: relative;
overflow: hidden;
height: ${(props) => props.height};
`
const W1Title = styled.span`
display: block;
margin-top: ${(props) => props.magtop};
margin-left: 14vw;
font-size: 5em;
font-weight: 800;
font-family: 'NanumSquare', sans-serif;
color: black;
word-break: keep-all;
  @media screen and (max-width : 700px) {
    font-size: 10vw;
  }
  @media screen and (max-height : 600px) and (min-width: 1280px ) {
    font-size: 3.5em;
  }
`
const W1RunningMate = styled.span`
display: block;
margin-top: ${(props) => props.magtop};
margin-left: 14vw;
font-size: 2em;
font-weight: 400;
font-family: 'NanumSquare', sans-serif;
color: black;
word-break: keep-all;
  @media screen and (max-width : 800px) {
font-size: 1.5em;
  }
  @media screen and (max-width : 350px) {
font-size: 1.2em;
  }
`
const W1RunningMateDescription = styled.span`
display: block;
margin-left: 14.5vw;
font-size: 2em;
font-weight: 300;
font-family: 'NanumSquare', sans-serif;
color: black;
word-break: keep-all;
  @media screen and (max-width : 800px) {
font-size: 1.5em;
  }
  @media screen and (max-width : 350px) {
font-size: 1.2em;
  }
`
const W2Title = styled.div`
word-break: keep-all;
padding: none;
  font-size: 4em;
  font-weight: 700;
font-family: 'NanumSquare', sans-serif;
  color: white;
  margin-left: 11vw;
  @media screen and (max-width : 1180px) {
    font-size: 4.7vw;
  }
  @media screen and (max-width : 800px) {
    font-size: 2.7em;
  }
  @media screen and (max-width : 520px) {
    font-size: 7vw;
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
                }, 5); // 올라가는 속도 조절
            }

            return () => clearInterval(animationInterval);
        } else {
            // 뷰를 나가면 리셋
            setCurrentValue(initialValue);
        }
    }, [inView, currentValue, finalValue, initialValue]);

    const addPlusSign = title === "연간 거래액" || title === "가맹점" || title === "연동PG사" || title === "고객사 수";

    const formatNumberWithCommas = (number) => {
        const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedNumber;
    };

    useEffect(() => {
        if (inView && currentValue < finalValue) {
            const numValue = Math.round(currentValue);
            const numIntType = parseInt(numValue);
            const options = {
                useEasing: true,
                useGrouping: true,
                separator: ",",
                decimal: "."
            };
            const upAnimation = new CountUp(`${title}-count`, 0, numIntType, 0, 5, options);
            upAnimation.start();
        }
    }, [inView, currentValue, finalValue, title]);

    return (
        <div ref={inViewRef} className="topic-contaier">
            <p className="topic-title">{title}</p>
            <p className={`topic-number ${inView ? "in-view" : ""}`}>
                {addPlusSign && title === "연간 거래액"
                    ? `1조 ${formatNumberWithCommas(Math.round(currentValue)) + "억+"}`
                    : formatNumberWithCommas(Math.round(currentValue)) + "+"}
            </p>
        </div>
    );
};

const TopicsContainer = () => {
    return (
        <div className="topics-container">
            <Topic title="연간 거래액" initialValue={0} finalValue={2000} />
            <Topic title="가맹점" initialValue={0} finalValue={20000} />
            <Topic title="연동PG사" initialValue={0} finalValue={30} />
            <Topic title="고객사 수" initialValue={0} finalValue={30} />
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
    const [activeIndex, setActiveIndex] = useState(false);
    const [activeTxtIndex, setActiveTxtIndex] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    const handleItemClick = (index) => {
        setActiveIndex(index);
        setActiveTxtIndex(index);
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
            title: '보안 중심의 네트워크 아키텍처',
        }, {
            title: '운영현황을 한눈에',
        }, {
            title: '연 1조 2000억원의 거래량에도 안전하고 빠르게',
        }, {
            title: '섬세한 디자인 커스텀마이징',
        },
    ];

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
                                <>
                                    <M1>
                                        <AnimateUp>
                                            <W1Title magtop="25vh">PG사를 위한</W1Title>
                                            <W1Title>최고의 러닝메이트</W1Title>
                                            <W1RunningMate magtop="10px">*러닝메이트란?</W1RunningMate>
                                            <W1RunningMateDescription>러닝크루와 같이 케어하면서 끝까지 함께 달리는 러너를 상징합니다.</W1RunningMateDescription>
                                        </AnimateUp>
                                        <canvas className="pg1-linear" />
                                        <div className="pg1-radial" />
                                    </M1>
                                    <Section className="pg2-radial">
                                        <div className="pg2-linear" />
                                        <div className="pg2-gray" />
                                        <AnimateUp>
                                            <W2Title id="pg2-mt1">국가안보 수준의 보안성</W2Title>
                                            <W2Title >전 고객 무사고 업계 최고 수준의 대응속도</W2Title>
                                            <W2Title id="pg2-mt3">경쟁사 대비 빠른 연산 처리 속도</W2Title>
                                            <TopicsContainer />
                                        </AnimateUp>
                                    </Section>
                                    <Marquee />
                                    <AnimateUp>
                                        <M3Title>Our Service</M3Title>
                                        <M3ImageContainer>
                                            <MobileAccordion />
                                        </M3ImageContainer>
                                    </AnimateUp>
                                    <M5SearchContainer>
                                        <AnimateUp>
                                            <MobileSearch />
                                        </AnimateUp>
                                    </M5SearchContainer>
                                    <div className="m-bottom">
                                        <M5Contact>
                                            <HQ/>
                                        </M5Contact>
                                    </div>
                                </>
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
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <div style={{ display: 'flex', flexDirection: "column", zIndex: '1' }}>
                                                        <W1Title magtop="30vh">PG사를 위한</W1Title>
                                                        <W1Title>최고의 러닝메이트</W1Title>
                                                        <W1RunningMate magtop="10px">*러닝메이트란?</W1RunningMate>
                                                        <W1RunningMateDescription>러닝크루와 같이 케어하면서 끝까지 함께 달리는 러너를 상징합니다.</W1RunningMateDescription>
                                                    </div>
                                                    <div className="img-container">
                                                        <div className="pg1-web"><img src="image/1pageweb.png"></img></div>
                                                        <div className="pg1-ph"><img src="image/1pagephone.png"></img></div>
                                                    </div>
                                                </div>
                                            </AnimateUp>
                                            <canvas className="pg1-linear" />
                                            <div className="pg1-radial" />
                                            <div className="waveMiddle" />
                                            <div className="whitebackground" />
                                        </Section>
                                    ) : index === 1 ? (
                                        <section>
                                            <Section className="pg2-radial">
                                                <div className="pg2-linear" />
                                                <div className="pg2-gray" />
                                                <div className="blueinner">
                                                    <AnimateUp>
                                                        <div className="subtitle" id="sub1">국가안보 수준의 보안성</div>
                                                        <div className="subtitle" id="sub2">전 고객 무사고 업계 최고 수준의 대응속도</div>
                                                        <div className="subtitle" id="sub3">경쟁사 대비 빠른 연산 처리 속도</div>
                                                        <TopicsContainer />
                                                    </AnimateUp>
                                                </div>
                                            </Section>
                                            <Marquee />
                                        </section>
                                    ) : index === 2 ? (
                                        <Section style={{ backgroundImage: `url('/image/3pageback.png')`, backgroundSize: 'cover' }}>
                                            <AnimateUp>
                                                <Section3Title /> 
                                                <TestAccordion
                                                    accordionImages={accordionImages}
                                                    activeIndex={activeIndex}
                                                    handleItemClick={handleItemClick}
                                                    activeTxtIndex={activeTxtIndex}
                                                    accordionItems={accordionItems}/>
                                               {/* 
                                                <Accordion
                                                    accordionImages={accordionImages}
                                                    activeIndex={activeIndex}
                                                    handleItemClick={handleItemClick}
                                                    activeTxtIndex={activeTxtIndex}
                                                    accordionItems={accordionItems}
                                                />
                                                */}
                                            </AnimateUp>
                                        </Section>
                                    ) : (
                                        <Section height="100vh">
                                            <div className="searchheerim-container">
                                                <div className="pg4-linear" />
                                                <AnimateUp >
                                                    <Search />
                                                </AnimateUp>
                                            </div>
                                            <div className="bottom">
                                                <div className="seoulhqsupport">
                                                    <HQ />
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