import { customEndPointGlobalSettings, useFetch } from '../../utilities';
import ContactSection from './ContactSection';
import { useMediaQuery } from 'react-responsive';
import DesktopNav from '../navigation/DesktopNav';

function HomeSection() {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const { data: restData, error } = useFetch(customEndPointGlobalSettings);

    // Accessible error handling
    if (error) {
        return <p role="alert">Error: {error}</p>; // Accessible error messaging
    }

    // Fallback content for cases where data is not available
    const firstName = restData?.first_name || 'First Name';
    const lastName = restData?.last_name || 'Last Name';
    const title = restData?.title || 'Profile Title';
    const tagline = restData?.tagline || 'Welcome to my profile';

    return (
        <>
            {isMobile ? (
                <section id="home" role="main" tabIndex="-1" aria-labelledby="home-title">
                    <div className="home-content">
                        <div className="home-name-title">
                            <h1 id="home-title">
                                {`${firstName} ${lastName}`}
                            </h1>
                            <p className="profile-title">{title}</p>
                        </div>
                        <p className="tagline">{tagline}</p>
                    </div>

                    <ContactSection />
                </section>
            ) : (
                <section id="home" role="main" tabIndex="-1" aria-labelledby="home-title">
                    <div className="desktop-home-content">
                        <div className="home-content">
                            <div>
                                <h1 id="home-title">
                                    {`${firstName} ${lastName}`}
                                </h1>
                                <p className="profile-title">{title}</p>
                            </div>
                            <p className="tagline">{tagline}</p>
                        </div>

                        <DesktopNav />
                    </div>

                    <ContactSection />
                </section>
            )}
        </>
    );
}

export default HomeSection;
