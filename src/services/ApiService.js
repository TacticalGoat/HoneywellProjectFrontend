import AuthService from './AuthService';

class ApiService{
    constructor(){
        this.Auth = new AuthService();
        this.domain = 'http://localhost:5000'
        this.fetch = this.fetch.bind(this)
    }

    getCurrentUserProfile(){
        return this.fetch(`${this.domain}/myprofile`,{
            method: 'POST'
        }).then(res =>{return Promise.resolve(res)})
    }

    getIndexProjects(){
        return this.fetch(`${this.domain}/index`,{
            method: 'GET'
        }).then(res => {return Promise.resolve(res)})
    }

    getProjectById(id){
        return this.fetch(`${this.domain}/project/details`,{
            method: 'POST',
            body: JSON.stringify({
                id
            })
        }).then(res =>{return Promise.resolve(res)})
    }

    addProject(name, markdown, banner_url, milestones){
        return this.fetch(`${this.domain}/addproject`,{
            method: 'POST',
            body: JSON.stringify({
                name,
                markdown,
                banner_url,
                milestones
            })
        }).then(res => {return Promise.resolve(res)})
    }

    reportProject(project_id){
        return this.fetch(`${this.domain}/reports`,{
            method: 'POST',
            body: JSON.stringify({
                project_id
            })
        }).then(res => {return Promise.resolve(res)})
    }

    addDonation(project_id, amount){
        return this.fetch(`${this.domain}/donations`,{
            method: 'POST',
            body: JSON.stringify({
                project_id,
                amount
            })
        }).then(res => {return Promise.resolve(res)})
    }

    fetch(url, options){
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if(this.Auth.loggedIn()){
            headers['Authorization'] = "Bearer " + this.Auth.getToken();
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response){
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}

export default ApiService