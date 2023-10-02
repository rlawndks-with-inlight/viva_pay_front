import '../../styles/globals.css'
import React, { useEffect, useState, useRef } from "react";

const sections = ["section1", "section2", "section3", "section4"]; // 섹션 이름
const totalIcons = 10; // 총 아이콘 개수
const iconsPerPage = 8; // 한 페이지에 표시할 아이콘 개수

const App = (props) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  const [activeSection, setActiveSection] = useState(0); // 활성 섹션 인덱스
  const [iconIndexes, setIconIndexes] = useState(Array.from({ length: iconsPerPage }, (_, i) => i)); // 표시되는 아이콘 인덱스 배열
  const sectionRefs = useRef([]);
  const videoRef = useRef(null); // 비디오 요소를 관리하기 위한 ref
  const [section3Active, setSection3Active] = useState(false); // section3의 활성화 여부를 관리하는 상태
  const [headerVisible, setHeaderVisible] = useState(true); // 헤더 가시성 상태
  const [headerHidden, setHeaderHidden] = useState(false); // 헤더 숨김 상태

  useEffect(() => {
    const handleScroll = (e) => {
      // 스크롤 이벤트를 중지합니다.
      e.preventDefault();

      // 현재 화면의 중앙 위치를 계산합니다.
      const screenHeight = window.innerHeight;
      const screenCenter = screenHeight / 2;

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
        const scrollToY = sectionTop + sectionHeight / 2 - screenCenter;
        window.scrollTo({ top: scrollToY, behavior: "smooth" });

        // section1로 돌아온 경우
        if (newActiveSection === 0) {
          videoRef.current.play(); // 비디오 재생
        } else {
          videoRef.current.pause(); // 비디오 일시 정지
          videoRef.current.currentTime = 0; // 비디오를 처음으로 되감깁니다.
        }

        // section3로 이동하는 경우 section3Active 상태를 활성화합니다.
        if (newActiveSection === 2) {
          setSection3Active(true);
        } else {
          setSection3Active(false);
        }
      }
    };

    // 스크롤 이벤트를 추가합니다.
    window.addEventListener("wheel", handleScroll, { passive: false });

    // Intersection Observer를 사용하여 section1이 화면에 나타나는지 감시합니다.
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // 섹션 1이 화면에 50% 이상 들어올 때 이벤트 발생
    };

    const handleIntersection = (entries) => {
      if (entries[0].isIntersecting) {
        videoRef.current.play(); // section1이 화면에 나타나면 비디오 재생
      } else {
        videoRef.current.pause(); // section1이 화면에서 벗어나면 비디오 일시 정지
      }
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(sectionRefs.current[0]);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 및 Intersection Observer를 제거합니다.
    return () => {
      window.removeEventListener("wheel", handleScroll);
      observer.disconnect();
    };
  }, [activeSection]);

  useEffect(() => {
    // 마우스 이벤트를 처리하는 함수
    const handleMouseEnter = () => {
      // 헤더가 숨겨져 있고 마우스가 헤더의 위치로 진입하면 헤더 표시
      if (headerHidden) {
        setHeaderVisible(true);
        setHeaderHidden(false);
      }
    };

    // 헤더 밖으로 마우스가 나갈 때 숨김 처리
    const handleMouseLeave = (e) => {
      const headerHeight = 60; // 헤더의 높이 (적절한 값으로 수정)
      const mouseY = e.clientY;

      // 헤더가 표시 중이고 마우스가 헤더 위로 벗어날 때 헤더 숨김 처리
      if (headerVisible && mouseY <= headerHeight) {
        setHeaderVisible(false);
        setHeaderHidden(true);
      }
    };

    // 마우스 이벤트 리스너를 추가합니다.
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    // 컴포넌트가 언마운트될 때 마우스 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [headerVisible, headerHidden]);

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

  return (
    <>
      <title>heerim</title>
      {getLayout(<Component {...pageProps} />)}
      <div>
        {sections.map((section, index) => (
          <div
            key={section}
            id={section}
            className={`section ${index === activeSection ? "active-section" : ""}`}
            ref={(el) => (sectionRefs.current[index] = el)}
          >
            {index === 0 ? (
              <div className="video-container">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="fullscreen-video"
                  ref={videoRef}
                >
                  <source src="/video/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : index === 1 ? (
              <div className="text-overlay">
                {/* 노란색 배경에 녹색 박스 모양의 텍스트 박스와 소제목, 설명 */}
                <div className="icon-text-container">
                  <div className="green-box">
                    <p className="green-box-text">WHO WE ARE</p>
                  </div>
                  <div className="subtitle"> World's Leading</div>
                  <div className="subtitle"> Architecture & Design Practice</div>
                  <div className="description" style={{ marginTop: '1rem' }}>With Innovations and Challenges,</div>
                  <div className="description">We Design Tomorrow & Beyond, for the next 100 years.</div>
                </div>
                {/* 주제와 설명 */}
                <div className="topics-container">
                  <div className="topic">
                    <h2 className='topic-title'>History of Heerim</h2>
                    <p className='topic-number'>50+</p>
                  </div>
                  <div className="topic">
                    <h2 className='topic-title'>Branch offices</h2>
                    <p className='topic-number'>15</p>
                  </div>
                  <div className="topic">
                    <h2 className='topic-title'>Professional Employees</h2>
                    <p className='topic-number'>1,400+</p>
                  </div>
                  <div className="topic">
                    <h2 className='topic-title'>Overseas Projects</h2>
                    <p className='topic-number'>300+</p>
                  </div>
                  <div className="topic">
                    <h2 className='topic-title'>World Ranking (WA2023)</h2>
                    <p className='topic-number'>8</p>
                  </div>
                </div>
                <div className="icon-container">
                  {/* 이전 버튼 */}
                  <button className="prev-button" onClick={showPreviousIcons}>
                    <div className="button-inner">
                      <span className="leftarrow">&#5130;</span> {/* 왼쪽 화살표 */}
                    </div>
                  </button>
                  {/* 아이콘 내용 */}
                  {iconIndexes.map((iconIndex) => (
                    <img
                      key={`icon-${iconIndex}`}
                      src={`/icon/${iconIndex}.png`}
                      alt={`Icon ${iconIndex}`}
                      width="120"
                      height="120"
                    />
                  ))}
                  {/* 다음 버튼 */}
                  <button className="next-button" onClick={showNextIcons}>
                    <div className="button-inner">
                      <span className="rightarrow">&#5125;</span> {/* 오른쪽 화살표 */}
                    </div>
                  </button>
                </div>
              </div>
            ) : index === 2 ? (
              <div className={`text-overlay ${section3Active ? "section3-active" : ""}`}>
                <div className="project-box">
                  <p className="project-text">PROJECT</p>
                </div>
                <div className="title"> Heerim's Latest Selected Works
                  <button className="read-more-button">
                    <span className="read-more-text">Read more</span>
                    <span className="arrow-icon">→</span>
                  </button>
                </div>
                <div className="image-container">
                  <img src="/image/image11.jpg" alt="Image 1" />
                  <img src="/image/image21.jpg" alt="Image 2" />
                  <img src="/image/image31.jpg" alt="Image 3" />
                  <img src="/image/image41.jpg" alt="Image 4" />
                </div>
                {/*{section}*/}
              </div>
            ) : (
              <div>{section}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
export default App;
