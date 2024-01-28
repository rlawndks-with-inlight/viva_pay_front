import React from 'react';

const HQ = ({ }) => {
    return (
        <div id='footer'>
            <div className='hq'>
                <div className="address">
                    <div className="hq1">
                        <div className='img-content'>
                        <img src="/icon/location.png" alt="Location Icon" /> Add.
                        </div>
                        <div>대전광역시 서구 대덕대로241번길 20, 5층 549-4호 (둔산동, 청남빌딩)</div>
                    </div>
                </div>
                <div className="address">
                    <div className="hq2">
                        <div className='img-content'>
                        <img src="/icon/mobile.png" alt="Mobile Icon" /> Tel.</div>
                        <div>070-8080-3499</div>
                    </div>
                </div>
            </div>
            <div className='sup'>
                <div className="address">
                    <div className="hq3">
                        <div className='img-content'>
                        <img src="/icon/email.png" alt="Email Icon" /> E-mail.</div>
                        <div>purplevery222@gmail.com</div>
                    </div>
                </div>
                <div className="address">
                    <div className="hq4">
                        <div className='img-content'>
                        <img src="/icon/fax.png" alt="FAX Icon" /> FAX.</div>
                        <div>0504-144-9419</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HQ;
