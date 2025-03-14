// WorksOverlay.js
import React from 'react';
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs'

function WorksOverlay({ work, onClose }) {


    return (
        <div className="overlay">
            <div className="overlay-content">
                <button className="close-btn" onClick={onClose}>Close</button>
                <img
                    src={work._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://placehold.co/150'}
                    alt={work.title.rendered || 'Work image'}
                />

                {work.acf?.live_site_link && (<a href={work.acf.live_site_link}>Live Site</a>)}
                {work.acf?.github_repo_link && (<a href={work.acf.github_repo_link}>GitHub</a>)}

                <h2>{work.title.rendered}</h2>

                <div className="tools-list">
                    {work.acf?.work_tools?.length > 0 &&
                        work.acf.work_tools.map((tool) => (
                            <span key={tool.term_id} className="tool">
                                {tool.name}
                            </span>
                        ))}
                </div>

                {work.acf?.collaboration && (<p>{work.acf.collaboration}</p>)}
                
                {work.acf?.roles?.length > 0 && (
                    <ul>
                        {work.acf.roles.map((roleTitleObj, index) => (
                            <li key={index}>{roleTitleObj.role_title}</li> // Access role_title correctly
                        ))}
                    </ul>
                )}

                {work.acf?.overview_description && (
                    <p>{work.acf.overview_description}</p>
                )}

                {work.acf?.["work-tabs"]?.length > 0 && ( // Only render tabs if they exist
                    <Tabs>
                        {/* Render Tab Titles */}
                        <TabList>
                            {work.acf["work-tabs"].map((tab, index) => (
                                <Tab key={index}>{tab.tab_title}</Tab>
                            ))}
                        </TabList>

                        {/* Render Tab Content */}
                        {work.acf["work-tabs"].map((tab, index) => (
                            <TabPanel key={index}>
                                {tab.tab_content?.map((contentItem, i) => (
                                    <div key={i} className="tab-content-item">
                                        {/* Handle "Text_Feature" Layout */}
                                        {contentItem.acf_fc_layout === "Text_Feature" && (
                                            <div>
                                                <h4>{contentItem.feature_title}</h4>
                                                <p>{contentItem.feature_description}</p>
                                            </div>
                                        )}

                                        {/* Handle "Key_Takeaways" Layout */}
                                        {contentItem.acf_fc_layout === "Key_Takeaways" && (
                                            <div>
                                                <h4>{contentItem.title}</h4>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: contentItem.description,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </TabPanel>
                        ))}
                    </Tabs>
                )}

                

                
            </div>
        </div>
    );
}

export default WorksOverlay;
