import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';

function Login() {
    const navigate = useNavigate();

    // form state
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // error states
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // reset errors
        setErrors({});
        setErrorMessage('');

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/login',
                {
                    username,
                    password
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            const { user, token } = response.data;

            // save auth data
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);

            // redirect
            navigate('/');

        } catch (err) {
            const status = err.response?.status;
            const data = err.response?.data;

            // validation error (Laravel FormRequest)
            if (status === 422) {
                setErrors(data.errors || {});
                setErrorMessage('');
                return;
            }

            // auth / server error
            setErrorMessage(data?.message || 'Nimadir natolik keltiryapti.');
            setErrors({});
        }
    };

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="col-xl-5 col-md-6 col-sm-10 px-3">

                <form className="login-form" onSubmit={handleLogin}>

                    {/* TITLE */}
                    <div className="text-center mb-4">
                        <h2>Login</h2>
                    </div>

                    {/* USERNAME */}
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        label="Foydalanuvchi_ID"
                        placeholder="Foydalanuvchi_ID"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className="mb-2"
                    />
                    {errors.username && (
                        <small className="text-danger mx-2">
                            {errors.username[0]}
                        </small>
                    )}

                    {/* PASSWORD */}
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        label="Parol"
                        placeholder="Parol"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-2 mt-3"
                    />
                    {errors.password && (
                        <small className="text-danger mx-2">
                            {errors.password[0]}
                        </small>
                    )}

                    {/* GENERAL ERROR */}
                    {errorMessage && (
                        <small className="text-danger mx-2">
                            {errorMessage}
                        </small>
                    )}

                    {/* BUTTON */}
                    <button type="submit" className="login-btn w-100 mt-3">
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Login;