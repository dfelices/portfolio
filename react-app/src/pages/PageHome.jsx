import HomeSection from '../components/sections/HomeSection'
import WorkSection from '../components/sections/WorkSection'
import ToolsSection from '../components/sections/ToolsSection'
import AboutSection from '../components/sections/AboutSection'
import ContactSection from '../components/sections/ContactSection'



function PageHome(){
    
    return(
        <div>
            <HomeSection />
            <WorkSection />
            <ToolsSection />
            <AboutSection />
            <ContactSection />
        </div>
    )
}

export default PageHome