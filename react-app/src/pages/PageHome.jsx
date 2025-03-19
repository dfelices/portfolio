import HomeSection from '../components/sections/HomeSection'
import WorkSection from '../components/sections/WorkSection'
import ToolsSection from '../components/sections/ToolsSection'
import AboutSection from '../components/sections/AboutSection'
import { restBase, useFetch } from '../utilities/Globals'
import Loading from '../utilities/Loading'
import { useMediaQuery } from 'react-responsive'
import MobileNav from '../components/navigation/MobileNav'

function PageHome(){
    const isMobile = useMediaQuery({maxWidth: 768})

    const { data: restData, isLoading, error } = useFetch(restBase + 'portfolio-work');

    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return(
        <>
            <div className='site-wrapper'>
                <div className="section-sticky">
                    <HomeSection />
                </div>
                
                <div className="section-scroll">
                    <WorkSection works={restData}/>
                    <ToolsSection />
                    <AboutSection />
                </div>
            </div>

            {isMobile ? (
                <MobileNav />
            ) : null}

        </>

        
    )
}

export default PageHome