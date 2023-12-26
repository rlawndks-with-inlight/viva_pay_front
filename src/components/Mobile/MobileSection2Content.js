import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const M2Subtitle = styled.div`
margin-left: 0.8em;
font-size: 3em;
font-weight: bold;
font-family: 'Playfair Display', serif;
color: white;
@media screen and (width >= 800px) {
      margin-left: 12vw;
    }
`
const M2Description = styled.div`
margin-left: 1.7em;
font-size: 1.5em;
color: white;
@media screen and (width >= 800px) {
      margin-left: 12vw;
    }
`

export const Section2Content = ({ langJson }) => {
    const router = useRouter();
    const { lang = 'en' } = router.query;

    return (
        <>
            <M2Subtitle> {langJson[lang]?.FOLLOW}</M2Subtitle>
            <M2Subtitle> {langJson[lang]?.SUPPORT}</M2Subtitle>
            <M2Description>{langJson[lang]?.DESCIRPTION}</M2Description>
        </>
    )
}