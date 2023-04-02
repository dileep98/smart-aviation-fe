import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/home')
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center " style={{ height: '100vh', backgroundColor: 'rebeccapurple' }}>
            <header className='p-3 m-3'>
                <h1 className='m-0 text-light'>SMART AVAITION</h1>
                <small className='text-light'>Get notified on your flights on every device</small>
            </header>
            <div className='card p-2 col-10 col-sm-10 col-md-8 col-lg-6' style={{ backgroundColor: 'lavender' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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