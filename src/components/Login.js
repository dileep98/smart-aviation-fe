import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { API_URL } from '../config';
import axios from 'axios';

function Login({ onLogin }) {

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/auth/signin`, {
            usernameOrEmail,
            password
        })
            .then(res => {
                if (res.status === 200 && res?.data.hasOwnProperty('accessToken')) {
                    onLogin(res.data)
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center " style={{ height: '100vh', backgroundColor: 'rebeccapurple' }}>
            <header className='p-3 m-3'>
                <h1 className='m-0 text-light'>SMART AVAITION</h1>
                <p className="lead text-light">
                    Get notified on your flights on every device
                </p>
            </header>
            <div className='card p-2 col-10 col-sm-8 col-md-7 col-lg-5' style={{ backgroundColor: 'lavender' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address or Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Enter email / username"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
