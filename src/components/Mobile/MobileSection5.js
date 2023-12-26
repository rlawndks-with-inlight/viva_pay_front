import React from "react";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const M5SearchDropdownContainer = styled.ul`
padding:0;
margin: 0;
width: 130px;
text-decoration: none;
`
const M5SearchDropdownButton = styled.li`
display: flex;
justify-content: space-between;
border: none;
background-color: transparent;
cursor: pointer;
color: white;
list-style: none;
a{
    text-decoration: none;
}
p{ /* 선택된 드롭다운 디자인 */
    margin: 0;
    font-size: 1.3em;
    color: #FFC200;
    padding-bottom: 0.5em;
}
`
const M5SearchDropdownContent = styled.ul`
background-color: #FFC200;
list-style: none;
position: absolute;
top: 100%;
left: 0%;
right: 0;
display: ${(props) => (props.isVisible ? 'block' : 'none')};
padding: 0;
li {
    position: relative;
    display: block;
    height: 2em;
    padding: 0 3%;
    line-height: 1.8em;
    font-size: 1.3em;
    cursor: pointer;
    color: white;
    font-weight: bold;
    &:hover{
        background-color: rgba(255, 255, 255, 0.3); /* 투명도 조절 */
    }
}
`
const M5SearchInput = styled.input`
background: transparent; /* 투명 배경 추가 */
color: white;
border: none;
width: 75%; /* 검색창의 가로 너비 조정 */
font-size: 1.2em; /* 폰트 크기 키우기 */
padding-left: 0.7em;
margin-bottom: 0.2em;
::placeholder{
    color: white;
}
`
const M5SearchButton = styled.button`
display: inline-block;
width: 10vw;
font-size: 1.3em;
margin-bottom: 0.2em;
border-left: 0.5px solid white;
border-right: none;
border-bottom: none;
border-top: none;
cursor: pointer;
text-align: center;
padding: 0;
img{
    width: 20px;
    height: 20px;
}
`
const M5SearchTag = styled.div`
padding: 5vw 0 5vw 0;
button{
    padding: 0 12px 0 0;
border: none;
font-size: 0.9em;
background-color: transparent;
    a{
        font-size: 1.4vw;
        color: #CACACA;
        text-decoration: none;
    }
}
@media only screen and (max-width: 1000px) {
    button {
        a {
            font-size: 1em;
        }
    }
}
`
export const MobileSearch = ({ }) => {
    const [isSearchDropdownVisible, setIsSearchDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('All');
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
    const [searchResult, setSearchResult] = useState('');

    const toggleDropdown = () => {
        setIsSearchDropdownVisible(!isSearchDropdownVisible);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsSearchDropdownVisible(false);
    };

    const handleSearchInputChange = (event) => { // 검색어 입력 창
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        // 여기에서 검색 로직을 구현하고, 검색 결과를 검사하여 결과가 없으면 새 창을 띄웁니다.
        // 예를 들어, 간단한 검색 로직을 시뮬레이션하여 검색 결과가 없다고 가정합니다.
        const searchResult = simulateSearch(searchQuery); // 검색 결과를 시뮬레이션하는 함수

        if (!searchResult) {
            // 검색 결과가 없을 때 새 창을 띄웁니다.
            const errorMessage = `'${searchQuery}'를 찾을 수 없습니다.`;
            openNewTab(errorMessage);
        } else {
            // 검색 결과가 있을 경우에 대한 로직을 여기에 추가할 수 있습니다.
            setSearchResult(searchResult);
        }
    };

    // 시뮬레이션용 검색 함수
    const simulateSearch = (query) => {
        // 여기에 실제 검색 로직을 구현합니다. (예: 데이터베이스에서 검색)
        // 이 함수는 단순히 시뮬레이션을 위한 예시입니다.
        return null; // 검색 결과가 없다고 가정
    };

    // 새로운 탭 출현 함수
    const openNewTab = (message) => {
        const newWindow = window.open('', '_blank');
        newWindow.document.write(message); // 새 탭에 메시지를 표시합니다.
    };

    return (

        <div className="searchwraparea">
            <span style={{ color: "#FFC200", }}>Search</span>
            <span style={{ color: "white" }}>Payvery.com</span>
            <p style={{}}>Creative Leadership of Payvery designs the new future never experienced before.</p>
            <div className="searchheerim">
                <div style={{ position: "relative", display: "block", width: "135px", borderBottom: "5px solid #FFC200" }}>
                    <M5SearchDropdownContainer>
                        <M5SearchDropdownButton onClick={toggleDropdown}>
                            <p>{selectedOption}</p> <p>{isSearchDropdownVisible ? '▲' : '▼'} </p>
                        </M5SearchDropdownButton>
                        <M5SearchDropdownContent isVisible={isSearchDropdownVisible}>
                            <li onClick={() => handleOptionClick('All')}>All</li>
                            <li onClick={() => handleOptionClick('Project')}>Project</li>
                            <li onClick={() => handleOptionClick('News')}>News</li>
                            <li onClick={() => handleOptionClick('Leadership')}>Leadership</li>
                        </M5SearchDropdownContent>
                    </M5SearchDropdownContainer>
                </div>
                <div style={{ display: "flex", marginTop: "2%", borderBottom: "5px solid white", justifyContent: "space-between" }}>
                    <M5SearchInput
                        type="text"
                        placeholder="Type here"
                        value={searchQuery}
                        onChange={handleSearchInputChange} // 검색 입력란 스타일 추가
                    />
                    <M5SearchButton className="searchheerim-button" onClick={handleSearch} style={{
                        background: "transparent",
                    }}>
                        <img src="/icon/search.png" alt="Search Icon" />
                    </M5SearchButton>
                </div>
                <M5SearchTag>
                    <button onClick={() => { window.location.reload() }}><Link href="/Payvery">#Payvery</Link></button>
                    <button onClick={() => { window.location.reload() }}><Link href="/Purplevery">#Purplevery</Link></button>
                    <button onClick={() => { window.location.reload() }}><Link href="/Pg">#Pg</Link></button>
                    <button onClick={() => { window.location.reload() }}><Link href="/Payment_gateway">#Payment_gateway</Link></button>
                    <button onClick={() => { window.location.reload() }}><Link href="/Customer">#Customer</Link></button>
                </M5SearchTag>
            </div>
        </div>
    )
}