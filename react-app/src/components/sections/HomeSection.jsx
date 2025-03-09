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
            <div>
                <p>{`${restData.tagline}`}</p>
            </div>
        :
            <Loading />
        }
        </>
    )
}

export default HomeSection