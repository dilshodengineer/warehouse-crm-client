import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {

    const navigate = useNavigate('');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login')
    };

    return (
        <div className='w-100 text-end'>
            <button
            className="btn btn-dark btn-sm rounded-5 px-3 mx-1"
            onClick={handleLogout}
        >
            <i className="bi bi-box-arrow-left"></i> Chiqish
        </button>
        </div>
    );
};

export default LogoutBtn;   