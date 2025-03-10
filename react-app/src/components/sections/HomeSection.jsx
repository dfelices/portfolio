import { customEndPointGlobalSettings } from '../../utilities/Globals'
import {useState, useEffect} from 'react'
import Loading from "../../utilities/Loading"


function HomeSection (){
    const restPath = customEndPointGlobalSettings
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
            <section id='home'>
                <h1>{`${restData.first_name} ${restData.last_name}`}</h1>
                <p>{restData.title}</p>
                <p>{`${restData.tagline}`}</p>
                <div className='contact-icons'>
                    {restData.contact_links.map((link, index) => (
                        <a href={link.platform_url} key={index} target="_blank" rel="noopener noreferrer">
                    {/* Dynamically render the appropriate icon based on platform name */}
                    <img
                        src={`/public/icons/contact/${link.platform_name.toLowerCase()}-default.svg`}
                        alt={`${link.platform_name} icon`}
                    />
            </a>
        ))}
                </div>
            </section>
        :
            <Loading />
        }
        </>
    )
}

export default HomeSection