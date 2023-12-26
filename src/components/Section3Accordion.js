import React from 'react';

const Accordion = ({
    accordionImages,
    hoverIndex,
    handleItemOver,
    handleItemEnter,
    activeIndex,
    hoverTxtIndex,
    accordionItems,
}) => {

    return (
        <div className="main-project-list-container">
            <section className="accordion-wrapper">
                <article className="accordion-bg-list-container">
                    <ul className="accordion-bg-list clearfix">
                        {accordionImages.map((image, index) => (
                            <li
                                key={index}
                                className={`accordion-bg-item accordion-bg-item0${index + 1} ${hoverIndex === index ? 'active' : ''
                                    }`}
                                style={{
                                    transform: 'translate 0px, 0px',
                                    opacity: 1,
                                    width: hoverIndex === index ? '100%' : '25%', /*'25%',*/
                                    zIndex: hoverIndex === index ? '1' : '0', /*  */
                                    left: hoverIndex === index ? '0' : `${index * 25}%`, /* `${index * 25}%`,*/
                                    transition: hoverIndex === index ? 'width 0.7s linear, left 0.7s linear' : 'all 0s',/* 1.1s cubic-bezier(0.86, 0.5, 0.07, 1) */
                                }}
                                onMouseEnter={() => handleItemOver(index)}
                                onMouseLeave={() => handleItemOver(null)}>
                                <div className="accordion-outer" style={{
                                    background: `url(${image.outerBackground}) no-repeat 50% 50%`,
                                    backgroundSize: 'cover',
                                }}>
                                </div>
                                <div className="accordion-inner" style={{
                                    background: `url(${image.innerBackground}) no-repeat 50% 50%`,
                                    transition: hoverIndex === index ? 'transform 5s ease-in-out' : '',
                                    transform: hoverIndex === index ? 'scale(1.1) rotate(0.002deg)' : '',
                                }}>
                                </div>
                            </li>
                        ))}
                    </ul>
                </article>
                <article className={`accordion-over-container ${activeIndex !== null ? 'active' : ''}`}>
                    <ul className="accordion-over-list">
                        {accordionItems.map((item, index) => (
                            <li
                                key={index}
                                className={`accordion-over-item ${activeIndex === index ? 'active' : ''}`}
                                onMouseEnter={() => handleItemEnter(index)}
                                onMouseLeave={() => handleItemEnter(false)}
                            >
                                <a className="accordion-inner-con" href="/404">
                                    <div className="accordion-off-tit-box">
                                        <span className="project-category">{item.category}</span>
                                        <strong className="project-tit">{item.title}</strong>
                                    </div>
                                    <aside className="accordion-detail-con"
                                        style={{
                                            opacity: hoverTxtIndex === index ? '1' : '0',
                                            transform: hoverTxtIndex === index ? '' : 'translate(0px, 100%)',
                                            transition: hoverTxtIndex === index ? 'all 2s cubic-bezier(0.95, 0, 0.02, 1)' : ''
                                        }}>
                                        <p className="accordion-detail-txt">
                                            <span className="project-category">{item.category}</span>
                                            <strong className="project-tit">{item.title}</strong>
                                        </p>
                                        <span className="read-more-btn">
                                            <em>Read more</em>
                                            <i className="xi-long-arrow-right">→</i>
                                        </span>
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
