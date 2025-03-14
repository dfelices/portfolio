import { HashLink as Link } from 'react-router-hash-link'


function MobileNav(){

    return (
        <>
            <nav className='mobile-site-navigation'>
                <ul>
                    <li>
                        <Link smooth to='/#home' >
                            <div className="nav-icon">
                                <img src="icons/nav/home.svg" alt="home icon" />
                            </div>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link smooth to='/#work' >
                            <div className="nav-icon">
                                <img src="icons/nav/work.svg" alt="work icon" />
                            </div>
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link smooth to='/#tools' >
                            <div className="nav-icon">
                                <img src="icons/nav/tools.svg" alt="tools icon" />
                            </div>
                            Tools
                        </Link>
                    </li>
                    <li>
                        <Link smooth to='/#about' >
                            <div className="nav-icon">
                                <img src="icons/nav/about.svg" alt="about icon" />
                            </div>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link smooth to='/#contact' >
                            <div className="nav-icon">
                                <img src="icons/nav/contact.svg" alt="contact icon" />
                            </div>
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )

}

export default MobileNav