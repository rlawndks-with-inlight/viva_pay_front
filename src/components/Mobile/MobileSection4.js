import React from 'react';
import styled from "styled-components";
import langJson from 'src/data/lang.json';
import { useRouter } from "next/router";

const M4NewsContent = styled.p`
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
    background-color: rgb(0,104,232); /* rgb(255, 194, 0); 노란색 */
}
::-webkit-scrollbar {
    width: 100%;
    height: 13px;
}
`
const M4Button = styled.a`
display: inline-block; /* 인라인 블록 요소로 만들어 옆에 다른 요소가 올 수 있도록 합니다. */
`

export const MobileNewsItem = ({ newsNumber }) => {
    const router = useRouter();
    const { lang = 'en' } = router.query;

    const newsTitles = [
        langJson[lang]?.FIRSTNEWS,
        langJson[lang]?.SECONDNEWS,
        langJson[lang]?.THIRDNEWS,
        langJson[lang]?.FOURTHNEWS,
        langJson[lang]?.FIFTHNEWS,
        langJson[lang]?.SIXTHNEWS,
    ];

    const newsLinks = [
        '/news1',
        '/news2',
        '/news3',
        '/news4',
        '/news5',
        '/news6',
    ];

    const newsText = 'News';

    return (
        <a href={newsLinks[newsNumber]} className="news-item">
            <div className="news-box">
                <p className="news-text">{newsText}</p>
            </div>
            <M4NewsContent>{newsTitles[newsNumber]}</M4NewsContent>
            <span className="newsreadmore">
                <em>Read more</em>
                <i>→</i>
            </span>
        </a>
    );
}

export const MobileNewsButton = () => {
    return (
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
    )
}
