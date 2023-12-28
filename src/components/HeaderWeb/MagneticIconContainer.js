import React, { useEffect } from 'react';
import styled from 'styled-components';

const hoverTransition = 'all 0.3s ease';
const ListWithoutStyle = styled.li`
  list-style: none;
  &:hover{
    img{
transition: all 0.3s ease; /* 호버 시 투명도 전환 애니메이션 */
      opacity: 0.5;
    }
  }
`
const Button = styled.a`
  display: inline-block;
  margin-right: 3vw;
  transition: ${hoverTransition};
  position: relative;
  img {
    width: 40px;
    height: 40px;
  }
  &:hover {
    img{
      opacity: 1;
    transform: scale(1.05);
    }
  } 
  @media only screen and (max-width: 650px), (max-height: 400px) {
    img {
      width: 25px;
      height: 25px;
    }
  }
`
const LocationButton = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(255, 194, 0);
  border-radius: 50px;
  padding: 10px;
  opacity: 0.8;
  cursor: pointer;
  img {
    width: 25px;
    height: 25px;
  }
  a {
    font-size: 20px;
    margin: 0 10px 0 10px;
    color: black;
  }
  &:hover {
    transition: ${hoverTransition};
    opacity: 1;
    transform: scale(1.05);
  }
  @media only screen and (max-width: 650px) {
    padding: 5px 10px;
    img {
      width: 15px;
      height: 15px;
    }
    a {
      font-size: 12px;
      padding: 0;
    }
  }
  @media only screen and (max-height: 400px) {
    padding: 5px 10px;
    img {
      width: 1em;
      height: 1em;
    }
    a {
      font-size: 1em;
    }
  }
`

const MagneticButton = ({ href, children }) => {
    useEffect(() => {
        const applyMagneticEffect = (e) => {
            const pos = e.currentTarget.getBoundingClientRect();
            const mx = e.clientX - pos.left - pos.width / 2;
            const my = e.clientY - pos.top - pos.height / 2;
            e.currentTarget.style.transform = `translate(${mx * 0.15}px, ${my * 0.3}px) scale(1.05)`;
        };
        const removeMagneticEffect = (e) => {
            e.currentTarget.style.removeProperty('transform');
        };
        const elements = document.querySelectorAll('.cm-magnetic-btn');
        elements.forEach((el) => {
            el.addEventListener('mousemove', applyMagneticEffect);
            el.addEventListener('mouseleave', removeMagneticEffect);
        });
        return () => {
            elements.forEach((el) => {
                el.removeEventListener('mousemove', applyMagneticEffect);
                el.removeEventListener('mouseleave', removeMagneticEffect);
            });
        };
    }, []);
    return (
        <Button className="cm-magnetic-btn" href={href} target="_blank" rel="noopener noreferrer">
            {children}
        </Button>
    )
}
export const MagneticIcon = () => {
    return (
        <>
            <ListWithoutStyle>
                <MagneticButton href="https://www.instagram.com/heerim_architects_official/">
                    <img src="/icon/instagram.svg" alt="Instagram Icon" />
                </MagneticButton>
                <MagneticButton href="https://www.youtube.com/channel/UCPwQIrf17KFyqvXeq8NVY_Q">
                    <img src="/icon/youtube.svg" alt="YouTube Icon" />
                </MagneticButton>
                <MagneticButton href="https://www.pinterest.co.kr/heerim_architects_official/">
                    <img src="/icon/pinterest.svg" alt="Pinterest Icon" />
                </MagneticButton>
            </ListWithoutStyle>
            <LocationButton className="cm-magnetic-btn" style={{ marginLeft: '3vw' }} href="https://www.google.com/maps/d/viewer?mid=1ZYdnpbxRgC5-zu5GpoOU8zd_E-v24aXT&ll=13.728397502246512%2C71.13522019999999&z=3">
                <img src="/icon/location.svg" alt="Location Icon" />
                <a> Design map </a>
            </LocationButton>
            <LocationButton className="cm-magnetic-btn" style={{ marginLeft: '3vw' }} href="https://www.google.com/maps/d/viewer?mid=1aWEovb5OXGAdqH_D-QojV6l96tLYT2S0&ll=24.118227897040363%2C55.94565490000001&z=3">
                <img src="/icon/location.svg" alt="Location Icon" />
                <a> CM map </a>
            </LocationButton>
        </>
    )
}

