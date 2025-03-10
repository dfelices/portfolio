import { HashLink as Link } from 'react-router-hash-link'


function MobileNav(){

    return (
        <>
            <nav className='mobile-site-navigation'>
                <ul>
                    <li><Link smooth to='/#home' >Home</Link></li>
                    <li><Link smooth to='/#work' >Work</Link></li>
                    <li><Link smooth to='/#tools' >Tools</Link></li>
                    <li><Link smooth to='/#about' >About</Link></li>
                    <li><Link smooth to='/#contact' >Contact</Link></li>
                </ul>
            </nav>
        </>
    )

}

export default MobileNav