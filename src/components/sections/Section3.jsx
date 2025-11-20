/**
 * Section 3: Call to Action
 * Paired with the Rotating Torus
 * Scroll range: 0.66-1.0
 */
export const Section3 = ({ isActive }) => {
    return (
        <div className={`section-content ${isActive ? 'active' : ''}`}>
            <h2>Get Started Today</h2>
            <p>
                Ready to transform your digital presence? Join thousands of creators who are
                already pushing the boundaries of what's possible on the web.
            </p>
            <button className="cta-button">
                Start Your Journey
            </button>
        </div>
    );
};
