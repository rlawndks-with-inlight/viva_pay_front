import React from 'react';
import styled from 'styled-components';

const M3Building = styled.p`
word-break: keep-all;
  margin-top: 1.5em;
  padding: 0;
  font-size: 1.5em;
  font-weight: bold;
`;

const AccordionItem = ({ title, imageAlt, imageUrl }) => {
  return (
    <a href="/404">
      <div>
        <M3Building>{title}</M3Building>
      </div>
      <img src={imageUrl} alt={imageAlt} />
    </a>
  );
};

const MobileAccordion = ({  }) => {

  const accordionData = [
    {
      title: '보안 중심의 네트워크 아키텍처',
      imageUrl: '/image/outer1.png',
      imageAlt: 'outer1',
    },
    {
      title: '운영현황을 한눈에',
      imageUrl: '/image/outer2.png',
      imageAlt: 'outer2',
    },
    {
      title: '연 1조 2000억원의 거래량에도 안전하고 빠르게',
      imageUrl: '/image/outer3.png',
      imageAlt: 'outer3',
    },
    {
      title: '섬세한 디자인 커스텀마이징',
      imageUrl: '/image/outer4.png',
      imageAlt: 'outer4',
    },
  ];

  return (
    <>
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          imageUrl={item.imageUrl}
          imageAlt={item.imageAlt}
        />
      ))}
    </>
  );
};

export default MobileAccordion;
