import { restBase, useFetch } from '../../utilities/Globals'
import Loading from "../../utilities/Loading"
import { Link } from 'react-router-dom'

function WorkSection () {
    const { data: restData, isLoading, error } = useFetch(restBase + 'portfolio-work?_embed');

    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;
    
    return(
        <section id='work' className='portfolio-works'>
            {restData.filter((work) => work.acf?.show_in_portfolio?.includes("1")).length > 0 ? (
                restData
                    .filter((work) => work.acf?.show_in_portfolio?.includes("1"))
                    .map((work) => (
                        <Link to={`/work/${work.id}`} key={work.id} className='more-info-link'>
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
                        </Link>
                    ))
                ) : (
                    <p>No works to display at the moment.</p>
                )}
        </section>
    )
}

export default WorkSection