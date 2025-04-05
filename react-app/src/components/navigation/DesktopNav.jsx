import { HashLink as Link } from 'react-router-hash-link'
import { useState, useEffect } from 'react'

function DesktopNav() {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    setActiveSection(section.id); // Update active section based on its ID
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); // Cleanup event listener
        };
    }, []);

    return (
        <>
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <nav className='desktop-site-navigation' role="navigation" aria-label="Main site navigation">
                <ul>
                    <li role="listitem">
                        <Link 
                        smooth to='/#work' 
                        className='desktop-nav-link'
                        aria-current={activeSection === 'work' ? 'page' : undefined}
                        onClick={() => setActiveSection('work')}
                        >
                            <svg 
                            height="28" 
                            width="28" 
                            xmlns="http://www.w3.org/2000/svg" 
                            className='desktop-nav-link' 
                            aria-hidden="true"
                            focusable="false"
                            >
                                <circle r="12" cx="14" cy="14" fill="#011627" stroke="#F8F8F8" strokeWidth="3" />
                            </svg>

                            Work
                        </Link>
                        
                    </li>
                    <li role="listitem">
                        <Link 
                        smooth to='/#tools' 
                        className='desktop-nav-link'
                        aria-current={activeSection === 'tools' ? 'page' : undefined}
                        onClick={() => setActiveSection('tools')}
                        >
                            <svg 
                            height="28" 
                            width="28" 
                            xmlns="http://www.w3.org/2000/svg" 
                            className='desktop-nav-icon' 
                            aria-hidden="true"
                            focusable="false"
                            >
                                <circle r="12" cx="14" cy="14" fill="#011627" stroke="#F8F8F8" strokeWidth="3" />
                            </svg>
                            
                            Tools

                        </Link>
                    </li>
                    <li role="listitem">
                        <Link 
                        smooth to='/#about' 
                        className='desktop-nav-link'
                        aria-current={activeSection === 'about' ? 'page' : undefined}
                        onClick={() => setActiveSection('about')}
                        
                        >
                            <svg 
                            height="28" 
                            width="28" 
                            xmlns="http://www.w3.org/2000/svg" 
                            className='desktop-nav-icon' 
                            aria-hidden="true"
                            focusable="false"
                            >
                                <circle r="12" cx="14" cy="14" fill="#011627" stroke="#F8F8F8" strokeWidth="3" />
                            </svg>
                                
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )

}

export default DesktopNav