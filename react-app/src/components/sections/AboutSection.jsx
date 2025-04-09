import { customEndPointGlobalSettings, useFetch } from '../../utilities';

function AboutSection() {
    const { data: restData, error } = useFetch(customEndPointGlobalSettings);

    // Accessible error handling
    if (error) {
        return (
            <div role="alert">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <section id="about" aria-labelledby="about-heading" tabIndex="-1">
            <h2 id="about-heading">About</h2>
            <div className="about-content">
                <p>{restData?.personal_bio || "No personal bio available at the moment."}</p> {/* Fallback content for bio */}
                <p className="favourite-tagline">These are a few of my favourite things...</p>

                {restData?.fun_stuff && restData.fun_stuff.length > 0 ? (
                    <ul className="fun-list" aria-label="A list of my favorite things"> {/* Descriptive list */}
                        {restData.fun_stuff.map((itemObj, index) => (
                            <li key={index} className="fun">{itemObj.item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No fun items to display. Check back later to see my favorite things!</p>
                )}
            </div>
        </section>
    );
}

export default AboutSection;
