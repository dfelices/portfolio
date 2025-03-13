// WorksOverlay.js
import React from 'react';
import '../styles/overlay.css'; // Adjust the path to match your file's location


function WorksOverlay({ work, onClose }) {
    console.log("Rendering Overlay with Work:", work);
    return (
        <div className="overlay">
            <div className="overlay-content">
                <button className="close-btn" onClick={onClose}>Close</button>
                <img
                    src={work._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://placehold.co/150'}
                    alt={work.title.rendered || 'Work image'}
                />
                <h2>{work.title.rendered}</h2>
                <div className="tools-list">
                    {work.acf?.work_tools?.length > 0 &&
                        work.acf.work_tools.map((tool) => (
                            <span key={tool.term_id} className="tool">
                                {tool.name}
                            </span>
                        ))}
                </div>
                <p>{work.acf?.collaboration || 'No collaboration information available'}</p>
                
                {work.acf?.roles && work.acf?.roles > 0 ? (
                    <ul>
                        {work.acf?.map((roleTitleObj, index) => (
                            <li key={index}>{roleTitleObj.item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No role information to display!</p>
                )}

                <p>{work.acf?.overview_description || 'No overview description available'}</p>

                
            </div>
        </div>
    );
}

export default WorksOverlay;
