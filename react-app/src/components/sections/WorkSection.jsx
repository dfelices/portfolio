import { restBase, useFetch } from '../../utilities/Globals'
import Loading from "../../utilities/Loading"
import WorksOverlay from '../WorksOverlay';
import { useState } from 'react';

function WorkSection () {
    const { data: restData, isLoading, error } = useFetch(restBase + 'portfolio-work?_embed');
    const [selectedWork, setSelectedWork] = useState(null);

    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return(
        <>
        <section id='work' className='portfolio-works'>
            {restData.filter((work) => work.acf?.show_in_portfolio?.includes("1")).length > 0 ? (
                restData
                    .filter((work) => work.acf?.show_in_portfolio?.includes("1"))
                    .map((work) => (
                        <a
                        href="javascript:void(0);"
                        key={work.id}
                        className="portfolio-item"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigation
                            console.log("Selected Work:", work); // Check if work is being passed correctly
                            setSelectedWork(work); // Open overlay
                        }}
                        >
                            <div className="portfolio-item">
                                <h2>{work.title.rendered}</h2>
                                <img
                                    src={work._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://placehold.co/150'}
                                    alt={work.title.rendered || "Portfolio item image"}
                                />
                                <div className="tools-list">
                                    {work.acf?.work_tools?.length > 0 && work.acf.work_tools.map((tool) => (
                                        <span key={tool.term_id} className='tool'>
                                            {tool.name}
                                        </span>
                                    ))}
                                </div>
                                <p>More info</p>
                            </div>
                        </a>
                    ))
                ) : (
                    <p>No works to display at the moment.</p>
                )}
        </section>

        {selectedWork && (
            <WorksOverlay
                work={selectedWork}
                onClose={() => setSelectedWork(null)} // Close overlay
            />
        )}

        </>
    )
}

export default WorkSection