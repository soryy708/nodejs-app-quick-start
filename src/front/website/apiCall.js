export default function (method, route, data) {
    async function ajaxCall(method, url, data) {
        function generateQueryStr(data) {
            let queryStr = '';
            for (const key of Object.keys(data)) {
                const value = data[key];
                queryStr += `${key}=${value}&`;
            }
            queryStr = queryStr.slice(0, -1); // remove last '&'
            return queryStr;
        }

        const authToken = sessionStorage.getItem('authToken');

        const headers = {
            'Content-Type': 'application/json',
        };
        if (authToken) {
            headers.Authorization = authToken;
        }

        let requestUrl = url;
        if (method.toLowerCase() === 'get') {
            requestUrl += `?${generateQueryStr(data)}`;
        }
        const response = await fetch(requestUrl, {
            method: method,
            headers: headers,
            body: method.toLowerCase() === 'get' ? undefined : JSON.stringify(data),
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
