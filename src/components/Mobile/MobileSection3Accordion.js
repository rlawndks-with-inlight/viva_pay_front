import React from 'react';
import { useRouter } from "next/router";
import styled from "styled-components";

const M3Place = styled.p`
margin: 0;
padding: 0;
font-size: 1em;
`
const M3Building = styled.p`
margin: 0;
padding: 0;
font-size: 1.5em;
font-weight: bold;
`
const MobileAccordion = ({ langJson }) => {
  const router = useRouter();
  const { lang = 'en' } = router.query;

  return (
    <>
      <a href="/404">
        <div>
          <M3Place>Incheon, Korea</M3Place>
          <M3Building>{langJson[lang]?.MICN}</M3Building>
        </div>
        <img src="/image/outer1.png" alt="outer1" />
      </a>
      <a href="/404">
        <div>
          <M3Place>Seoul, Korea</M3Place>
          <M3Building>{langJson[lang]?.MYEOUIDO}</M3Building>
        </div>
        <img src="/image/outer2.png" alt="outer2" />
      </a>
      <a href="/404">
        <div>
          <M3Place>Seongnam, Korea</M3Place>
          <M3Building>{langJson[lang]?.MHYUNDAI}</M3Building>
        </div>
        <img src="/image/outer3.png" alt="outer3" />
      </a>
      <a href="/404">
        <div>
          <M3Place>Baku, Azerbaijan</M3Place>
          <M3Building>{langJson[lang]?.SOCAR}</M3Building>
        </div>
        <img src="/image/outer4.png" alt="outer4" />
      </a>
    </>
  );
};

export default MobileAccordion;
