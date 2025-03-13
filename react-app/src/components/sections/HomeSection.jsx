import { customEndPointGlobalSettings } from '../../utilities/Globals'
import {useState, useEffect} from 'react'
import Loading from "../../utilities/Loading"
import ContactSection from './ContactSection'


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
                <ContactSection />
            </section>
        :
            <Loading />
        }
        </>
    )
}

export default HomeSection