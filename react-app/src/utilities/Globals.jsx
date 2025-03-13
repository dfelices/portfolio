import { useState, useEffect } from "react";

// ENDPOINTS
// To access "works" aka "projects"
export const restBase = 'https://daniellefelices.com/portfolio-backend/wp-json/wp/v2/'

// Custom endpoint to access profile info, contact info, and about info from the "Options Page" in Global Settings WordPress backend
export const customEndPointGlobalSettings = 'https://daniellefelices.com/portfolio-backend/wp-json/custom/v1/global-settings'



// CUSTOM HOOKS
// Custom hook to fetch data from endpoints

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, isLoading, error };
}

