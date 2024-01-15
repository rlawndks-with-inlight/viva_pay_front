import React from "react";

export const Search = ({ }) => {

    return (
        <div className="searchwraparea">
            <div style={{flexDirection:'column'}}>
                <h1 style={{ display: 'flex'}}>
                    <span className="search-title" >Start.</span>
                    <span className="search-title" >Scale.</span>
                    <span className="search-title" >Grow.</span>
                </h1>
                <p className="searchsub">페이베리와 함께하는 모든 순간, </p>
                <p className="searchsub">여러분의 비즈니스는 더욱 강력해집니다.</p>
            </div>
            <div className="img-container">
                <div className="pg4-ph"><img src="image/1pagephone.png"></img></div>
                <div className="pg4-web"><img src="image/1pageweb.png"></img></div>
            </div>
        </div>
    )
}