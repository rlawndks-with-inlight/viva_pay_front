import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
const totalIcons = 9; // 총 아이콘 개수
const iconsPerPageLarge = 6; // 큰 화면에서 표시할 아이콘 개수
const iconsPerPageSmall = 4; // 작은 화면에서 표시할 아이콘 개수

const M2IconContainer = styled.div`
margin-top: 1em;
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
const PrevButton = styled.button` /* 모바일, 웹 공용 버튼 */
border: none;
cursor: pointer;
margin-left: 20%;
background-size: cover;
background-color: transparent;
@media only screen and (max-width: 1100px), (max-height: 800px) {
margin-left: 5%;
}
@media only screen and (max-width: 600px) {
margin: 0 0 5vh 0;
    img{
        width: 30px;
        height: 45px;
    }
}
`
const NextButton = styled.button` /* 모바일, 웹 공용 버튼 */
border: none;
cursor: pointer;
margin-right: 20%;
background-size: cover;
background-color: transparent;
@media only screen and (max-width: 1100px), (max-height: 800px) {
margin-right: 5%;
}
@media only screen and (max-width: 600px) {
margin: 0 0 5vh 0;
    img{
        width: 30px;
        height: 45px;
    }
}
`
export const MobileIconSlide = ({ }) => {
    const [iconIndexes, setIconIndexes] = useState(Array.from({ length: iconsPerPageLarge }, (_, i) => i)); // 표시되는 아이콘 인덱스 배열
    const [windowWidth, setWindowWidth] = useState(0); // 초기 화면 너비 설정
    const [windowHeight, setWindowHeight] = useState(0); // 초기 화면 높이 설정
    const [loading, setLoading] = useState(true);
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
            if (window.innerWidth <= 800) {
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
    }, [windowWidth, windowHeight]);

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

    return (
        <M2IconContainer>
            {/* 이전 버튼 */}
            <PrevButton onClick={showPreviousIcons}>
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
            <NextButton onClick={showNextIcons}>
                <img src="/icon/next.png" alt="Next icon" />
            </NextButton>
        </M2IconContainer>
    )
}

