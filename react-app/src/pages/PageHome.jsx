import HomeSection from '../components/sections/HomeSection'
import WorkSection from '../components/sections/WorkSection'
import ToolsSection from '../components/sections/WorkSection'
import AboutSection from '../components/sections/WorkSection'
import ContactSection from '../components/sections/WorkSection'



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