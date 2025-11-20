import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll progress
 * Returns normalized scroll position (0-1) and current active section (0, 1, or 2)
 */
export const useScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Calculate scroll progress (0 to 1)
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);

            setScrollProgress(progress);

            // Determine active section (0, 1, or 2)
            // Each section takes up 1/3 of the scroll range
            if (progress < 0.33) {
                setActiveSection(0);
            } else if (progress < 0.66) {
                setActiveSection(1);
            } else {
                setActiveSection(2);
            }
        };

        // Initial call
        handleScroll();

        // Add scroll listener with passive flag for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return { scrollProgress, activeSection };
};
