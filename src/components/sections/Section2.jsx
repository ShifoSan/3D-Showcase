/**
 * Section 2: Features
 * Paired with the Morphing Sphere
 * Scroll range: 0.33-0.66
 */
export const Section2 = ({ isActive }) => {
    return (
        <div className={`section-content ${isActive ? 'active' : ''}`}>
            <h2>Experience the Difference</h2>
            <p>
                Our platform delivers unmatched visual excellence with performance that never compromises.
                Every detail is crafted to provide a seamless, engaging experience.
            </p>
            <ul className="feature-list">
                <li>Real-time 3D morphing effects</li>
                <li>Physics-based smooth animations</li>
                <li>Advanced shader technology</li>
                <li>Mobile-optimized rendering</li>
            </ul>
        </div>
    );
};
