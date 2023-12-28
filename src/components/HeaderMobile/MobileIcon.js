import React from 'react';
import styled from 'styled-components';

const MMoreTotalButtonContainer = styled.div`
position: fixed;
bottom: 10%;
left: 10%;
display: flex; /* 더보기 아래쪽 아이콘 버튼 스타일*/
flex-direction: row;
justify-content: space-evenly;
text-align: center;
@media only screen and (max-width: 420px) {
    left: 2%;
}
@media only screen and (max-height: 850px) {
bottom: 2%;
}
`
const MMoreIconButton = styled.a`
margin-left: 3vw;
transition: opacity 0.3s ease; /* 호버 시 투명도 전환 애니메이션 */
text-decoration: none; /*링크 밑줄 제거*/
  img{
    width: 40px;
    height: 40px;
    &:hover{
      opacity: 0.7; /* 호버 시 투명도를 0.7로 변경 (1이 원래 투명도) */
}
  }
@media only screen and (max-width: 650px) {
    img{
    width: 25px;
    height: 25px;
  }
}
@media only screen and (max-width: 400px) {
    img{
    width: 5vw;
    height: 5vw;
  }
}
@media only screen and (max-height: 300px){
    img{
    width: 1.5em;
    height: 1.5em;
  }
}
`
const MMoreLocationButton = styled.div`
margin-left: 3vw;
display: flex; /* 더보기 아래쪽 map 버튼 스타일*/
flex-direction: row;
background-color: rgb(255, 194, 0); /* 노란색 배경 추가 */
border-radius: 50px; /* 회색 배경과 함께 버튼에 radius 추가 */
padding: 10px;
cursor: pointer;
  img{
    width: 25px;
    height: 25px;
  }
  a{
    font-size: 20px;
    margin: 0 10px 0 10px;
    color: black;
  }
  &:hover{
    opacity: 0.7; /* 호버 시 투명도를 0.7로 변경 (1이 원래 투명도) */
}
@media only screen and (max-width: 650px) {
padding: 7px;
  img{
    width: 15px;
    height: 15px;
  }
  a{
    font-size: 12px;
  }
}
@media only screen and (max-width: 400px) {
  img{
    width: 4vw;
    height: 4vw;
  }
  a{
    font-size: 3vw;
  }
}
@media only screen and (max-height: 300px) {
  img{
    margin-top: 2px;
    width: 1em;
    height: 1em;
  }
  a{
    font-size: 1em;
  }
}
`
const IconButton = ({ href, imgSrc, altText }) => {
    return (
        <MMoreIconButton href={href} target="_blank" rel="noopener noreferrer">
            <img src={imgSrc} alt={altText} />
        </MMoreIconButton>
    );
};

const LocationButton = ({ href, imgSrc, altText, buttonText }) => {
    return (
        <MMoreLocationButton href={href} target="_blank" rel="noopener noreferrer">
            <img src={imgSrc} alt={altText} />
            <a>{buttonText}</a>
        </MMoreLocationButton>
    );
};

export const MobileIconContainer = () => {
    return (
        <MMoreTotalButtonContainer>
            <IconButton
                href="https://www.instagram.com/heerim_architects_official/"
                imgSrc="/icon/instagram.svg"
                altText="Instagram Icon"
            />
            <IconButton
                href="https://www.youtube.com/channel/UCPwQIrf17KFyqvXeq8NVY_Q"
                imgSrc="/icon/youtube.svg"
                altText="YouTube Icon"
            />
            <IconButton
                href="https://www.pinterest.co.kr/heerim_architects_official/"
                imgSrc="/icon/pinterest.svg"
                altText="Pinterest Icon"
            />
            <LocationButton
                href="https://www.google.com/maps/d/viewer?mid=1ZYdnpbxRgC5-zu5GpoOU8zd_E-v24aXT&ll=13.728397502246512%2C71.13522019999999&z=3"
                imgSrc="/icon/location.svg"
                altText="Location Icon"
                buttonText="Design map"
            />
            <LocationButton
                href="https://www.google.com/maps/d/viewer?mid=1aWEovb5OXGAdqH_D-QojV6l96tLYT2S0&ll=24.118227897040363%2C55.94565490000001&z=3"
                imgSrc="/icon/location.svg"
                altText="Location Icon"
                buttonText="CM map"
            />
        </MMoreTotalButtonContainer>
    )
}