import { restBase, useFetch } from '../../utilities/Globals'
import Loading from "../../utilities/Loading"
import ProfessionalBio from '../professionalBio'
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs'
import { useMediaQuery } from 'react-responsive'


function ToolsSection (){
    const { data: restData, isLoading, error } = useFetch(restBase + 'portfolio-tool-category?per_page=100');

    const isAbove1000 = useMediaQuery({ minWidth: 1001 });

    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    // Helper function to filter categories
    const getAllTerms = () => 
        restData.filter(
            (term) => !["All", "Design", "Development", "Qualities"].includes(term.name)
        );
    
    const getTermsByParent = (parentName) => {
        const parentTerm = restData.find((term) => term.name === parentName)
        return parentTerm ? restData.filter((term) => term.parent === parentTerm.id) : []
    }

    // Filter terms by category
    const designTerms = getTermsByParent("Design")
    const developmentTerms = getTermsByParent("Development")
    const qualitiesTerms = getTermsByParent("Qualities")

    return(
        <section id='tools'>
            <div className="tools-section">
                <h2>Tools</h2>
                <ProfessionalBio />
                <Tabs>
                    <TabList>
                        {isAbove1000 && <Tab>All</Tab>}
                        <Tab> {isAbove1000? 'Development' : 'Dev'} </Tab>
                        <Tab>Design</Tab>
                        <Tab>Qualities</Tab>
                    </TabList>

                    {isAbove1000 && (
                        <div className="tab-contain">
                            <TabPanel>
                                <ul>
                                    {getAllTerms().map((term) => (
                                        <li key={term.id} className='tool'>{term.name}</li>
                                        ))}
                                </ul>
                            </TabPanel>
                        </div>
                    )}

                    <div className="tab-contain">
                        <TabPanel>
                            <ul className='tools-scroll'>
                                {developmentTerms.map((term) => (
                                    <li key={term.id} className='tool'>{term.name}</li>
                                    ))}
                            </ul>
                        </TabPanel>
                    </div>

                    <div className="tab-contain">
                        <TabPanel>
                            <ul className='tools-scroll'>
                                {designTerms.map((term) => (
                                    <li key={term.id} className='tool'>{term.name}</li>
                                    ))}
                            </ul>
                        </TabPanel>
                    </div>

                    <div className="tab-contain">
                        <TabPanel>
                            <ul className='tools-scroll'>
                                {qualitiesTerms.map((term) => (
                                    <li key={term.id} className='tool'>{term.name}</li>
                                    ))}
                            </ul>
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        </section>
    )
}

export default ToolsSection
