import React, { useState, useEffect } from 'react';
import Header from "src/components/header";
import { useRouter } from "next/router";

const UserLayout = ({ activeSection, children, updateHeaderVisibility }) => {
    const [showHeader, setShowHeader] = useState(activeSection === 0);
    const [moreButtonClicked, setMoreButtonClicked] = useState(false);
    const [isMoreClicked, setIsMoreClicked] = useState(false);

    const handleMouseMove = (e) => {
        const mouseY = e.clientY;

        if (!moreButtonClicked) {
            // Always show the header if activeSection is 0
            setShowHeader(activeSection === 0 || (activeSection >= 1 && activeSection <= 4 && mouseY < 0.11 * window.innerHeight));
        }
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [activeSection, moreButtonClicked]);

    const handleMoreButtonClick = () => {
        setMoreButtonClicked(true);
        setIsMoreClicked(true);
    };

    // Function to close the "More" modal
    const closeMore = () => {
        setMoreButtonClicked(false);
        setIsMoreClicked(false);
        if (typeof updateHeaderVisibility === 'function') {
            updateHeaderVisibility(activeSection === 0 || (activeSection >= 1 && activeSection <= 4));
        }
    };

    return (
        <div className={`user-layout ${showHeader ? 'header-visible' : ''}`}>
            {showHeader && <Header
                activeSection={activeSection}
                isMoreClicked={isMoreClicked}
                handleMoreButtonClick={handleMoreButtonClick}
                setIsMoreClicked={setIsMoreClicked}
                closeMore={closeMore} // Pass the closeMore function to Header
                updateHeaderVisibility={updateHeaderVisibility}
            />}
            {children}
        </div>
    );
};

export default UserLayout;
