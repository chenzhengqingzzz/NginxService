// import cookie from 'react-cookies';

/**
 * http请求
 */
export default function request(method, url, body, history){
    // debugger
    method = method.toUpperCase();
    if (method === 'GET') {
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
    }
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: body
    }).then((res) => {
        
        console.log(res.headers.get('res'), 'res')

        if (res.headers.get('res') === 'authentication') {
            sessionStorage.setItem('validation', 1);
        } else if (res.headers.get('res') === 'AuthenticationSuccessful') {
            sessionStorage.setItem('validation', 2);
            return res.json();
        } else {
            sessionStorage.removeItem('validation');
            sessionStorage.removeItem('y-auth-token');
        }
        if (res.status === 401) {
            history.push('/');
            return Promise.reject('Unauthorized.');
        } else {console.log(res)
            return res.json();
        }
    });
}

export const get = url => request('GET', url);
export const post = (url, body) => request('POST', url, body);