import { HashLink as Link } from 'react-router-hash-link'

function DesktopNav() {

    return (
        <>
            <nav className='desktop-site-navigation'>
                <ul>
                    <li>
                        <Link smooth to='/#work' className='desktop-nav-link' >
                            <svg height="28" width="28" xmlns="http://www.w3.org/2000/svg" className='desktop-nav-link'>
                                <circle r="12" cx="14" cy="14" fill="#DBF8A0" stroke="#011627" 
                                strokeWidth="3" />
                            </svg>

                            Work
                        </Link>
                        
                    </li>
                    <li>
                        <Link smooth to='/#tools' className='desktop-nav-link' >

                            <svg height="28" width="28" xmlns="http://www.w3.org/2000/svg" className='desktop-nav-icon'>
                                <circle r="12" cx="14" cy="14" fill="#DBF8A0" stroke="#011627" strokeWidth="3" />
                            </svg>
                            
                            Tools

                        </Link>
                    </li>
                    <li>
                        <Link smooth to='/#about' className='desktop-nav-link'>
                            <svg height="28" width="28" xmlns="http://www.w3.org/2000/svg" className='desktop-nav-icon'>
                                <circle r="12" cx="14" cy="14" fill="#DBF8A0" stroke="#011627" strokeWidth="3" />
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