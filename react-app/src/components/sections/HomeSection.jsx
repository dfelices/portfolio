import { customEndPointGlobalSettings, useFetch } from '../../utilities/Globals'
import Loading from "../../utilities/Loading"
import ContactSection from './ContactSection'


function HomeSection (){
    const { data: restData, isLoading, error } = useFetch(customEndPointGlobalSettings);

    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;
    
    return(
        <section id='home'>
            <h1>{`${restData.first_name} ${restData.last_name}`}</h1>
            <p className='profile-title'>{restData.title}</p>
            <p className='tagline'>{`${restData.tagline}`}</p>
            <ContactSection />
        </section>
    )
}

export default HomeSection