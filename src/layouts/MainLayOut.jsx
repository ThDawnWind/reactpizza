import React from 'react';
import { Outlet } from 'react-router-dom';

import { PizzaHeader } from '../components/pizzaHeader';

export const MainLayOut = () => {
    return (
         <div className="wrapper">
            <PizzaHeader/>
            <div className="content">
                <Outlet />
            </div>
         </div>
    )
}