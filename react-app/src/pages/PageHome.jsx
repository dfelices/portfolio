import HomeSection from '../components/sections/HomeSection'
import WorkSection from '../components/sections/WorkSection'
import ToolsSection from '../components/sections/ToolsSection'
import AboutSection from '../components/sections/AboutSection'
import ContactSection from '../components/sections/ContactSection'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Globals'
import { useState, useEffect } from 'react'



function PageHome(){
    const restPath = restBase + 'portfolio-work'
        const [restData, setData] =useState([])
        const [isLoaded, setLoadStatus] = useState(false)

        useEffect(() => {
            const fetchData = async () => {
                const response = await fetch(restPath)
                if (response.ok) {
                    const data = await response.json()
                    setData(data)
                    setLoadStatus(true)
                } else {
                    setLoadStatus(false)
                }
            }
            fetchData();
        }, [restPath])


    return(
        <>
        {isLoaded?
            <div>
                <HomeSection />
                <WorkSection works={restData}/>
                <ToolsSection />
                <AboutSection />
                <ContactSection />
            </div>
        :
            <Loading />
        }
        </>
    )
}

export default PageHome