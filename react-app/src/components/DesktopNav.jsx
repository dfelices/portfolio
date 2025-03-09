import { HashLink as Link } from 'react-router-hash-link'

function DesktopNav() {

    return (
        <>
            <nav className='desktop-site-navigation'>
                <ul>
                    <li><Link smooth to='/#work' >Work</Link></li>
                    <li><Link smooth to='/#tools' >Tools</Link></li>
                    <li><Link smooth to='/#about' >About</Link></li>
                </ul>
            </nav>
        </>
    )

}

export default DesktopNav