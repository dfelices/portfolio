import { HashLink as Link } from 'react-router-hash-link'


function MobileNav(){

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link smooth to='/#home' >
                            <div className="nav-icon">
                                <img src="icons/nav/home.svg" alt="home icon" />
                            </div>
                            <p>Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link smooth to='/#work' >
                            <div className="nav-icon">
                                <img src="icons/nav/work.svg" alt="work icon" />
                            </div>
                            <p>Work</p>
                        </Link>
                    </li>
                    <li>
                        <Link smooth to='/#tools' >
                            <div className="nav-icon-tools">
                                <img src="icons/nav/tools.svg" alt="tools icon" />
                            </div>
                            <p>Tools</p>
                        </Link>
                    </li>
                    <li>
                        <Link smooth to='/#about' >
                            <div className="nav-icon">
                                <img src="icons/nav/about.svg" alt="about icon" />
                            </div>
                            <p>About</p>
                        </Link>
                    </li>
                    <li>
                        <Link smooth to='/#contact' >
                            <div className="nav-icon">
                                <img src="icons/nav/contact.svg" alt="contact icon" />
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