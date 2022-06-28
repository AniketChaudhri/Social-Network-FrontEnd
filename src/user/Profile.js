import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';


const Profile = (props) => {
    const [user, setUser] = useState('')
    const [redirectToSignIn, setRedirectToSignIn] = useState(false)


    useEffect(() => {
        const userId = props.match.params.userId
        fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${isAuthenticated().token}`
                
            }
        })
        .then(res => res.json())

        .then(data => {
            if (data.error){
                setRedirectToSignIn(true)
            }
            else{
                setUser(data)
            }
        })
        
    })

    if (redirectToSignIn){
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