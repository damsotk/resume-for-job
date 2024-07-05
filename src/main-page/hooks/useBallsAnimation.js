import { useEffect, useState } from 'react';

const useBallsAnimation = () => {
    const [balls, setBalls] = useState([]);
    let mouseX = 0;
    let mouseY = 0;
    let ballCreationEnabled = true;

    useEffect(() => {
        const createdBalls = [];

        const createBall = (x, y) => {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            document.querySelector('.containerForBalls').appendChild(ball);

            ball.style.left = `${x}px`;
            ball.style.top = `${y}px`;

            createdBalls.push({ element: ball, x, y, angle: Math.random() * Math.PI * 2 });
        };

        const updateMousePosition = (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        document.addEventListener('mousemove', updateMousePosition);

        const updateBallsPosition = () => {
            for (const ballData of createdBalls) {
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
        };

        updateBallsPosition();

        const intervalId = setInterval(() => {
            if (ballCreationEnabled && createdBalls.length < 50) {
                const startX = Math.random() * window.innerWidth;
                const startY = Math.random() * window.innerHeight;
                createBall(startX, startY);
            } else if (createdBalls.length >= 50) {
                ballCreationEnabled = false;
            }

            if (createdBalls.length > 50) {
                const ballData = createdBalls.shift();
                ballData.element.remove();
            }
        }, 200);

        return () => {
            document.removeEventListener('mousemove', updateMousePosition);
            for (const ballData of createdBalls) {
                ballData.element.remove();
            }
            clearInterval(intervalId);
        };
    }, []);

    return balls;
};

export default useBallsAnimation;