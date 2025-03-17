import { restBase, useFetch } from '../../utilities/Globals'
import Loading from "../../utilities/Loading"
import WorksOverlay from '../../pages/WorksOverlay';
import { useState } from 'react';

function WorkSection() {
    const { data: restData, isLoading, error } = useFetch(restBase + 'portfolio-work?_embed');
    const [selectedWork, setSelectedWork] = useState(null);

    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <section id="work" className="portfolio-works">
                <h2>Work</h2>
                <div className="portfolio-works-scroll">
                    {restData.filter((work) => work.acf?.show_in_portfolio?.includes("1")).length > 0 ? (
                        restData
                            .filter((work) => work.acf?.show_in_portfolio?.includes("1"))
                            .map((work) => (
                                <div
                                    key={work.id}
                                    className="portfolio-item"
                                    role="button"
                                    tabIndex={0} // Makes the div focusable
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent default behavior
                                        setSelectedWork(work); // Open overlay
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setSelectedWork(work); // Open overlay on Enter or Space
                                        }
                                    }}
                                >
                                    <h3>{work.title.rendered}</h3>
                                    <div className='portfolio-item-image-container'>
                                        <img
                                            src={work._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://placehold.co/150'}
                                            alt={work.title.rendered || "Portfolio item image"}
                                        />
                                    </div>
                                    <div className="tools-list">
                                        {work.acf?.work_tools?.length > 0 &&
                                            work.acf.work_tools.map((tool) => (
                                                <div key={tool.term_id} className="tool">
                                                    {tool.name}
                                                </div>
                                            ))}
                                    </div>
                                    <div className="more-info-container">
                                        <p>More info</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z"/></svg>    
                                    </div>
                                </div>
                            ))
                    ) : (
                        <p>No works to display at the moment.</p>
                    )}
                </div>
            </section>

            {selectedWork && (
                <WorksOverlay
                    work={selectedWork}
                    onClose={() => setSelectedWork(null)} // Close overlay
                />
            )}
        </>
    );
}

export default WorkSection;
