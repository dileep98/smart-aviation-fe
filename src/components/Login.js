import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { API_URL } from '../config';
import axios from 'axios';
import Loader from '../Utils/Loader';
import notify from '../Utils/Toast';

function Login({ onLogin }) {

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        axios.post(`${API_URL}/auth/signin`, {
            usernameOrEmail,
            password
        })
            .then(loginRes => {
                if (loginRes.status === 200 && loginRes?.data.hasOwnProperty('accessToken')) {
                    notify('Logged in successfully', 's')

                    axios.get(`${API_URL}/profile/me`, {
                        headers: {
                            'Authorization': `Bearer ${loginRes?.data?.accessToken}`
                        }
                    })
                        .then(userRes => {
                            if (userRes.status === 200) {
                                onLogin(loginRes.data, userRes.data)
                            }
                        })
                        .catch(err => {
                            notify(err?.message, 'e')
                            console.error(err)
                        })
                }
            })
            .catch(err => {
                notify(err?.message, 'e')
                console.error(err)
            })
            .finally(() => setLoading(false))
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: 'rebeccapurple' }}>
            <header className='p-3 m-3'>
                <h1 className='m-0 text-light'>SMART AVAITION</h1>
                <p className="lead text-light">
                    Get notified on your flights on every device
                </p>
            </header>
            <div className='card p-2 col-10 col-sm-8 col-md-5 col-lg-4' style={{ backgroundColor: 'lavender' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address or Username</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Enter email / username"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            autoComplete='username'
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            required
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete='current-password'
                        />
                    </div>

                    <button type="submit" className="btn btn-primary col-lg-3 col-md-3 col-sm-3">{loading ? <Loader /> : 'Login'}</button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
