export default function (method, route, data) {
    async function ajaxCall(method, url, data) {
        const authToken = sessionStorage.getItem('authToken');

        const headers = {
            'Content-Type': 'application/json',
        };
        if (authToken) {
            headers.Authorization = authToken;
        }

        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify(data),
        });

        async function readData() {
            const asText = await response.text();
            try {
                const asJson = JSON.parse(asText);
                return asJson;
            } catch(e) {
                return asText;
            }
        }
        const responseData = await readData();

        if (!response.ok) {
            throw new Error({status: response.status, body: responseData});
        }

        return responseData;
    }

    const apiUrl = 'http://localhost:3000';
    return ajaxCall(method, `${apiUrl}/${route}`, data);
}
