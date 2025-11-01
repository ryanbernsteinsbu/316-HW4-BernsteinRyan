class Fetcher {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async _request(endpoint, options = {}) {
        const defaultHeaders = {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        };

        const fetchOptions = {
            credentials: "include",
            ...options,
            headers: { ...defaultHeaders, ...(options.headers || {}) } 
        };

        const res = await fetch(this.baseURL + endpoint, fetchOptions);
        const text = await res.text();
        // console.log(text);
        if (!res.ok) {// handle errors
            let errorData;
            try {
                errorData = JSON.parse(text);
            } catch {
                errorData = { message: text };
            }
            const err = new Error(`HTTP ${res.status}`);
            err.status = res.status;
            err.data = errorData;
            throw err;
        }

        if (!text){  // empty case
            const resp = {
                status: res.status,
                headers: res.headers,
            }
            return resp;
        }
        const resp = {
            data: JSON.parse(text),
            status: res.status,
            headers: res.headers,
        }
        return resp;
    }

    get(endpoint) {
        return this._request(endpoint, { method: "GET" });
    }

    post(endpoint, body) {
        return this._request(endpoint, {
            method: "POST",
            body: JSON.stringify(body)
        });
    }

    put(endpoint, body) {
        return this._request(endpoint, {
            method: "PUT",
            body: JSON.stringify(body)
        });
    }

    patch(endpoint, body) {
        return this._request(endpoint, {
            method: "PATCH",
            body: JSON.stringify(body)
        });
    }

    delete(endpoint) {
        return this._request(endpoint, { method: "DELETE" });
    }
}

export { Fetcher };

