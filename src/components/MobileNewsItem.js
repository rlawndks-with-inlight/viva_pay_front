import styled from "styled-components";

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

function MobileNewsItem({ newsNumber }){
    const newsTitles = [
        "연 1조 2,000억 원 이상 거래가 이루어지고, 9300개 이상의 가맹점이 사용하고 있는 전산으로써 PG, 프랜차이즈에 사용되는 다용도 시스템입니다.",
        "페이베리와 함께하는 순간, 여러분의 비즈니스는 더욱 강력해집니다.",
        "페이베리는 PG사가 연동된 통합 모듈, 노티, 웹 문서를 제공합니다. 해당 통합 모듈과 노티 발송 기능을 통해서 PG사 및 프랜차이즈 업무에 연동 걱정 없이 결제 및 정산 시스템을 구축할 수 있습니다.",
        "페이베리는 실시간 정산부터 차액정산, 주말정산 등 매출관리와 정산관리에 특화되어 있습니다.",
        "페이베리는 운영자가 시스템 운영을 자유롭게 할 수 있도록 구현에 중점을 둔 시스템입니다.",
        "페이베리는 PG사가 연동된 통합 모듈, 노티, 웹 문서를 제공합니다. 해당 통합 모듈과 노티 발송 기능을 통해서 PG사 및 프랜차이즈 업무에 연동 걱정 없이 결제 및 정산 시스템을 구축할 수 있습니다.",
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
};

export default MobileNewsItem;