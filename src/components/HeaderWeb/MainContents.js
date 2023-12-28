import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
list-style: none;
  h2 {
    margin: 0;
    list-style: none;
  }
  &:hover a {
    opacity: 1;
    span::before {
      transform: translateY(-100%);
    }
    span::after {
      transform: translateY(0);
    }
  }
`
const CharSpan = styled.span`
  display: inline-block;
  position: relative;
  pointer-events: none;
  visibility: hidden;
  overflow: hidden;
  color: white;
  text-decoration: none;
  &::before,
  &::after {
    pointer-events: none;
    user-select: none;
    position: absolute;
    top: 0;
    left: 0;
    content: attr(data-char);
    visibility: visible;
    transition: all 0.6s cubic-bezier(0.37, 0.03, 0.09, 0.98);
    transition-delay: calc(0.05s * var(--char-index));
  }
  &::after {
    transform: translateY(100%);
  }
`
const SubButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: none;
  padding: 0;
  margin-top: 1em;
  font-size: 1em;
  background: transparent;
  text-align: left;
  transition: all 0.3s;
  a {
    position: relative;
    transition: all 0.3s;
    opacity: 0.5;
    text-decoration: none;
    margin-bottom: 1.5em;
    color: white;
    &::before {
      position: absolute;
      width: 100%;
      height: 2px;
      margin-top: 1.3em;
      content: "";
      background-color: white;
      transform: scaleX(0);
      transition: transform 0.3s;
      transform-origin: 100% 0;
    }
    &:hover::before {
      transform: scaleX(1);
      transform-origin: 0 0;
    }
  }
  @media only screen and (max-height: 550px) {
    margin-top: 0.4em;
    a {
      margin-bottom: 0.7em;
    }
  }
`
const generateCharSpans = (text) => {
    return text.split('').map((char, index) => (
        <CharSpan key={index} data-char={char} style={{ '--char-index': index }}>
            {char}
        </CharSpan>
    ))
}
const generateSubButtons = (links) => {
    return links.map((link, index) => (
        <a key={index} href={link.href}>
            {link.text}
        </a>
    ))
}
const NavigationItem = ({ linkHref, charText, subLinks }) => {
    return (
        <ListItem>
            <h2>
                <a href={linkHref}>{generateCharSpans(charText)}</a>
            </h2>
            <SubButton>{generateSubButtons(subLinks)}</SubButton>
        </ListItem>
    )
}
export const MenuButton = () => {
    const navigationData = [
        {
            linkHref: '/about-us',
            charText: 'ABOUTUS',
            subLinks: [
                { href: '/about-us/corporate-profile', text: 'Corporate Profile' },
                { href: '/about-us/leadership', text: 'Leadership' },
                { href: '/about-us/news', text: 'News' },
                { href: '/about-us/pr', text: 'PR' },
                { href: '/about-us/recruit', text: 'Recruit' },
            ]
        }, {
            linkHref: '/projects',
            charText: 'PROJECTS',
            subLinks: [
                { href: '/projects/selected works', text: 'Selected Works' },
                { href: '/projects/all', text: 'All' },
                { href: '/projects/design', text: 'Design' },
                { href: '/projects/pr', text: 'CM' },
            ]
        }, {
            linkHref: '/expertise',
            charText: 'EXPERTISE',
            subLinks: [
                { href: '/expertise/services', text: 'Service' },
                { href: '/expertise/markets', text: 'Markets' },
                { href: '/expertise/research', text: 'Research & Idea' },
                { href: '/expertise/vr', text: 'VR/AR' },
            ]
        }, {
            linkHref: '/ir',
            charText: 'IR',
            subLinks: [
                { href: '/ir/finance', text: 'Finance' },
                { href: '/ir/analyst_report', text: 'Analyst Report' },
                { href: '/ir/ir_material', text: 'IR Material' },
            ]
        }, {
            linkHref: '/contact',
            charText: 'CONTACT',
            subLinks: [
            ]
        },
    ];
    return (
        <>
            {navigationData.map((item, index) => (
                <NavigationItem
                    key={index}
                    linkHref={item.linkHref}
                    charText={item.charText}
                    subLinks={item.subLinks}
                />
            ))}
        </>
    )
}
