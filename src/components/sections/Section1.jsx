/**
 * Section 1: Introduction
 * Paired with the Wireframe Icosahedron
 * Scroll range: 0-0.33
 */
export const Section1 = ({ isActive }) => {
    return (
        <div className={`section-content ${isActive ? 'active' : ''}`}>
            <h1>Welcome to the Future</h1>
            <p>
                Experience the next generation of web design where creativity meets technology.
                Immerse yourself in a world of stunning 3D visuals and smooth interactions.
            </p>
            <ul className="feature-list">
                <li>Cutting-edge 3D animations</li>
                <li>Smooth scroll-based interactions</li>
                <li>Responsive mouse parallax effects</li>
                <li>High-performance rendering</li>
            </ul>
        </div>
    );
};
