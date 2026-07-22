import React, { useState } from 'react';
import Input from '../ui/Input';
import LoadingBtn from '../ui/LoadingBtn';
import { createEmployee, updateEmployee } from '../../services/EmployeeService';
import Message from '../ui/Message';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = ({ employee = null }) => {

    const navigate = useNavigate();

    const [forbidden, setForbidden] = useState(false);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState(employee?.name ?? '');
    const [username, setUsername] = useState(employee?.username ?? '');
    const [password, setPassword] = useState('');
    const [selected, setSelected] = useState(employee?.role ?? 'worker');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const payload = {
                name, username, password,
                role: selected
            };


            if (employee) {
                await updateEmployee(employee.id, payload);
            } else {
                await createEmployee(payload);
            }

            navigate('/employees');

        } catch (e) {

            const status = e.response?.status;

            if (status === 403) {
                setForbidden(true);
                return;
            }

            if (status === 422) {
                setError(e.response.data.errors || 'Xatolik yuz berdi');
                return;
            }

        } finally {
            setLoading(false);
        };

    }

    return (
        <>
            {forbidden && <Message message='Bu sahifadan faqatgina "Ega" foydalana oladi.' type="danger" />}

            <div className="container-fluid">
                <form className='row' onSubmit={handleSubmit}>
                    <div className="col-md-5 mt-2">
                        <Input
                            label="To'liq ismi"
                            id='name'
                            placeholder='Ismi...'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='mb-2'
                        />

                        {
                            error.name && (
                                <div className="text-danger small mb-2">
                                    {error.name[0]}
                                </div>
                            )
                        }

                    </div>

                    <div className="col-md-5 mt-2">
                        <Input
                            label="Login / Foydalanuvchi_ID"
                            id='username'
                            placeholder='Login / ID ...'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='mb-2'
                        />

                        {
                            error.username && (
                                <div className="text-danger small mb-2">
                                    {error.username[0]}
                                </div>
                            )
                        }
                    </div>

                    <div className="col-md-5 mt-2">
                        <Input
                            label="Paroli"
                            id='password'
                            placeholder='****'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='mb-2'
                        />

                        {
                            error.password && (
                                <div className="text-danger small mb-2">
                                    {error.password[0]}
                                </div>
                            )
                        }

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

                        {
                            error.role && (
                                <div className="text-danger small mb-2">
                                    {error.role[0]}
                                </div>
                            )
                        }
                    </div>

                    <div className="text-end mt-2 col-md-10">
                        <LoadingBtn
                            content={employee ? "Yangilash" : "Yaratish"}
                            isLoading={loading}
                        />
                    </div>

                </form>
            </div>
        </>
    )
}

export default EmployeeForm