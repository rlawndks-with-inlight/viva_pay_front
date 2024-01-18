import React from 'react';

const HQ = ({  }) => {
    return (
        <div style={{ display: "flex" }}>
            <div className="hq">
                <div className="address">
                    <div className="hq1">
                        <img src="/icon/location.png" alt="Location Icon" /> Add.
                    </div>
                    <div className="hq1">
                        <img src="/icon/mobile.png" alt="Mobile Icon" /> Tel.
                    </div>
                </div>
                <div className="address">
                    <div className="hq2">대전광역시 서구 대덕대로241번길 20, 5층 549-4호 (둔산동, 청남빌딩)</div>
                    <div className="hq2">070-8080-3499</div>
                </div>
            </div>
            <div className="sup">
                <div className="address">
                    <div className="hq3">
                        <img src="/icon/email.png" alt="Email Icon" /> E-mail.
                    </div>
                    <div className="hq3">
                        <img src="/icon/fax.png" alt="FAX Icon" /> FAX.
                    </div>
                </div>
                <div className="address">
                    <div className="hq4">purplevery222@gmail.com</div>
                    <div className="hq4">0504-144-9419</div>
                </div>
            </div>
        </div>
    );
};

export default HQ;
