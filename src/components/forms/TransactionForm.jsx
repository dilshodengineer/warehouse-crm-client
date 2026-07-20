import React, { useState } from 'react';
import Input from '../ui/Input';
import LoadingBtn from '../ui/LoadingBtn';
import { createTransaction } from '../../services/TransactionService';
import { useNavigate } from 'react-router-dom';

const TransactionForm = () => {

    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(null);
    const [type, setType] = useState('');

    const handleChange = (e) => {
        setType(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const payload = {
                title,
                description,
                amount,
                type
            }
            await createTransaction(payload);

            navigate('/transactions', { replace: true });

        } catch (e) {

            if (e.response.status === 422) {
                setError(e.response.data.errors || 'Xatolik yuz berdi.')
            }
            // return setError(e);
            console.log(e.response);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='container-fluid bg-white rounded-3 border shadow-sm p-3 pb-5'>
            <h3>Tushum yoki chiqim kiritish</h3>
            <div className="border-top mt-2 mb-4"></div>

            <form onSubmit={handleSubmit} className="row">
                <div className="col-sm-6">
                    <Input
                        label="Kimdan / Kimga"
                        placeholder="Kimdan / Kimga"
                        className="mt-1 mb-3"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />

                    {error.title && (
                        <div className="text-danger mb-4 small">
                            {error.title[0]}
                        </div>
                    )}
                </div>

                <div className="col-sm-6">
                    <Input
                        label="Sabab"
                        placeholder="Sabab"
                        className="mt-1 mb-3"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />

                    {error.description && (
                        <div className="text-danger mb-4 small">
                            {error.description[0]}
                        </div>
                    )}
                </div>

                <div className="col-sm-6">
                    <Input
                        label="Pul-Miqdori"
                        placeholder="Pul-Miqdori"
                        className="mt-1 mb-3"
                        value={amount}
                        onChange={(e) => { setAmount(e.target.value) }}
                        type='number'
                    />

                    {error.amount && (
                        <div className="text-danger mb-4 small">
                            {error.amount[0]}
                        </div>
                    )}
                </div>

                <div className="col-sm-6">
                    <label htmlFor="select">Tanlang</label>
                    <div className="d-flex mt-1">
                        <select
                            value={type}
                            onChange={handleChange}
                            id="select"
                            className='input text-secondary'
                        >
                            <option value="">Tushum / chiqim</option>
                            <option value="income">Tushum</option>
                            <option value="expense">Chiqim</option>
                        </select>
                    </div>

                    {error.type && (
                        <div className="text-danger mb-4 small">
                            {error.type[0]}
                        </div>
                    )}
                </div>
                <div className="text-end">
                    <LoadingBtn content="Yuborish" isLoading={isLoading} />
                </div>

            </form>
        </div>
    )
}

export default TransactionForm