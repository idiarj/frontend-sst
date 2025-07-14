



class Fetch{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }


    async post({endpoint, body = {}, credentials, headers = {'Content-Type': 'application/json'},}){
        try {
            const completeUrl = this.baseUrl + endpoint
            console.log(`Making POST request to: ${completeUrl}`);
            return await fetch(completeUrl, {
                method: 'POST',
                headers, 
                body: JSON.stringify(body), 
                credentials});
        } catch (error) {
            throw new Error(`Fetch POST request failed: ${error.message}`);
        }
    }

    async get({endpoint, credentials, headers = {'Content-Type': 'application/json'},}){
        try {
            const completeUrl = this.baseUrl + endpoint
            console.log(`Making GET request to: ${completeUrl}`);
            return await fetch(`${this.baseUrl}${endpoint}`, { method: 'GET', headers, credentials });
        } catch (error) {
            throw new Error(`Fetch GET request failed: ${error.message}`);
        }
    }

    async put({endpoint, body = {}, credentials, headers = {'Content-Type': 'application/json'},}){
        try {
            const completeUrl = this.baseUrl + endpoint
            console.log(`Making PUT request to: ${completeUrl}`);
            return await fetch(completeUrl, { method: 'PUT', headers, body: JSON.stringify(body), credentials });
        } catch (error) {
            throw new Error(`Fetch PUT request failed: ${error.message}`);
        }
    }

    async delete({endpoint, credentials, headers = {'Content-Type': 'application/json'},}){
        try {
            const completeUrl = this.baseUrl + endpoint
            console.log(`Making DELETE request to: ${completeUrl}`);
            return await fetch(completeUrl, { method: 'DELETE', headers, credentials });
        } catch (error) {
            throw new Error(`Fetch DELETE request failed: ${error.message}`);
        }
    }

    async patch({endpoint, body = {}, credentials, headers = {'Content-Type': 'application/json'},}){
        try {
            const completeUrl = this.baseUrl + endpoint
            console.log(`Making PATCH request to: ${completeUrl}`);
            return await fetch(completeUrl, { method: 'PATCH', headers, body: JSON.stringify(body), credentials });
        } catch (error) {
            throw new Error(`Fetch PATCH request failed: ${error.message}`);
        }
    }
}

const localhostUrl = 'http://localhost:3000';
const productionUrl = 'https://backend-sst.onrender.com';

export const achetetepese = new Fetch(localhostUrl);

