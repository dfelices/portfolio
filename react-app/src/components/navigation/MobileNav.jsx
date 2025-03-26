import { HashLink as Link } from 'react-router-hash-link';
import { useState, useEffect } from 'react';


function MobileNav(){
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        let timeout;

        // Update active section based on URL hash with debouncing
        const handleHashChange = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setActiveSection(window.location.hash);
            }, 100);
        };

        // Add event listener for hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Set initial active section on load
        handleHashChange();

        // Cleanup listener on unmount
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    useEffect(() => {
        // Focus active link for enhanced accessibility
        const activeLink = document.querySelector(`[href="/#${activeSection.slice(1)}"]`);
        if (activeLink) {
            activeLink.focus();
        }
    }, [activeSection]);

    return (
        <>
            <nav role="navigation" aria-label="Mobile site navigation">
                <ul>
                    <li>
                        <Link 
                        smooth to='/#home'
                        aria-current={activeSection === '#home' && 'page'}
                        >
                            <div className="nav-icon">
                                <img src="icons/home.svg" alt="Navigate to the home section" />
                            </div>
                            <p>Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                        smooth to='/#work'
                        aria-current={activeSection === '#work' && 'page'}
                        >
                            <div className="nav-icon">
                                <img src="icons/work.svg" alt="Navigate to the work section" />
                            </div>
                            <p>Work</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                        smooth to='/#tools'
                        aria-current={activeSection === '#tools' && 'page'}
                        >
                            <div className="nav-icon-tools">
                                <img src="icons/tools.svg" alt="Navigate to the tool section" />
                            </div>
                            <p>Tools</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                        smooth to='/#about' 
                        aria-current={activeSection === '#about' && 'page'}
                        >
                            <div className="nav-icon">
                                <img src="icons/about.svg" alt="Navigate to the about section" />
                            </div>
                            <p>About</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                        smooth to='/#contact'
                        aria-current={activeSection === '#contact' && 'page'}
                        >
                            <div className="nav-icon">
                                <img src="icons/contact.svg" alt="Navigate to the contact section" />
                            </div>
                            <p>Contact</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )

}

export default MobileNav