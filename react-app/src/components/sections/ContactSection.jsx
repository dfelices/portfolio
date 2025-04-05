import { customEndPointGlobalSettings, useFetch } from "../../utilities/Globals";
import Loading from "../../utilities/Loading"
import LinkedInIcon from "../icons/LinkedInIcon"
import MailIcon from "../icons/MailIcon"
import GitHubIcon from "../icons/GitHubIcon"


function ContactSection (){
    const { data: restData, isLoading, error } = useFetch(customEndPointGlobalSettings);

    // Accessible loading state
    if (isLoading) {
        return (
            <div role="status" aria-live="polite">
                <Loading /> {/* Custom loading component for visuals */}
                <p>Loading contact links...</p> {/* Static accessible message for screen readers */}
            </div>
        );
    }

    // Accessible error handling
    if (error) {
        return (
            <div role="alert">
                <p>Error: {error}</p>
            </div>
        );
    }

    // Fallback if contact links are unavailable
    if (!restData.contact_links || restData.contact_links.length === 0) {
        return <p>No contact links available.</p>;
    }

    return(
        <>
            <ul id='contact' className='contact-icons'>
                {restData.contact_links.map((link, index) => {
                    let IconComponent;

                    if (link.platform_name === "LinkedIn") {
                        IconComponent = LinkedInIcon;
                    } else if (link.platform_name === "GitHub") {
                        IconComponent = GitHubIcon;
                    }

                    return (
                        <li key={index}>
                            <a
                                href={link.platform_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-icon-link"
                                aria-label={`Visit my ${link.platform_name} profile`}
                            >
                                {IconComponent ? (
                                    <IconComponent 
                                        className="contact-icon"
                                        aria-hidden="true" // Prevent decorative icons from being announced
                                    />
                                ) : (
                                    <span role="img" aria-label={`No icon available for ${link.platform_name}`}>
                                        Icon not available
                                    </span> // Fallback in case no icon matches
                                )}
                            </a>
                        </li>
                    );
                })}

                {/* Separate Mail Icon with mailto link */}
                <li>
                    <a
                        href="mailto:daniellefelices@gmail.com?subject=Hello&body=Hi Danielle, I wanted to connect with you."
                        className="contact-icon-link"
                        aria-label="Send an email to Danielle"
                    >
                        <MailIcon className="contact-icon" />
                    </a>
                </li>
            </ul>
        </>

    )
}

export default ContactSection