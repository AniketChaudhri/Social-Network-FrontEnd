import { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
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
            <div className="row">
                <div className="col-md-6">
                    <h4 className="mt-4 mb-4">Profile</h4>
                    <p>Hello {isAuthenticated().user.name}</p>
                    <p>Email: {isAuthenticated().user.email}</p>
                    <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                </div>
                <div className="col-md-6">
                    {isAuthenticated().user && isAuthenticated().user._id === user._id && (
                        <div className="d-inline-block mt-5">
                            <Link to={`/user/edit/${user._id}`} className="btn btn-raised btn-success mr-5">Update Profile</Link>
                            <button className="btn btn-raised btn-danger">Delete Profile</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile;