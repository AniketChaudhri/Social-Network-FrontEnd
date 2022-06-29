import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';
import { read } from './apiUser';


const Profile = (props) => {
    const [user, setUser] = useState('')
    const [redirectToSignIn, setRedirectToSignIn] = useState(false)

    
    const init = (userId) => {
        read(userId, isAuthenticated().token)
            .then(data => {
                if (data.error) {
                    setRedirectToSignIn(true)
                }
                else {
                    setUser(data)
                }
            })

    }


    useEffect(() => {
        const userId = props.match.params.userId
        init(userId)
    }, // eslint-disable-next-line
    [])

    if (redirectToSignIn) {
        return <Redirect to="/signin" />
    }
    return (
        <div className="container">
            <h4 className="mt-4 mb-4">Profile</h4>
            <p>Hello {isAuthenticated().user.name}</p>
            <p>Email: {isAuthenticated().user.email}</p>
            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
        </div>
    )
}

export default Profile;