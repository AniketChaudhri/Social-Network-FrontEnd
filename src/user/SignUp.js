import React, { useState } from 'react';
import { signUp } from '../auth/index';

const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    

    const handleOnChange = (e) => {
        setError('');
        setSuccess('');
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {name, email, password};
        signUp(user)
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setSuccess(data.message);
                setError('');
                setName('');
                setEmail('');
                setPassword('');
            }
        })
        
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
    )
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>{success}</div>
    )
    const showForm = () => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input onChange = {handleOnChange} type="text" className="form-control" name = "name" value={name}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleOnChange} type="email" className="form-control" name = "email" value={email}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={handleOnChange} type="password" className="form-control" name = "password" value={password}/>
            </div>
            <button onClick={handleSubmit} className='btn btn-raised btn-primary'>Sign Up</button>
            

        </form>
    )
    return (
        <div className='container'>
            <h2 className='mt-5 mb-5'>SignUp Page</h2>
            {showError()}
            {showSuccess()}
            {showForm()}
        </div>
    );
} 

export default SignUp;