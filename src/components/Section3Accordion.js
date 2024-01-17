import React, { useState } from 'react';

const Accordion = ({
    accordionImages,
    activeIndex,
    handleItemClick,
    activeTxtIndex,
    accordionItems,
}) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleLeave = () => {
        handleItemClick(false);
        setHoveredIndex(null);
    };
    return (
        <div className="main-project-list-container">
            <section className="accordion-wrapper">
                <article className="accordion-bg-list-container">
                    <ul className="accordion-bg-list clearfix">
                        {accordionImages.map((image, index) => (
                            <li
                            key={index}
                            className={`accordion-bg-item accordion-bg-item0${index + 1} ${activeIndex === index ? 'active' : ''}`}
                                style={{
                                    transform: 'translate 0px, 0px',
                                    opacity: 1,
                                    width: activeIndex === index ? '100%' : '25%', /*'25%',*/
                                    zIndex: activeIndex === index ? '1' : '0', /*  */
                                    left:  activeIndex === index ? `0` : `${index * 25}%`, /* `${index * 25}%`,*/
                                    transition: activeIndex === index ? 'width 2s cubic-bezier(0.86, 0.5, 0.07, 1), left 2s cubic-bezier(0.86, 0.5, 0.07, 1)' : 'all 0s',/* 1.1s cubic-bezier(0.86, 0.5, 0.07, 1) */
                                }}>
                                <div className="accordion-outer" style={{
                                        background: `url(${image.outerBackground}) no-repeat 50%`,
                                        backgroundSize: 'cover',
                                        boxShadow: hoveredIndex === index ? '0 0 10px 10px black' : 'none',
                                        border: hoveredIndex === index ? '5px solid white' : 'none', // Change 'red' to the desired outline color
                                        transform: hoveredIndex === index ? 'scale(0.98)' : '',
                                        transition: hoveredIndex === index ? 'all 0.2s ease' : '',
                                    }}/>
                                <div className="accordion-inner" style={{
                                    background: `url(${image.innerBackground}) no-repeat 50% 50%`,
                                    transition: activeIndex === index ? 'transform 5s ease-in-out' : '',
                                    transform: activeIndex === index ? 'scale(1.1) rotate(0.002deg)' : '',
                                }}/>
                            </li>
                        ))}
                    </ul>
                </article>
                <article className={`accordion-over-container`}>
                    <ul className="accordion-over-list">
                        {accordionItems.map((item, index) => (
                            <li
                                key={index}
                                className={`accordion-over-item`}
                                onClick={() => handleItemClick(index)}
                                onMouseLeave={() => handleLeave(false)}
                                onMouseEnter={() => setHoveredIndex(index)}
                            >
                                <a className="accordion-inner-con">
                                    <div className="accordion-off-tit-box">
                                        <span className="project-category">{item.category}</span>
                                        <strong className="project-tit">{item.title}</strong>
                                    </div>
                                    <aside className="accordion-detail-con"
                                        style={{
                                            opacity: activeTxtIndex === index ? '1' : '0',
                                            transform: activeTxtIndex === index ? '' : 'translate(0px, 100%)',
                                            transition: activeTxtIndex === index ? 'all 2s cubic-bezier(0.95, 0, 0.02, 1)' : ''
                                        }}>
                                        <p className="accordion-detail-txt">
                                            <span className="project-category">{item.category}</span>
                                            <strong className="project-tit">{item.title}</strong>
                                        </p>
                                    </aside>
                                </a>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>
        </div>
    );
};

export default Accordion;
