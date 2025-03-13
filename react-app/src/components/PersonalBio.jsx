import { customEndPointGlobalSettings } from '../utilities/Globals'
import {useState, useEffect} from 'react'
import Loading from "../utilities/Loading"


function ProfessionalBio (){
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
            <p>{restData.personal_bio}</p>
        :
            <Loading />
        }
        </>
    )
}

export default ProfessionalBio