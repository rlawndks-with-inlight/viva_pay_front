// IconSlide.js 수정중인 코드 react slick slide 검색할 것
import React from 'react';
import { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";
const totalIcons = 9; // 총 아이콘 개수
const iconsPerPageLarge = 6; // 큰 화면에서 표시할 아이콘 개수

const W2IconContainer = styled.section`
display: flex;
overflow-x: hidden;
justify-content: space-between;
height: 140px;
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
    width: 5em;
    height: 5em;
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
`
const IconSlide = ({ }) => {
    const [iconIndexes, setIconIndexes] = useState(Array.from({ length: iconsPerPageLarge }, (_, i) => i)); // 표시되는 아이콘 인덱스 배열
    // 클릭된 아이콘에 대한 처리
    const handleIconClick = (iconIndex) => {
        // 각 아이콘에 대한 링크를 정의합니다.
        const iconLinks = {
            0: "https://www.heerim.com/kr/project/project_list.php?cate=1",
            1: "https://www.heerim.com/kr/project/project_list.php?cate=2",
            2: "https://www.heerim.com/kr/project/project_list.php?cate=3",
            3: "https://www.heerim.com/kr/project/project_list.php?cate=4",
            4: "https://www.heerim.com/kr/project/project_list.php?cate=5",
            5: "https://www.heerim.com/kr/project/project_list.php?cate=6",
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

    const settings = {
        // slide: 'div',		//슬라이드 되어야 할 태그 ex) div, li 
        // infinite: true, 	//무한 반복 옵션	 
        slidesToShow: 6,		// 한 화면에 보여질 컨텐츠 개수
        slidesToScroll: 1,		// 스크롤 한번에 움직일 컨텐츠 개수
        // speed : 1200,	 // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
        autoplay: true,			// 자동 스크롤 사용 여부
        autoplaySpeed: 1000, 		// 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
        // pauseOnHover: true,		// 슬라이드 이동 시 마우스 호버하면 슬라이더 멈추게 설정
        // vertical : false,		// 세로 방향 슬라이드 옵션
        // prevArrow : "<button type='button' class='slick-prev'>Previous</button>",		// 이전 화살표 모양 설정
        // nextArrow : "<button type='button' class='slick-next'>Next</button>", // 다음 화살표 컴포넌트
        // arrows : true, 		// 옆으로 이동하는 화살표 표시 여부
        // dots : true, 		// 스크롤바 아래 점으로 페이지네이션 여부
        // dotsClass : "slick-dots",    // 아래 나오는 페이지네이션(점) css class 지정
        // draggable : true, 	// 드래그 가능 여부 

        /*
    responsive: [ // 반응형 웹 구현 옵션
    {  
        breakpoint: 800, //화면 사이즈 960px일 때
        settings: {
            //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
            slidesToShow:4 
        } 
    }
]
*/
    };


    return (
        <W2IconContainer>
            {/* 이전 버튼 */}
            <PrevButton onClick={showPreviousIcons}>
                <img src="/icon/prev.png" alt="Prev icon" />
            </PrevButton>
            {/*
            */}
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
                        {getIconDescription(iconIndex)}
                    </div>
                </W2IconButton>
            ))}
            {/*  
<IconSlide
iconIndexes={iconIndexes}
handleIconClick={handleIconClick}
getIconDescription={getIconDescription}/>
*/}
            {/* 다음 버튼 */}
            <NextButton onClick={showNextIcons}>
                <img src="/icon/next.png" alt="Next icon" />
            </NextButton>
        </W2IconContainer>
    )
}

export default IconSlide;
