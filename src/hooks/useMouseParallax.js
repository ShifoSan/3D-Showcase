import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to track mouse position and provide parallax values
 * Returns normalized mouse position { x, y } in range [-1, 1]
 * with smooth damping for natural movement
 */
export const useMouseParallax = (dampingFactor = 0.1) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const targetPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            // Normalize mouse position to -1 to 1 range
            // (0, 0) is center of screen
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            targetPos.current = { x, y };
        };

        const handleTouchMove = (event) => {
            if (event.touches.length > 0) {
                const touch = event.touches[0];
                const x = (touch.clientX / window.innerWidth) * 2 - 1;
                const y = -(touch.clientY / window.innerHeight) * 2 + 1;

                targetPos.current = { x, y };
            }
        };

        // Animation loop for smooth damping
        let animationFrameId;
        const animate = () => {
            // Apply damping (lerp) for smooth movement
            currentPos.current.x += (targetPos.current.x - currentPos.current.x) * dampingFactor;
            currentPos.current.y += (targetPos.current.y - currentPos.current.y) * dampingFactor;

            setMousePos({
                x: currentPos.current.x,
                y: currentPos.current.y,
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [dampingFactor]);

    return mousePos;
};
