import {AboutSection, Footer, HomeSection, ToolsSection, WorkSection } from '../components/sections'
import { useFetch, restBase, Loading } from '../utilities'
import MobileNav from '../components/navigation/MobileNav'
import { useMediaQuery } from 'react-responsive'


function PageHome(){
    const isMobile = useMediaQuery({maxWidth: 768})

    const { data: restData, isLoading, error } = useFetch(restBase + 'portfolio-work');

    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return(
        <>
            <div className='site-wrapper'>
                <div className="section-sticky" id='main-content'>
                    <HomeSection />
                </div>
                
                <div className="section-scroll">
                    <WorkSection works={restData}/>
                    <ToolsSection />
                    <AboutSection />
                    {isMobile ? <Footer /> : null}
                </div>

            </div>

            {!isMobile ? <Footer /> : <MobileNav />}
        </>
        
    )
}

export default PageHome