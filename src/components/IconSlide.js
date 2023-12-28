import React from "react";
import { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";
const iconsPerPage = 9; // 전체 아이콘 개수
const CustomSlider = styled(Slider)`   
.slick-list{
     margin: 0 1%; 
}
.slick-slide{
    display: flex;
    justify-content: space-evenly;
}
.slick-prev{
background-image: url("/icon/prev.png");

}
.slick-next{
background-image: url("/icon/next.png");
}
.slick-prev,
.slick-next{
display: flex;
position: static;
width: 230px;
height: 95px;
opacity: 1;
background-repeat: no-repeat;
background-size: contain;
    transform: translate(0,0);
  @media only screen and (max-width: 800px) {
width: 300px;
height: 100px;
  }
  @media only screen and (max-width: 340px) {
width: 500px;
  }
}

.slick-prev:before,
.slick-next:before{
    display: none;
}
button{
    display: flex !important;
    flex-direction: column;
    align-items: center;
    padding: 0;
    cursor: pointer;
    background: transparent;
    border: none;
    div{
        font-weight: bold;
    @media only screen and (max-width: 760px) {
        font-size: 2vw;
    }
    @media only screen and (max-width: 400px) {
        font-size: 1em;
    }
    }
    img{
        margin-top: 1em;
        width: 5em;
        height: 5em;
    @media only screen and (max-width: 800px) {    
        width: 4em;
        height: 4em;
    }
    }
    :hover div{
        color: rgb(0, 104, 232);
        transition: color 0.5s;
    }
  }
`
const settings = {
    slidesToShow: 6,		// 한 화면에 보여질 컨텐츠 개수
    slidesToScroll: 1,		// 스크롤 한번에 움직일 컨텐츠 개수
    autoplay: true,			// 자동 스크롤 사용 여부
    autoplaySpeed: 2000, 		// 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    pauseOnHover: false,		// 슬라이드 이동 시 마우스 호버하면 슬라이더 멈추게 설정
    prevArrow: <button className="slick-prev"/>,
    nextArrow: <button className="slick-next"/>,
    arrows: true, 		// 옆으로 이동하는 화살표 표시 여부
    //infinite: true, 	//무한 반복 옵션	 
    // slide: "button",		//슬라이드 되어야 할 태그 ex) div, li 
    //centerMode: true,
    //variableWidth: true,
    //speed : 1200,	 // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
    //vertical : false,		// 세로 방향 슬라이드 옵션
    //dots : true, 		// 스크롤바 아래 점으로 페이지네이션 여부
    //dotsClass : "slick-dots",    // 아래 나오는 페이지네이션(점) css class 지정
    //draggable : true, 	// 드래그 가능 여부 
    responsive: [ // 반응형 웹 구현 옵션
        {
            breakpoint: 800, //화면 사이즈 800px 이하일 때
            settings: { //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                slidesToShow: 4
            }
        },
        {
            breakpoint: 400, //화면 사이즈 800px 이하일 때
            settings: { //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                slidesToShow: 3
            }
        },
        {
            breakpoint: 340, //화면 사이즈 800px 이하일 때
            settings: { //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                slidesToShow: 2
            }
        }
    ]

}
export const IconSlide = ({ }) => {
    const [iconIndexes, setIconIndexes] = useState(Array.from({ length: iconsPerPage }, (_, i) => i)); // 표시되는 아이콘 인덱스 배열
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
            6: "https://www.heerim.com/kr/project/project_list.php?cate=7",
            7: "https://www.heerim.com/kr/project/project_list.php?cate=8",
            8: "https://www.heerim.com/kr/project/project_list.php?cate=9",
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
            // 다른 아이콘들에 대한 설명을 추가하세요
        };

        // 클릭된 아이콘에 해당하는 설명을 반환합니다.
        return iconDescriptions[iconIndex] || "";
    };

    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <CustomSlider {...settings}>
                {iconIndexes.map((iconIndex) => (
                    <button className="iconslide"
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
                    </button>
                ))}
            </CustomSlider>
        </div>
    )
}