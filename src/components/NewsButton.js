import React from 'react';

const NewsButton = () => {
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
  );
};

export default NewsButton;
