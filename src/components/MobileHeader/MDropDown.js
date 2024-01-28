import React, { useState } from 'react';
import styled from 'styled-components';

const MTotalButtonContainer = styled.ul`
text-decoration: none;
margin-top : 6em;
padding: 0;
@media only screen and (max-height: 550px) {
margin-top : 4em;
}
`
const MDropDownButton = styled.li`
border-top: 1px solid rgba(255,255,255,0.2);
background-color: transparent;
cursor: pointer;
    color: white;
list-style: none;
  overflow: hidden;
padding-top: 0.8em;
a{
    font-size: 1.3em;
    padding-left: 1em;
    text-decoration: none;
    color: white;
}
p{ /* aboutus,projects,expertise,ir 디자인 */
    margin: 0;
    padding-left: 1em;
    font-size: 1.3em;        
    padding-top: 0;
    padding-bottom: 0.7em;
}
@media only screen and (max-height: 550px) {
padding-top: 0.3em;
    a{
        font-size: 0.8em;
    }
    p{ /* aboutus,projects,expertise,ir 디자인 */
        margin: 0;
        padding-left: 1em;
        font-size: 0.8em;
        padding-bottom: 0.3em;
    }
}
`
const MDropDownContent = styled.ul`
width: 100%;
background-color: white;
list-style: none;
opacity: ${(props) => (props.isVisible ? '1' : '0')};
  max-height: ${(props) => (props.isVisible ? '112px' : '0')}; /* 112px : 0 에서 애니메이션 문제없음 186px이 모든걸 보여줌 */
  padding: 0;
  transition: ${(props) => (props.isVisible ? 'max-height 0.4s' : 'max-height 0.4s, opacity 4s')};
  a {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    font-size: 1.1em;
    display: block;
    color: gray;
    &:hover{
      color: black;
        background-color: rgba(255, 194, 0, 0.5); /* 노란색 배경 추가 */
      }
  }
@media only screen and (max-height: 550px) {
  max-height: ${(props) => (props.isVisible ? '46px' : '0')}; /* 46px : 0 에서 애니메이션 문제없음 76px이 모든걸 보여줌 */
    a{
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    font-size: 0.6em;
    display: block;
    color: gray;
    &:hover{
        background-color: rgb(255, 194, 0); /* 노란색 배경 추가 */
      }
    }
}
`
const DropdownButton = ({ title, isVisible, onClick, links }) => {
    return (
        <MDropDownButton onClick={onClick}>
            <p>
                {title} {isVisible ? '▲' : '▼'}
            </p>
            <MDropDownContent isVisible={isVisible}>
                <li>
                    {links.map((link, index) => (
                        <a key={index} href={link.href}>
                            {link.label}
                        </a>
                    ))}
                </li>
            </MDropDownContent>
        </MDropDownButton>
    );
};

export const MobileDropdown = () => {
    const [dropdowns, setDropdowns] = useState({
        aboutUs: false,
        projects: false,
        expertise: false,
        ir: false,
    });

    const toggleDropdown = (dropdown) => { // 드롭다운 보이게 하는 기능
        setDropdowns((prevDropdowns) => ({
            ...Object.keys(prevDropdowns).reduce((acc, key) => {
                acc[key] = key === dropdown ? !prevDropdowns[key] : false;
                return acc;
            }, {}),
        }));
    };
    const dropdownData = [{
        title: 'ABOUT US',
        stateKey: 'aboutUs',
        links: [
            { label: 'Corporate Profile', href: '/about-us/corporate-profile' },
            { label: 'Leadership', href: '/about-us/leadership' },
            { label: 'News', href: '/about-us/News' },
            { label: 'PR', href: '/about-us/PR' },
            { label: 'Recruit', href: '/about-us/Recruit' },
        ],
    }, {
        title: 'PROJECTS',
        stateKey: 'projects',
        links: [
            { label: 'selected works', href: '/projects/selected-works' },
            { label: 'All', href: '/projects/All' },
            { label: 'DESIGN', href: '/projects/DESIGN' },
            { label: 'CM', href: '/projects/CM' },
        ],
    }, {
        title: 'EXPERTISE',
        stateKey: 'expertise',
        links: [
            { label: 'Services', href: '/expertise/Services' },
            { label: 'Markets', href: '/expertise/Markets' },
            { label: 'Research & Idea', href: '/expertise/Research & Idea' },
            { label: 'VR/AR', href: '/expertise/VR/AR' },
        ],
    }, {
        title: 'IR',
        stateKey: 'ir',
        links: [
            { label: 'Finance', href: '/ir/Finance' },
            { label: 'Analyst Report', href: '/ir/Analyst-Report' },
            { label: 'IR Material', href: '/ir/IR Material' },
        ],
    },
    ];
    return (
        <MTotalButtonContainer>
            {dropdownData.map(({ title, stateKey, links }, index) => (
                <DropdownButton
                    key={index}
                    title={title}
                    isVisible={dropdowns[stateKey]}
                    onClick={() => toggleDropdown(stateKey)}
                    links={links}
                />
            ))}
            <MDropDownButton>
                <a href="/contact">CONTACT</a>
            </MDropDownButton>
        </MTotalButtonContainer>
    )
}
