import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../config';

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            axios.post(`${API_URL}/auth/signup`, {
                name,
                email,
                password,
                username,
                userProfile: {
                    phoneNumber: phoneNumber,
                    smsToggle: true,
                    emailToggle: true
                }
            })
                .then(res => {
                    if (res?.data?.success) {
                        navigate('/login')
                    }
                })
                .catch(err => console.error(err))
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: 'rebeccapurple' }}>
            <div className='card p-2 col-10 col-sm-8 col-md-7 col-lg-5' style={{ backgroundColor: 'lavender' }}>
                <h1 className="display-6">Sign up</h1>
                <form onSubmit={handleSubmit}>


                    <div className="mb-3">
                        <label htmlFor="Name" className="form-label">Name</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="Name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            required
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="number" className="form-label">Phone number</label>
                        <input
                            required
                            type="number"
                            className="form-control"
                            id="phoneNumber"
                            placeholder="Enter mobile number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                        <input
                            required
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Sign up</button>
                </form>
                <p className="text-center mt-3">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
