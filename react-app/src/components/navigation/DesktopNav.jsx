import { HashLink as Link } from 'react-router-hash-link';
import { useState, useEffect } from 'react';

function DesktopNav() {
    const [activeSection, setActiveSection] = useState('work'); // Default to "Work"

    const navItems = [
        { to: '/#work', label: 'Work', id: 'work' },
        { to: '/#tools', label: 'Tools', id: 'tools' },
        { to: '/#about', label: 'About', id: 'about' }
    ];

    useEffect(() => {
        const observerOptions = {
            root: null, // Observes within the viewport
            threshold: 0.2 // Trigger when 20% of a section is visible
        };

        const handleIntersect = (entries) => {
            let activeDetected = false; // To track whether any section is currently active
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                    activeDetected = true; // A section is detected as active
                }
            });

            // If no section is intersecting, default to "Work"
            if (!activeDetected) {
                setActiveSection('work');
            }
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        const sections = document.querySelectorAll('section');

        // Attach observer to all sections
        sections.forEach((section) => observer.observe(section));

        // Force "Work" as active on page load
        const handleInitialLoad = () => {
            const workSection = document.getElementById('work');
            const scrollY = window.scrollY || window.pageYOffset;

            // If the user is at or near the top, force "Work" as active
            if (workSection && scrollY < workSection.offsetHeight * 0.2) {
                setActiveSection('work');
            }
        };

        handleInitialLoad(); // Run initial load check

        return () => {
            // Cleanup observer on component unmount
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <>
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <nav className="desktop-site-navigation" role="navigation" aria-label="Main site navigation">
                <ul>
                    {navItems.map(({ to, label, id }) => (
                        <li key={id}>
                            <Link
                                smooth
                                to={to}
                                className="desktop-nav-link"
                                aria-current={activeSection === id ? 'page' : undefined}
                                tabIndex={activeSection === id ? 0 : -1}
                            >
                                <svg
                                    height="28"
                                    width="28"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="desktop-nav-icon"
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    <circle r="12" cx="14" cy="14" fill="#011627" stroke="#F8F8F8" strokeWidth="3" />
                                </svg>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default DesktopNav;
