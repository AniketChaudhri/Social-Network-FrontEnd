export const signUp = (user) => (
    fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)

    })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
)

export const signIn = (user) => (
    fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)

    })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
)

export const authenticate = (jwt, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(jwt));
        next();
    }
}

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
    }
    next();
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: 'GET',

    })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .catch(error => console.error('Error:', error))
}

export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            return JSON.parse(jwt);
        }
    }
    return false;
}
