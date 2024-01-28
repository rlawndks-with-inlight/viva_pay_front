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

    const handleItemClickAndLeave = (index) => {
        handleItemClick(index);
        setHoveredIndex(null);
    };

    return (
        <section className='main-container'>
            <section className='accordionwrapper'>
                <article className='accordionlistcontainer'>
                    {accordionImages.map((image, index) => (
                        <>
                            <div className='outeraccordion' style={{
                                background: `url(${image.outerBackground}) no-repeat 50%`,
                                backgroundSize: 'cover',
                                width: '100%',
                                height: '100%',
                                scale: hoveredIndex === index ? '1.02' : '',
                                boxShadow: hoveredIndex === index ? '0 0 40px black' : '',
                                border: hoveredIndex === index ? '5px solid white' : '',
                                transition: hoveredIndex === index ? 'all 0.2s ease' : '',
                            }} />
                            <div
                                key={index}
                                className={`accordion-bg-item accordion-bg-item0${index + 1} ${activeIndex === index ? 'active' : ''}`}
                                style={{
                                    transform: 'translate 0px, 0px',
                                    opacity: 1,
                                    width: activeIndex === index ? '100%' : '25%', /*'25%',*/
                                    zIndex: activeIndex === index ? '0' : '-1', /*  */
                                    left: activeIndex === index ? `0` : `${index * 25}%`, /* `${index * 25}%`,*/
                                    transition: activeIndex === index ? 'width 1s cubic-bezier(0.86, 0.5, 0.07, 1), left 1s cubic-bezier(0.86, 0.5, 0.07, 1)' : 'all 0s',/* 1.1s cubic-bezier(0.86, 0.5, 0.07, 1) */
                                }}>
                                <div className="inneraccordion" style={{
                                    zIndex: activeIndex === index ? '1' : '0',
                                    background: `url(${image.innerBackground}) no-repeat 50% 50%`,
                                    transition: activeIndex === index ? 'transform 5s ease-in-out ' : '',
                                    transform: activeIndex === index ? 'scale(1.1)' : '',
                                }} />
                            </div>
                        </>
                    ))}
                </article>
                <article className={`accordionovercontainer`}>
                    <ul className="accordionoverlist">
                        {accordionItems.map((item, index) => (
                            <li
                                key={index}
                                className={`accordionoveritem`}
                                onClick={() => handleItemClickAndLeave(index)}
                                onMouseLeave={() => handleLeave(false)}
                                onMouseEnter={() => setHoveredIndex(index)}
                            >
                                <div className="accordion-off-tit-box">
                                    <strong className="project-tit">{item.title}</strong>
                                </div>
                                <aside className="accordion-detail-con"
                                    style={{
                                        fontSize: activeTxtIndex === index ? '14px' : '0px',
                                        zIndex: activeTxtIndex === index ? '1' : '0',
                                        opacity: activeTxtIndex === index ? '1' : '0',
                                        height: activeTxtIndex === index ? '240px' : '0',
                                        transition: activeTxtIndex === index ? 'zIndex 2s cubic-bezier(0.95, 0, 0.02, 1), opacity 2s cubic-bezier(0.95, 0, 0.02, 1), height 2s cubic-bezier(0.95, 0, 0.02, 1)' : ''
                                    }}>
                                    <p className="accordion-detail-txt">
                                        <strong className="project-tit">{item.title}</strong>
                                    </p>
                                </aside>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>
        </section>
    );
};

export default Accordion;
