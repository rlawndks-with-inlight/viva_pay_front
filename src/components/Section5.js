import React from "react";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const WSearchDropdownContainer = styled.ul`
padding:0;
border: 0;
margin: 0;
z-index: 9999;
width: 125px;
text-decoration: none;
`
const WSearchDropdownButton = styled.li`
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
p{ /* aboutus,projects,expertise,ir 디자인 */
    margin: 0;
    font-size: 1.3em;
    color: #FFC200;
}
`
const WSearchDropdownContent = styled.ul`
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
    cursor: pointer;
    padding: 0 0.9em 0 1.35em;
    font-size: 1.1em;
    line-height: 40px;
    color: white;
    font-weight: bold;
    &:hover{
        background-color: rgba(255, 255, 255, 0.3); /* 투명도 조절 */
    }
}
`
const WSearchButton = styled.button`
border: none;
border-left: 1px solid white;
padding: 0 0 0 1.5vw;
background: transparent;
color: white;
font-size: 1.2em;
font-weight: lighter;
cursor: pointer;

    img{
        margin-left: 4vw;
        width: 20px;
        height: 20px;
    }
`
export const Section5Title = ({ }) => {

    return (
        <div className="sec5title">
            <span class="bold-text">성공</span>으로 가는 과정을 계획하는데 <span class="bold-text">함께</span>하겠습니다.
        </div>
    )
}
export const Search = ({ }) => {
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
            <span className="search-title">Search
            </span>
            <span className="search-title2 " style={{ marginLeft: "0.25em" }}>Payvery.com
            </span>
            <p className="searchsub">Creative Leadership of Payvery designs the new future never experienced before.</p>
            <div className="searchheerim">
                <form style={{ display: "flex", alignItems: "center", margin: "3vh 0 8vh" }}>
                    <div className="customselect" style={{ justifyContent: "space-between", position: "relative", display: "flex", width: "130px", lineHeight: "50px", borderBottom: "7px solid #FFC200" }}>
                        <WSearchDropdownContainer>
                            <WSearchDropdownButton onClick={toggleDropdown}>
                                <p>{selectedOption}</p><p>{isSearchDropdownVisible ? '▲' : '▼'}</p>
                            </WSearchDropdownButton>
                            <WSearchDropdownContent isVisible={isSearchDropdownVisible}>
                                <li onClick={() => handleOptionClick('All')}>All</li>
                                <li onClick={() => handleOptionClick('Project')}>Project</li>
                                <li onClick={() => handleOptionClick('News')}>News</li>
                                <li onClick={() => handleOptionClick('Leadership')}>Leadership</li>
                            </WSearchDropdownContent>
                        </WSearchDropdownContainer>
                    </div>
                    <div style={{ display: "flex", width: "65%", height: "50px", borderBottom: "7px solid white", }}>
                        <input
                            className="searchheerim-input"
                            type="text"
                            placeholder="Type here"
                            value={searchQuery}
                            onChange={handleSearchInputChange} // 검색 입력란 스타일 추가
                        />
                    </div>
                    <div style={{ display: "flex", height: "50px", borderBottom: "7px solid white", alignItems: "center" }}>
                        <WSearchButton className="searchheerim-button" onClick={handleSearch}>
                            Search
                            <img src="/icon/search.png" alt="Search Icon" />
                        </WSearchButton>
                    </div>
                </form>
                <div className="searchtag-keywords">
                    <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Payvery">#Payvery</Link></button>
                    <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Purplevery">#Purplevery</Link></button>
                    <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Pg">#Pg</Link></button>
                    <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Payment_gateway">#Payment_gateway</Link></button>
                    <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Customer">#Customer</Link></button>
                </div>
            </div>
        </div>
    )
}