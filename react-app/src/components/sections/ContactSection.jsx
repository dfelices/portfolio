import { customEndPointGlobalSettings } from '../../utilities/Globals'
import {useState, useEffect} from 'react'
import Loading from "../../utilities/Loading"


function ContactSection (){
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
        <div className='contact-icons'>
            {restData.contact_links.map((link, index) => (
                <a href={link.platform_url} key={index} target="_blank" rel="noopener noreferrer">
            {/* Dynamically render the appropriate icon based on platform name */}
                    <img
                        src={`/icons/contact/${link.platform_name.toLowerCase()}-default.svg`}
                        alt={`${link.platform_name} icon`}
                    />
                </a>
            ))}
        </div>

        : 

        <Loading />
        }
        </>

    )
}

export default ContactSection