import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {

    const navigate = useNavigate('');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login')
    };

    return (
        <button
            className="btn btn-dark rounded-5 px-3 mx-3"
            onClick={handleLogout}
        >
            <i className="bi bi-box-arrow-left"></i> Chiqish
        </button>
    );
};

export default LogoutBtn;