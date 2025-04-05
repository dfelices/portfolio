import { customEndPointGlobalSettings, useFetch } from '../../utilities/Globals'
import Loading from "../../utilities/Loading"
import ContactSection from './ContactSection'
import { useMediaQuery } from 'react-responsive'
import DesktopNav from '../navigation/DesktopNav'
import { useEffect } from 'react'


function HomeSection (){
    const isMobile = useMediaQuery({maxWidth: 768})

    const { data: restData, isLoading, error } = useFetch(customEndPointGlobalSettings);

    useEffect(() => {
        document.getElementById('home')?.focus(); // Focus management for accessibility
    }, [isMobile]);

    if (isLoading) {
        return (
            <div role="status" aria-live="polite">
                <Loading /> {/* Custom loading component for visuals */}
                <p>Loading... Please wait</p> {/* Static accessible message for screen readers */}
            </div>
        );
    }

    if (error) {
        return <p role="alert">Error: {error}</p>; // Accessible error messaging
    }
    return(
        <>
        
        {isMobile? 
            <section id='home' role='main' tabIndex='-1' aria-labelledby='home-title'>
                <div className='home-content'>
                    <div className='home-name-title'>
                        <h1 id='home-title'>
                            {`${restData.first_name || 'First Name'} ${restData.last_name || 'Last Name'}`}
                        </h1>
                        <p className="profile-title">{restData.title || "Profile Title"}</p>
                    </div>
                    <p className='tagline'>{restData.tagline || 'Welcome to my profile'}</p>
                </div>

                <ContactSection />
            </section>

            :

            <section id='home' role='main' tabIndex='-1' aria-labelledby='home-title'>
                <div className="desktop-home-content">
                    <div className="home-content">
                        <div>
                            <h1 id='home-title'>
                                {`${restData.first_name || "First Name"} ${restData.last_name || "Last Name"}`}
                            </h1>
                            <p className="profile-title">{restData.title || "Profile Title"}</p>
                        </div>
                        <p className="tagline">{restData.tagline || "Welcome to my profile"}</p>

                    </div>

                    <DesktopNav />
                </div>


                <ContactSection />
            
            </section>

        
        }
    </>

    )
}

export default HomeSection