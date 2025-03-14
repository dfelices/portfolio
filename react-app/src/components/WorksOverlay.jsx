// WorksOverlay.js
import React from 'react';
import '../styles/overlay.css'; // Adjust the path to match your file's location


function WorksOverlay({ work, onClose }) {
    
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

                {work.acf?.collaboration && (<p>{work.acf.collaboration}</p>)}
                
                {work.acf?.roles?.length > 0 && (
                    <ul>
                        {work.acf.roles.map((roleTitleObj, index) => (
                            <li key={index}>{roleTitleObj.role_title}</li> // Access role_title correctly
                        ))}
                    </ul>
                )}

                {work.acf?.overview_description && (
                    <p>{work.acf.overview_description}</p>
                )}

                
            </div>
        </div>
    );
}

export default WorksOverlay;
