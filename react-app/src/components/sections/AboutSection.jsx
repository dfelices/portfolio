import { customEndPointGlobalSettings } from '../../utilities/Globals'
import {useState, useEffect} from 'react'
import Loading from "../../utilities/Loading"

function AboutSection (){
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
            <section id='about' className='about-section'>
                <h2>About</h2>
                <p>{restData.personal_bio}</p>

                {restData.fun_stuff && restData.fun_stuff.length > 0 ? (
                    <ul>
                        {restData.fun_stuff.map((itemObj, index) => (
                            <li key={index}>{itemObj.item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No fun stuff to display!</p>
                )}
            </section>
        :
            <Loading />
        }
        </>
    )
}

export default AboutSection