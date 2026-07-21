import React, { useState } from 'react';
import Input from '../ui/Input';
import LoadingBtn from '../ui/LoadingBtn';

const EmployeeForm = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selected, setSelected] = useState('worker');

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = { 
            name, username, password, 
            role: selected
        };

        console.log(payload);
        
    }

    return (
        <div className="container-fluid">
            <form className='row' onSubmit={handleSubmit}>
                <div className="col-md-5 mt-2">
                    <Input
                        label="To'liq ismi"
                        placeholder='Ismi...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='mb-2'
                    />
                </div>

                <div className="col-md-5 mt-2">
                    <Input
                        label="Login / Foydalanuvchi_ID"
                        placeholder='Login / ID ...'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='mb-2'
                    />
                </div>

                <div className="col-md-5 mt-2">
                    <Input
                        label="Paroli"
                        placeholder='****'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='mb-2'
                    />
                </div>

                <div className="col-md-5 mt-2">
                    <p className='m-0'>Rollar</p>
                    <div className="d-flex gap-4 rounded-3 border p-2">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="role"
                                value="worker"
                                checked={selected === 'worker'}
                                onChange={(e) => setSelected(e.target.value)}
                                id='worker'
                            />

                            <label className="form-check-label" htmlFor='worker'>
                                Ishchi
                            </label>
                        </div>

                        <span>|</span>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="role"
                                value="admin"
                                checked={selected === 'admin'}
                                onChange={(e) => setSelected(e.target.value)}
                                id='admin'
                            />

                            <label className="form-check-label" htmlFor='admin'>
                                Admin
                            </label>
                        </div>
                    </div>
                </div>

                <div className="text-end mt-2 col-md-10">
                    <LoadingBtn content='Yaratish' isLoading={false} />
                </div>

            </form>
        </div>
    )
}

export default EmployeeForm