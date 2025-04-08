// Allows "&" to be seen on the front-end
export function decodeHTMLEntities(text) {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(text, 'text/html').documentElement.textContent;
    return decodedString;
}