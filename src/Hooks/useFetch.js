export default function useFetch(baseUrl) {

    function get(url) {
        return fetch(baseUrl + url).then(response => response.json())
    }

    return {get}
}