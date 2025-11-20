import { useState } from 'react';
import { Scene } from './components/Scene';
import { Section1 } from './components/sections/Section1';
import { Section2 } from './components/sections/Section2';
import { Section3 } from './components/sections/Section3';
import { Controls } from './components/Controls';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useMouseParallax } from './hooks/useMouseParallax';

/**
 * Main App Component
 * Orchestrates the entire 3D showcase experience
 * Manages scroll tracking, mouse parallax, and component integration
 */
function App() {
    const { scrollProgress, activeSection } = useScrollProgress();
    const mousePos = useMouseParallax(0.1); // Damping factor 0.1 for smooth movement

    return (
        <>
            {/* Fixed 3D Scene Canvas */}
            <Scene
                scrollProgress={scrollProgress}
                mousePos={mousePos}
                activeSection={activeSection}
            />

            {/* Scrollable Content Container */}
            <div className="scroll-container">
                {/* Section 1: Introduction with Icosahedron */}
                <div className="section">
                    <Section1 isActive={activeSection === 0} />
                </div>

                {/* Section 2: Features with Sphere */}
                <div className="section">
                    <Section2 isActive={activeSection === 1} />
                </div>

                {/* Section 3: Call to Action with Torus */}
                <div className="section">
                    <Section3 isActive={activeSection === 2} />
                </div>
            </div>

            {/* Navigation Controls */}
            <Controls activeSection={activeSection} />
        </>
    );
}

export default App;
