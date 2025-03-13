import { restBase } from '../../utilities/Globals'
import {useState, useEffect} from 'react'
import Loading from "../../utilities/Loading"
import { Link } from 'react-router-dom'

function WorkSection () {
    const restPath = restBase + 'portfolio-work?_embed'
    const [restData, setData] = useState([])
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
    
    return(
        <>
        { isLoaded?
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
        :
            <Loading />
        }
        </>
    )
}

export default WorkSection