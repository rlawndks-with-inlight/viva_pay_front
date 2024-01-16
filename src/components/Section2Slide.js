import React, { useState } from 'react';

export const Marquee = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleHover = (icon) => {
    setHoveredIcon(icon);
  };

  const handleOut = () => {
    setHoveredIcon(null);
  };

  const renderIcon = (originalSrc, hoverSrc, alt) => (
    <a
      target="_blank"
      onMouseOver={() => handleHover(hoverSrc)}
      onMouseOut={handleOut}
    >
      <img src={hoveredIcon === hoverSrc ? hoverSrc : originalSrc} alt={alt} />
    </a>
  );
  return (
    <div className="logowrapper">
      <div id="logoMarqueeSection">
        <div className="marquee">
          {renderIcon('/icon/buddygray.svg', '/icon/buddy.svg', 'Buddy Icon', )}
          {renderIcon('/icon/brightgray.svg', '/icon/bright.svg', 'Bright Icon',)}
          {renderIcon('/icon/coocongray.svg', '/icon/coocon.svg', 'Coocon Icon',)}
          {renderIcon('/icon/danalgray.svg', '/icon/danal.svg', 'Danal Icon',)}
          {renderIcon('/icon/ezgray.svg', '/icon/ez.svg', 'EZ Icon',)}
          {renderIcon('/icon/galaxiagray.svg', '/icon/galaxia.svg', 'Galaxia Icon',)}
          {renderIcon('/icon/hectogray.svg', '/icon/hecto.svg', 'Hecto Icon',)}
          {renderIcon('/icon/kgmobilgray.svg', '/icon/kgmobil.svg', 'Kgmobil Icon',)}
          {renderIcon('/icon/kiwoomgray.svg', '/icon/kiwoom.svg', 'Kiwoom Icon',)}
          {renderIcon('/icon/paylettergray.svg', '/icon/payletter.svg', 'Payletter Icon',)}
          {renderIcon('/icon/paytusgray.svg', '/icon/paytus.svg', 'Paytus Icon',)}
          {renderIcon('/icon/welecomegray.svg', '/icon/welecome.svg', 'Welecome Icon',)}
        </div>
        <div className="marquee">
          {renderIcon('/icon/buddygray.svg', '/icon/buddy.svg', 'Buddy Icon',)}
          {renderIcon('/icon/brightgray.svg', '/icon/bright.svg', 'Bright Icon',)}
          {renderIcon('/icon/coocongray.svg', '/icon/coocon.svg', 'Coocon Icon',)}
          {renderIcon('/icon/danalgray.svg', '/icon/danal.svg', 'Danal Icon',)}
          {renderIcon('/icon/ezgray.svg', '/icon/ez.svg', 'EZ Icon',)}
          {renderIcon('/icon/galaxiagray.svg', '/icon/galaxia.svg', 'Galaxia Icon',)}
          {renderIcon('/icon/hectogray.svg', '/icon/hecto.svg', 'Hecto Icon',)}
          {renderIcon('/icon/kgmobilgray.svg', '/icon/kgmobil.svg', 'Kgmobil Icon',)}
          {renderIcon('/icon/kiwoomgray.svg', '/icon/kiwoom.svg', 'Kiwoom Icon',)}
          {renderIcon('/icon/paylettergray.svg', '/icon/payletter.svg', 'Payletter Icon',)}
          {renderIcon('/icon/paytusgray.svg', '/icon/paytus.svg', 'Paytus Icon',)}
          {renderIcon('/icon/welecomegray.svg', '/icon/welecome.svg', 'Welecome Icon',)}
        </div>
      </div>
    </div>
  );
};


