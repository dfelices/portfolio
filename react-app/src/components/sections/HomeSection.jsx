import { customEndPointGlobalSettings, useFetch } from '../../utilities/Globals'
import Loading from "../../utilities/Loading"
import ContactSection from './ContactSection'
import { useMediaQuery } from 'react-responsive'
import DesktopNav from '../navigation/DesktopNav'


function HomeSection (){
    const isMobile = useMediaQuery({maxWidth: 768})

    const { data: restData, isLoading, error } = useFetch(customEndPointGlobalSettings);


    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;
    
    return(
        <>
        
        {isMobile? 
            <>  
                <section id='home'>

                    <div className="home-content">

                        <div className="home-name-title">
                            <h1>{`${restData.first_name} ${restData.last_name}`}</h1>
                            <p className='profile-title'>{restData.title}</p>
                        </div>

                        <p className='tagline'>{`${restData.tagline}`}</p>
                        
                    </div>

                    <ContactSection />

                </section>
            </>

            :

            <section id='home'>

                <div className="desktop-home-content">
                    <div className="home-content">
                        
                        <div>
                            <h1>{`${restData.first_name} ${restData.last_name}`}</h1>
                            <p className='profile-title'>{restData.title}</p>
                        </div>
                        <p className='tagline'>{`${restData.tagline}`}</p>

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