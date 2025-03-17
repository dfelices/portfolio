import { customEndPointGlobalSettings, useFetch } from '../utilities/Globals'
import Loading from "../utilities/Loading"


function ProfessionalBio (){
    const { data: restData, isLoading, error } = useFetch(customEndPointGlobalSettings);


    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;
    
    return(

        <p>{restData.professional_bio}</p>
    
    )
}

export default ProfessionalBio