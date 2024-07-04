import React, { useEffect } from 'react';
import MainPageHello from './main-page-hello/main-page-hello';
import MainPageSkills from './main-page-skills/main-page-skills';
import MainPageShowLogic from './main-page-show-logic-work/main-page-show-logic-work';
import './main-page.css';

const MainPage = () => {
    useEffect(() => {
        const balls = [];
        let mouseX = 0;
        let mouseY = 0;
        let ballCreationEnabled = true;
        let fatherOfBalls = document.querySelector('.containerForBalls');

        function createBall(x, y) {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            fatherOfBalls.appendChild(ball);

            ball.style.left = `${x}px`;
            ball.style.top = `${y}px`;

            balls.push({ element: ball, x, y, angle: Math.random() * Math.PI * 2 });
        }

        function updateMousePosition(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
        }

        document.addEventListener('mousemove', updateMousePosition);

        function updateBallsPosition() {
            for (const ballData of balls) {
                const ball = ballData.element;
                const rect = ball.getBoundingClientRect();

                const dx = rect.left + rect.width / 2 - mouseX;
                const dy = rect.top + rect.height / 2 - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const maxDistance = 200; // distance glow
                const minOpacity = 0.4;
                const maxOpacity = 0.7;

                const opacity = Math.max(minOpacity, maxOpacity - distance / maxDistance);
                ball.style.opacity = opacity;

                const speed = 0.1; // movement speed
                let newX = ballData.x + Math.cos(ballData.angle) * speed;
                let newY = ballData.y + Math.sin(ballData.angle) * speed;

                if (newX < 0 || newX > window.innerWidth) {
                    ballData.angle = Math.PI - ballData.angle;
                    newX = ballData.x + Math.cos(ballData.angle) * speed;
                }
                if (newY < 0 || newY > window.innerHeight) {
                    ballData.angle = -ballData.angle;
                    newY = ballData.y + Math.sin(ballData.angle) * speed;
                }

                ball.style.left = `${newX}px`;
                ball.style.top = `${newY}px`;

                ballData.x = newX;
                ballData.y = newY;
            }

            requestAnimationFrame(updateBallsPosition);
        }

        updateBallsPosition();

        const intervalId = setInterval(() => {
            if (ballCreationEnabled && balls.length < 50) {
                const startX = Math.random() * window.innerWidth;
                const startY = Math.random() * window.innerHeight;
                createBall(startX, startY);
            } else if (balls.length >= 50) {
                ballCreationEnabled = false;
            }

            if (balls.length > 50) {
                const ballData = balls.shift();
                ballData.element.remove();
            }
        }, 200);

        function removeAllBalls() {
            for (const ballData of balls) {
                ballData.element.remove();
            }
            balls.length = 0;
            ballCreationEnabled = true;
            clearInterval(intervalId);
        }

        return () => {
            document.removeEventListener('mousemove', updateMousePosition);
            removeAllBalls();
        };
    }, []);

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
