import ReactDOM from "react-dom";
import { React, useEffect, useRef } from "react";
import { TabList, Tabs, Tab, TabPanel } from "react-tabs";
import { HashLink as Link } from "react-router-hash-link";

function WorksOverlay({ work, onClose }) {
    const overlayRef = useRef(null); // To focus overlay on open
    const lastFocusedElement = useRef(null); // To restore focus when overlay closes

    useEffect(() => {
        // Store the last focused element
        lastFocusedElement.current = document.activeElement;

        // Apply "open" class for animation and focus the overlay
        if (overlayRef.current) {
            overlayRef.current.classList.add("overlay-open");
            overlayRef.current.focus();
        }

        // Add event listener for escape key to close the overlay
        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onClose();
            }
        }
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            // Remove event listener and restore focus to last focused element
            window.removeEventListener("keydown", handleKeyDown);
            if (lastFocusedElement.current) {
                lastFocusedElement.current.focus();
            }
        };
    }, []);

    const handleClose = () => {
        if (overlayRef.current) {
            overlayRef.current.classList.remove("overlay-open");
            overlayRef.current.classList.add("overlay-closing");
            setTimeout(() => onClose(), 300); // Delay close to match the animation duration
        }
    };



    return ReactDOM.createPortal(
        <div
            id="overlay"
            className="overlay"
            role="dialog"
            aria-labelledby="overlay-title"
            aria-describedby="overlay-description"
            tabIndex="-1"
            ref={overlayRef}
        >
            <div className="overlay-content">
                <div className="top-bar" id="overlay-top">
                    <button
                        className="close-btn"
                        onClick={handleClose}
                        aria-label="Close overlay"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            aria-hidden="true" // Mark as decorative
                        >
                            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                        </svg>
                    </button>
                </div>

                <div className="overlay-image">
                    <img
                        src={
                            work._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                            "https://placehold.co/150"
                        }
                        alt={work.title.rendered || "Work image"}
                    />
                </div>

                <div className="acf-text">
                    <div className="overlay-links">
                        {work.acf?.live_site_link && (
                            <div className="live-site-link">
                                <a
                                    href={work.acf.live_site_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Live Site
                                </a>
                            </div>
                        )}
                        {work.acf?.github_repo_link && (
                            <div className="github-link">
                                <a
                                    href={work.acf.github_repo_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </a>
                            </div>
                        )}
                    </div>

                    <h1 id="overlay-title">{work.title.rendered}</h1>
                    <div id="overlay-description">
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
                                    <p className="overlay-sub-heading">Role(s):</p>
                                    <ul>
                                        {work.acf.roles.map((roleTitleObj, index) => (
                                            <li key={index}>{roleTitleObj.role_title}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {work.acf?.overview_description && (
                            <div className="overlay-description">
                                <p className="overlay-sub-heading">
                                    Overview and Requirements:
                                </p>
                                <p>{work.acf.overview_description}</p>
                            </div>
                        )}
                    </div>

                    {work.acf?.["work-tabs"]?.length > 0 && (
                        <Tabs>
                            <TabList role="tablist">
                                {work.acf["work-tabs"].map((tab, index) => (
                                    <Tab
                                        key={index}
                                        role="tab"
                                        aria-selected={false} // Dynamically update if needed
                                        className="overlay-tab"
                                    >
                                        {tab.tab_title}
                                    </Tab>
                                ))}
                            </TabList>
                            {work.acf["work-tabs"].map((tab, index) => (
                                <TabPanel
                                    key={index}
                                    role="tabpanel"
                                    className="overlay-tabpanel"
                                >
                                    {tab.tab_content?.map((contentItem, i) =>
                                        contentItem.acf_fc_layout === "Text_Feature" &&
                                        contentItem.feature_title &&
                                        contentItem.feature_description ? (
                                            <div key={i} className="overlay-tab-content-item">
                                                <h4>{contentItem.feature_title}</h4>
                                                <p>{contentItem.feature_description}</p>
                                            </div>
                                        ) : contentItem.acf_fc_layout === "Key_Takeaways" &&
                                          contentItem.title &&
                                          contentItem.description ? (
                                            <div key={i} className="overlay-tab-content-item">
                                                <h4>{contentItem.title}</h4>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: contentItem.description,
                                                    }}
                                                />
                                            </div>
                                        ) : null
                                    )}
                                </TabPanel>
                            ))}
                        </Tabs>
                    )}

                    <Link
                        smooth
                        to="#overlay-top"
                        className="scroll-to-top"
                        aria-label="Scroll back to top"
                    >
                        Back to top
                    </Link>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default WorksOverlay;
