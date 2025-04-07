import { restBase, useFetch, Loading } from '../../utilities'
import ProfessionalBio from '../other/ProfessionalBio';
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs'
import { useMediaQuery } from 'react-responsive'
import { useState } from 'react'


function ToolsSection (){
    const { data: restData, isLoading, error } = useFetch(restBase + 'portfolio-tool-category?per_page=100');
    const isAbove1000 = useMediaQuery({ minWidth: 1001 });
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    if (isLoading) {
        return (
            <div role="status" aria-live="polite">
                <Loading />
                <p>Loading tools...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div role="alert">
                <p>Error: {error}</p>
            </div>
        );
    }

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
        <section id='tools' aria-labelledby="tools-heading">
            <div className="tools-section" aria-live="polite">
                <h2 id="tools-heading">Tools</h2>
                <ProfessionalBio />
                <Tabs>
                

                    <TabList role="tablist">
                        {isAbove1000 && (
                            <Tab
                                role="tab"
                                id="all-tab"
                                aria-selected={activeTabIndex === 0}
                                onClick={() => setActiveTabIndex(0)}
                            >
                                All
                            </Tab>
                        )}
                        <Tab
                            role="tab"
                            id="dev-tab"
                            aria-selected={activeTabIndex === 1}
                            onClick={() => setActiveTabIndex(1)}
                        >
                            {isAbove1000 ? 'Development' : 'Dev'}
                        </Tab>
                        <Tab
                            role="tab"
                            id="design-tab"
                            aria-selected={activeTabIndex === 2}
                            onClick={() => setActiveTabIndex(2)}
                        >
                            Design
                        </Tab>
                        <Tab
                            role="tab"
                            id="qualities-tab"
                            aria-selected={activeTabIndex === 3}
                            onClick={() => setActiveTabIndex(3)}
                        >
                            Qualities
                        </Tab>
                    </TabList>


                    {isAbove1000 && (
                        <div className="tab-contain" role="tabpanel" aria-labelledby="all-tab">
                            <TabPanel>
                                <ul className="tools-scroll" aria-label="All tools list">
                                    {getAllTerms().map((term) => (
                                        <li key={term.id} className='tool'>{term.name}</li>
                                        ))}
                                </ul>
                            </TabPanel>
                        </div>
                    )}

                    <div className="tab-contain" role="tabpanel" aria-labelledby="dev-tab">
                        <TabPanel>
                            <ul className='tools-scroll' aria-label="Development tools list">
                                {developmentTerms.length > 0 ? (
                                    developmentTerms.map((term) => (
                                        <li key={term.id} className="tool">{term.name}</li>
                                    ))
                                ) : (
                                    <p>No development tools available.</p>
                                )}
                            </ul>
                        </TabPanel>
                    </div>

                    <div className="tab-contain" role="tabpanel" aria-labelledby="design-tab">
                        <TabPanel>
                            <ul className='tools-scroll' aria-label="Design tools list">
                                {designTerms.length > 0 ? (
                                    designTerms.map((term) => (
                                        <li key={term.id} className="tool">{term.name}</li>
                                    ))
                                ) : (
                                    <p>No design tools available.</p>
                                )}
                            </ul>
                        </TabPanel>
                    </div>

                    <div className="tab-contain" role="tabpanel" aria-labelledby="qualities-tab">
                        <TabPanel>
                            <ul className="tools-scroll" aria-label="Qualities tools list">
                                {qualitiesTerms.length > 0 ? (
                                    qualitiesTerms.map((term) => (
                                        <li key={term.id} className="tool">{term.name}</li>
                                    ))
                                ) : (
                                    <p>No quality tools available.</p>
                                )}
                            </ul>
                        </TabPanel>

                    </div>
                </Tabs>
            </div>
        </section>
    )
}

export default ToolsSection
