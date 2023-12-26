import React from 'react';
import { useRouter } from "next/router";
import langJson from 'src/data/lang.json';

export const NewsItem = ({ newsNumber }) => {
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
      <p className="news-title">{newsTitles[newsNumber]}</p>
      <span className="newsreadmore">
        <em>Read more</em>
        <i>→</i>
      </span>
    </a>
  )
}

export const NewsButton = () => {
  return (
    <div className="newsbutton-container">
      {/* news1 버튼 */}
      <a className="newsbutton" href="https://www.youtube.com/watch?v=OLrv8OGTUnQ" target="_blank" rel="noopener noreferrer">
        <img src="/image/newsimage1.png" alt="youtube1 Image" />
      </a>
      {/* news2 버튼 */}
      <a className="newsbutton" style={{ marginLeft: "15px" }} href="https://www.youtube.com/watch?v=REof-nC8Ck8&feature=youtu.be" target="_blank" rel="noopener noreferrer">
        <img src="/image/newsimage2.png" alt="youtube2 Image" />
      </a>
      {/* news3 버튼 */}
      <a className="newsbutton" style={{ marginLeft: "15px" }} href="https://www.youtube.com/watch?v=Lu8uHwNpHEQ" target="_blank" rel="noopener noreferrer">
        <img src="/image/newsimage3.png" alt="youtube3 Image" />
      </a>
    </div>
  )
}