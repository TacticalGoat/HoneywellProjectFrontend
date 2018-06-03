import decode from 'jwt-decode'


class AuthService {
    constructor()
    {
        this.domain = 'http://localhost:5000'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        //this.getProfile = this.getProfile.bind(this)
    }

    login(email, password){
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res=>{
            this.setTokens(res.access_token, res.refresh_token);
            return Promise.resolve(res);
        })
    }

    register(email, password, name, phone, bio){
        return this.fetch(`${this.domain}/registration`,{
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                name,
                phone,
                bio
            })
        }).then(res => {
            this.setTokens(res.access_token, res.refresh_token);
            return Promise.resolve(res);
        })
    }

    loggedIn(){
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token){
        try{
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000){
                return true;
            }
            else
            {
                return false;
            }
        }catch(err){
            return false;
        }
    }

    setTokens(access_token, refresh_token){
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
    }

    getToken(){
        return localStorage.getItem('access_token');
    }

    logout(){
        localStorage.removeItem('access_token');
    }

    fetch(url, options){
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if(this.loggedIn()){
            headers['Authorization'] = 'Bearer ' + this.getToken();
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
            console.log(response.json())
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}

export default AuthService;