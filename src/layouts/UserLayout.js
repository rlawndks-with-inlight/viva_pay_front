import React, { useState, useEffect } from 'react';
import Header from "src/components/header";
import { useRouter } from "next/router";

const UserLayout = (props) => {
    const { children } = props;
    const router = useRouter();
    const { lang = 'kr' } = router.query;


    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default UserLayout;
