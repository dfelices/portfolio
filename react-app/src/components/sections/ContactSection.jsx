import { customEndPointGlobalSettings, useFetch } from "../../utilities/Globals";
import Loading from "../../utilities/Loading"


function ContactSection (){
    const { data: restData, isLoading, error } = useFetch(customEndPointGlobalSettings);

    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return(
        <>
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
        </>

    )
}

export default ContactSection