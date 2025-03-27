import { HashLink as Link } from 'react-router-hash-link';
import { useState, useEffect, useRef } from 'react';


function MobileNav(){
    const [activeSection, setActiveSection] = useState('');
    const timeoutRef = useRef(null); // Use a ref for better memory management

    useEffect(() => {
        const handleHashChange = () => {
            // Debounce hash change updates
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setActiveSection(window.location.hash);
            }, 100);
        };

        // Add event listener for hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Set the initial active section when the component mounts
        handleHashChange();

        // Cleanup listener and clear timeout on unmount
        return () => {
            clearTimeout(timeoutRef.current);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    useEffect(() => {
        // Focus the active link dynamically for accessibility
        const activeLink = document.querySelector(`[href="/#${activeSection.slice(1)}"]`);
        if (activeLink) {
            activeLink.focus();
        }
    }, [activeSection]);

    return (
        <>
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <nav role="navigation" aria-label="Mobile site navigation">
                <ul>
                    <li>
                        <Link 
                        smooth to='/#home'
                        aria-current={activeSection === '#home' ? 'page' : undefined}
                        >
                            <div className="nav-icon">
                                <img src="icons/home.svg" alt="" />
                            </div>
                            <p>Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                        smooth to='/#work'
                        aria-current={activeSection === '#work' ? 'page' : undefined}
                        >
                            <div className="nav-icon">
                                <img src="icons/work.svg" alt="" />
                            </div>
                            <p>Work</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                        smooth to='/#tools'
                        aria-current={activeSection === '#tools' ? 'page' : undefined}
                        >
                            <div className="nav-icon-tools">
                                <img src="icons/tools.svg" alt="" />
                            </div>
                            <p>Tools</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                        smooth to='/#about' 
                        aria-current={activeSection === '#about' ? 'page' : undefined}
                        >
                            <div className="nav-icon">
                                <img src="icons/about.svg" alt="" />
                            </div>
                            <p>About</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                        smooth to='/#contact'
                        aria-current={activeSection === '#contact' ? 'page' : undefined}
                        >
                            <div className="nav-icon">
                                <img src="icons/contact.svg" alt="" />
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