import { customEndPointGlobalSettings, useFetch } from "../../utilities/Globals";
import Loading from "../../utilities/Loading"
import LinkedInIcon from "../icons/LinkedInIcon"
import MailIcon from "../icons/MailIcon"
import GitHubIcon from "../icons/GitHubIcon"


function ContactSection (){
    const { data: restData, isLoading, error } = useFetch(customEndPointGlobalSettings);

    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return(
        <>
        <div className='contact-icons'>
            {restData.contact_links.map((link, index) => {
                // Dynamically render the appropriate inline SVG icon
                let IconComponent;

                if (link.platform_name === "LinkedIn") {
                    IconComponent = LinkedInIcon;
                } else if (link.platform_name === "Mail") {
                    IconComponent = MailIcon;
                } else if (link.platform_name === "GitHub") {
                    IconComponent = GitHubIcon;
                }

                return (
                    <a
                        href={link.platform_url}
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-link"
                    >
                        {IconComponent ? (
                            <IconComponent className="icon" />
                        ) : (
                            <span>Icon not available</span> // Fallback in case no icon matches
                        )}
                    </a>
                );
            })}
        </div>
        </>

    )
}

export default ContactSection