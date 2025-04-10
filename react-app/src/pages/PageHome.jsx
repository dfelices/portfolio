import { AboutSection, Footer, HomeSection, ToolsSection, WorkSection } from '../components/sections';
import { useFetch, restBase, Loading } from '../utilities';
import MobileNav from '../components/navigation/MobileNav';
import { useMediaQuery } from 'react-responsive';

function PageHome() {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const { data: restData, isLoading, error } = useFetch(restBase + 'portfolio-work');

    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    // General metadata fallback
    const pageTitle = "Welcome to My Portfolio";
    const pageDescription = "Explore my works, tools, and professional background.";
    const pageKeywords = "portfolio, work, tools, about, professional bio";

    return (
        <>
            {/* Metadata Tags */}
            <>
                <title>{restData?.meta_title || pageTitle}</title>
                <meta name="description" content={restData?.meta_description || pageDescription} />
                <meta name="author" content={restData?.meta_author || "Your Name"} />
                <meta name="keywords" content={restData?.meta_keywords || pageKeywords} />
            </>

            <div className="site-wrapper">
                <div className="section-sticky" id="main-content">
                    <HomeSection />
                </div>
                
                <div className="section-scroll">
                    <WorkSection works={restData} />
                    <ToolsSection />
                    <AboutSection />
                    {isMobile ? <Footer /> : null}
                </div>
            </div>

            {!isMobile ? <Footer /> : <MobileNav />}
        </>
    );
}

export default PageHome;
