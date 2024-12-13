import React from 'react';
import {useRoutes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../utils/routes";

const Page = () => {

    const token = localStorage.getItem('token')

    return (
        <div >
            {
                useRoutes(token ? privateRoutes : publicRoutes)
            }
        </div>
    );
};

export default Page;