import { restBase } from '../../utilities/Globals'
import {useState, useEffect} from 'react'
import Loading from "../../utilities/Loading"
import ProfessionalBio from '../professionalBio'
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs'
import "react-tabs/style/react-tabs.css";

function ToolsSection (){
    const restPath = restBase + 'portfolio-tool-category'
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
    
    // Helper function to filter categories
    const getAllTerms = () => restData
    const getTermsByParent = (parentName) => {
        const parentTerm = restData.find((term) => term.name === parentName)
        return parentTerm ? restData.filter((term) => term.parent === parentTerm.id) : []
    }

    // Filter terms by category
    const designTerms = getTermsByParent("Design")
    const developmentTerms = getTermsByParent("Development")
    const professionalHighlightsTerms = getTermsByParent("ProfessionalHighlights")

    return(
        <>
        { isLoaded?
            <section id='tools' className='tools-section'>
                <h2>Tools</h2>
                <ProfessionalBio />
                <Tabs>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab>Design</Tab>
                        <Tab>Development</Tab>
                        <Tab>Professional Highlights</Tab>
                    </TabList>

                    <TabPanel>
                        <ul>
                            {getAllTerms().map((term) => (
                                <li key={term.id}>{term.name}</li>
                            ))}
                        </ul>
                    </TabPanel>
                    <TabPanel>
                        <ul>
                            {designTerms.map((term) => (
                                <li key={term.id}>{term.name}</li>
                            ))}
                        </ul>
                    </TabPanel>
                    <TabPanel>
                        <ul>
                            {developmentTerms.map((term) => (
                                <li key={term.id}>{term.name}</li>
                            ))}
                        </ul>
                    </TabPanel>
                    <TabPanel>
                        <ul>
                            {professionalHighlightsTerms.map((term) => (
                                <li key={term.id}>{term.name}</li>
                            ))}
                        </ul>
                    </TabPanel>

                </Tabs>

            </section>
        :
            <Loading />
        }
        </>
    )
}

export default ToolsSection
