import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const M3Place = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1em;
`;

const M3Building = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1.5em;
  font-weight: bold;
`;

const AccordionItem = ({ place, building, imageAlt, imageUrl }) => {
  return (
    <a href="/404">
      <div>
        <M3Place>{place}</M3Place>
        <M3Building>{building}</M3Building>
      </div>
      <img src={imageUrl} alt={imageAlt} />
    </a>
  );
};

const MobileAccordion = ({ langJson }) => {
  const router = useRouter();
  const { lang = 'en' } = router.query;

  const accordionData = [
    {
      place: 'Incheon, Korea',
      building: langJson[lang]?.MICN,
      imageUrl: '/image/outer1.png',
      imageAlt: 'outer1',
    },
    {
      place: 'Seoul, Korea',
      building: langJson[lang]?.MYEOUIDO,
      imageUrl: '/image/outer2.png',
      imageAlt: 'outer2',
    },
    {
      place: 'Seongnam, Korea',
      building: langJson[lang]?.MHYUNDAI,
      imageUrl: '/image/outer3.png',
      imageAlt: 'outer3',
    },
    {
      place: 'Baku, Azerbaijan',
      building: langJson[lang]?.SOCAR,
      imageUrl: '/image/outer4.png',
      imageAlt: 'outer4',
    },
  ];

  return (
    <>
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index}
          place={item.place}
          building={item.building}
          imageUrl={item.imageUrl}
          imageAlt={item.imageAlt}
        />
      ))}
    </>
  );
};

export default MobileAccordion;
