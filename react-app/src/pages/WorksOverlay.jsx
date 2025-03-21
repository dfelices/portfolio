import ReactDOM from "react-dom";
import { React, useEffect} from 'react';
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs'

function WorksOverlay({ work, onClose }) {
    const overlayContainer = document.body; // Target container for the portal

    // Make sure the container exists before rendering the portal
    if (!overlayContainer) {
        console.error("Error: Target container is not available in the DOM.");
        return null;
    }
    
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onClose();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return ReactDOM.createPortal (
        <div id='overlay' className="overlay">
            <div className="overlay-content">
                <div className="top-bar">
                    <button className="close-btn" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                    </button>
                </div>
                <div className="overlay-image">
                    <img
                        src={work._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://placehold.co/150'}
                        alt={work.title.rendered || 'Work image'}
                    />
                </div>
                
                <div className="acf-text">

                    <div className="overlay-links">
                        <div className="live-site-link">
                            {work.acf?.live_site_link && (<a href={work.acf.live_site_link}>Live Site</a>)}
                        </div>
                        <div className="github-link">
                            {work.acf?.github_repo_link && (<a href={work.acf.github_repo_link}>GitHub</a>)}
                        </div>
                    </div>

                    <div className="overlay-intro">

                        <h2>{work.title.rendered}</h2>
                        <div className="overlay-tools-list">
                            {work.acf?.work_tools?.length > 0 &&
                                work.acf.work_tools.map((tool) => (
                                    <span key={tool.term_id} className="overlay-tool">
                                        {tool.name}
                                    </span>
                                ))}
                        </div>

                        <div className="overlay-collab-roles">
                            {work.acf?.collaboration && (
                                <div className="overlay-collab">
                                    <p className="overlay-sub-heading">Collaboration:</p>
                                    <p>{work.acf.collaboration}</p>
                                </div>
                            )}

                            {work.acf?.roles?.length > 0 && (
                                <div className="overlay-roles">
                                    <p className="overlay-sub-heading">{`Role(s):`}</p>
                                    <ul>
                                        {work.acf.roles.map((roleTitleObj, index) => (
                                            <li key={index}>{roleTitleObj.role_title}</li> // Access role_title correctly
                                            ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>

                    {work.acf?.overview_description && (
                            <>
                                <p className="overlay-sub-heading">Overview and Requirements:</p>                            
                                <p>{work.acf.overview_description}</p>
                            </>
                    )}

                    {work.acf?.["work-tabs"]?.length > 0 && ( // Only render tabs if they exist
                        <Tabs className={"overlay-tabs"}>
                            {/* Render Tab Titles */}
                            <TabList className={"overlay-tablist"}>
                                {work.acf["work-tabs"].map((tab, index) => (
                                    <Tab key={index} className={"overlay-tab"}>{tab.tab_title}</Tab>
                                ))}
                            </TabList>

                            {/* Render Tab Content */}
                            {work.acf["work-tabs"].map((tab, index) => (
                                <TabPanel key={index} className={"overlay-tabpanel"}>
                                    {tab.tab_content?.map((contentItem, i) => (
                                        <div key={i} className="overlay-tab-content-item">
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

                

            <a href="">Back to top</a>
            </div>
        </div>,

        document.body
    );
}

export default WorksOverlay;
