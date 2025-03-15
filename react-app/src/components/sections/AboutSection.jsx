import { customEndPointGlobalSettings, useFetch } from '../../utilities/Globals'
import Loading from "../../utilities/Loading"

function AboutSection (){
    const { data: restData, isLoading, error } = useFetch(customEndPointGlobalSettings);

    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;
    
    return(
        <section id='about'>
            <h2>About</h2>
            <p>{restData.personal_bio}</p>

            {restData.fun_stuff && restData.fun_stuff.length > 0 ? (
                <ul className='fun-list'>
                    {restData.fun_stuff.map((itemObj, index) => (
                        <li key={index} className='fun'>{itemObj.item}</li>
                    ))}
                </ul>
            ) : (
                <p>No fun stuff to display!</p>
            )}
        </section>
    )
}

export default AboutSection