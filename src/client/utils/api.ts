export let AccessToken: string = localStorage.getItem('token') || null;
export let User: any = {
    userid: localStorage.getItem('userid') || null,
    role: localStorage.getItem('role') || null
};

export const json = async <T = any>(uri: string, method: string = 'GET', body?: {}) => {

    let headers: any = {
        'Content-type': 'application/json'
    };
    if (AccessToken) {
        headers['Authorization'] = `Bearer ${AccessToken}`;
    }
    try {
        let result = await fetch(uri, {
            method,
            headers,
            body: JSON.stringify(body)
        });
        if (result.ok) {
            return <T>(await result.json());
        } else {
            return false;
        }
    } catch (err) {
        console.log(err)
        throw err;
    }
};

export const SetAccessToken = (token: string, user: {} = { userid: undefined, role: 'guest' }) => {
    AccessToken = token;
    User = user;
    
    localStorage.setItem('token', token);
    localStorage.setItem('userid', User.userid);
    localStorage.setItem('role', User.role);
};

export const ClearAccessToken = () => {
    AccessToken = '';
    if (localStorage) {
        localStorage.clear()
        console.log('localstorage', User.userid)
    }
}