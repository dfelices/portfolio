import { restBase, useFetch } from '../../utilities/Globals'
import Loading from "../../utilities/Loading"
import ProfessionalBio from '../professionalBio'
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs'


function ToolsSection (){
    const { data: restData, isLoading, error } = useFetch(restBase + 'portfolio-tool-category?per_page=100');

    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    // Helper function to filter categories
    const getAllTerms = () => 
        restData.filter(
            (term) => !["All", "Design", "Development", "Professional Highlights"].includes(term.name)
        );
    
    const getTermsByParent = (parentName) => {
        const parentTerm = restData.find((term) => term.name === parentName)
        return parentTerm ? restData.filter((term) => term.parent === parentTerm.id) : []
    }

    // Filter terms by category
    const designTerms = getTermsByParent("Design")
    const developmentTerms = getTermsByParent("Development")
    const professionalHighlightsTerms = getTermsByParent("Professional Highlights")

    return(
        <section id='tools'>
            <div className="tools-section">
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
                        <ul className='tools-scroll'>
                            {getAllTerms().map((term) => (
                                <li key={term.id} className='tool'>{term.name}</li>
                                ))}
                        </ul>
                    </TabPanel>
                    <TabPanel>
                        <ul className='tools-scroll'>
                            {designTerms.map((term) => (
                                <li key={term.id} className='tool'>{term.name}</li>
                                ))}
                        </ul>
                    </TabPanel>
                    <TabPanel>
                        <ul className='tools-scroll'>
                            {developmentTerms.map((term) => (
                                <li key={term.id} className='tool'>{term.name}</li>
                                ))}
                        </ul>
                    </TabPanel>
                    <TabPanel>
                        <ul className='tools-scroll'>
                            {professionalHighlightsTerms.map((term) => (
                                <li key={term.id} className='tool'>{term.name}</li>
                                ))}
                        </ul>
                    </TabPanel>
                </Tabs>
            </div>
        </section>
    )
}

export default ToolsSection
