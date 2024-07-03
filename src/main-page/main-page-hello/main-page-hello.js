import React, { useEffect } from 'react';
import './main-page-hello.css';

const MainPageHello = () => {
    useEffect(() => {
        const textInfo = document.querySelector('.text-info');
        const infoText = textInfo.innerText;
        textInfo.innerHTML = '';

        infoText.split('').forEach((char, index) => {
            const charElement = document.createElement('span');
            charElement.textContent = char;
            charElement.style.animation = `appear 0.5s ${index * 0.1 + 2}s forwards`;
            textInfo.appendChild(charElement);
        });
        const textGreeting = document.querySelectorAll('.text-greeting');

        textGreeting.forEach((element) => {
            let charIndex = 0;
            let greetingText = element.innerText;
            element.innerText = '';

            function typeChar() {
                if (charIndex < greetingText.length) {
                    element.innerHTML += greetingText.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 100);
                }
            }

            typeChar();
        });
    }, []);

    return (
        <header>
            <div className="container">
                <div className="header">
                    <div className="logo">
                        damsot
                    </div>
                    <div className="col" id="openModalBtn">
                        For collaboration
                    </div>
                </div>
                <div className="just-flex-yo">
                    <div className="text-greeting">
                        Hello!
                    </div>
                    <div className="text-info">
                        My name is Denis, and I've been studying Front-end development for about a year now. I'm highly
                        proficient in English. I've covered many topics within this field, solidifying my knowledge
                        through
                        extensive practice. You'll learn more about me below!
                    </div>
                    <div className="btn btn-animation">
                        <span>LEARN MORE</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default MainPageHello;