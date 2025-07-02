



class Fetch{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }


    async post({endpoint, body, credentials, headers = {'Content-Type': 'application/json'},}){
        try {
            return await fetch(`${this.baseUrl}${endpoint}`, headers, body, credentials);
        } catch (error) {
            throw new Error(`Fetch POST request failed: ${error.message}`);
        }
    }

    async get({enddpoint, credentials, headers = {'Content-Type': 'application/json'},}){
        try {
            return await fetch(`${this.baseUrl}${endpoint}`, { method: 'GET', headers, credentials });
        } catch (error) {
            throw new Error(`Fetch GET request failed: ${error.message}`);
        }
    }

    async put({endpoint, body, credentials, headers = {'Content-Type': 'application/json'},}){
        try {
            return await fetch(`${this.baseUrl}${endpoint}`, { method: 'PUT', headers, body: JSON.stringify(body), credentials });
        } catch (error) {
            throw new Error(`Fetch PUT request failed: ${error.message}`);
        }
    }

    async delete({endpoint, credentials, headers = {'Content-Type': 'application/json'},}){
        try {
            return await fetch(`${this.baseUrl}${endpoint}`, { method: 'DELETE', headers, credentials });
        } catch (error) {
            throw new Error(`Fetch DELETE request failed: ${error.message}`);
        }
    }

    async patch({endpoint, body, credentials, headers = {'Content-Type': 'application/json'},}){
        try {
            return await fetch(`${this.baseUrl}${endpoint}`, { method: 'PATCH', headers, body: JSON.stringify(body), credentials });
        } catch (error) {
            throw new Error(`Fetch PATCH request failed: ${error.message}`);
        }
    }
}


export default Fetch; 