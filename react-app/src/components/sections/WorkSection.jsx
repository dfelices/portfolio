import { restBase } from '../../utilities/Globals'
import {useState, useEffect} from 'react'
import Loading from "../../utilities/Loading"

function WorkSection (){
    const restPath = restBase + 'portfolio-work?_embed'
    const [restData, setData] =useState([])
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
            {restData
                .filter((work) => work.acf?.show_in_portfolio?.includes("1")) // Filter only works with "Show in Portfolio" selected
                .map((work) => (
                    <div key={work.id} className="portfolio-item">
                        <h2>{work.title.rendered}</h2>
                        <img
                            src={work._embedded?.['wp:featuredmedia']?.[0]?.source_url|| 'https://placehold.co/150'}
                            alt={work.title.rendered}
                        />
                    </div>
                ))}

            </section>
        :
            <Loading />
        }
        </>
    )
}

export default WorkSection