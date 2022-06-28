import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signIn, authenticate } from '../auth/index';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [redirectToRefer, setRedirectToRefer] = useState(false);
    const [loading, setLoading] = useState(false);
 

    const handleOnChange = (e) => {
        setError('');
        setSuccess('');
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const user = { email, password };
        signIn(user)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setLoading(false);

                }
                // authenticate
                else {
                    authenticate(data, ()=>{
                    setRedirectToRefer(true);
                    })
                }   
                
                // redirect 
            })

    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
    )
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>{success}</div>
    )
    const showForm = () => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleOnChange} type="email" classname="form-control" name="email" value={email} />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={handleOnChange} type="password" classname="form-control" name="password" value={password} />
            </div>
            <button onClick={handleSubmit} className='btn btn-raised btn-primary'>Sign In</button>


        </form>
    )
    const redirectUser = () => {
        if (redirectToRefer) return <Redirect to='/' />
    }
    const showLoading = () => (
        loading && <div className="jumbotron text-center">Loading...</div>
    )
    return (
        <div className='container'>
            <h2 className='mt-5 mb-5'>SignIn Page</h2>
            {redirectUser()}
            {showError()}
            {showLoading()}
            {showSuccess()}
            {showForm()}
        </div>
    );
}

export default SignIn;