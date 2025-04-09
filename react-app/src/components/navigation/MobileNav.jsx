import { HashLink as Link } from 'react-router-hash-link';

const navItems = [
    { to: '/#home', icon: 'home.svg', label: 'Home' },
    { to: '/#work', icon: 'work.svg', label: 'Work' },
    { to: '/#tools', icon: 'tools.svg', label: 'Tools' },
    { to: '/#about', icon: 'about.svg', label: 'About' },
    { to: '/#contact', icon: 'contact.svg', label: 'Contact' }
];

function MobileNav() {
    return (
        <>
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <nav role="navigation" aria-label="Mobile site navigation">
                <ul>
                    {navItems.map(({ to, icon, label }) => (
                        <li key={to}>
                            <Link smooth to={to}>
                                <div className="nav-icon">
                                    <img src={`icons/${icon}`} alt={`${label} icon`} aria-hidden="true" />
                                </div>
                                <p>{label}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default MobileNav;
