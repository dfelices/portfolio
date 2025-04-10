import { HashLink as Link } from 'react-router-hash-link';
import { useState } from 'react';

function DesktopNav() {
    const [activeSection, setActiveSection] = useState('');

    const navItems = [
        { to: '/#work', label: 'Work' },
        { to: '/#tools', label: 'Tools' },
        { to: '/#about', label: 'About' }
    ];

    return (
        <>
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <nav className="desktop-site-navigation" role="navigation" aria-label="Main site navigation">
                <ul>
                    {navItems.map(({ to, label }) => (
                        <li key={label} role="listitem">
                            <Link
                                smooth
                                to={to}
                                className={`desktop-nav-link ${activeSection === label.toLowerCase() ? 'active' : ''}`}
                                aria-current={activeSection === label.toLowerCase() ? 'page' : undefined}
                                onClick={() => setActiveSection(label.toLowerCase())}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') setActiveSection(label.toLowerCase());
                                }}
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
