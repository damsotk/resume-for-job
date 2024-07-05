import React, { useEffect } from 'react';
import MainPageHello from './main-page-hello/main-page-hello';
import MainPageSkills from './main-page-skills/main-page-skills';
import MainPageShowLogic from './main-page-show-logic-work/main-page-show-logic-work';
import useBallsAnimation from './hooks/useBallsAnimation';
import './main-page.css';

const MainPage = () => {
    const balls = useBallsAnimation();
    return (

        <header>
            <div className='containerForBalls'></div>
            <MainPageHello />
            <MainPageSkills />
            <MainPageShowLogic />
        </header>

    );
};

export default MainPage;
