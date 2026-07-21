import React, { useState } from 'react';
import Input from '../ui/Input';
import LoadingBtn from '../ui/LoadingBtn';
import { createTransaction } from '../../services/TransactionService';
import { useNavigate } from 'react-router-dom';
import Message from '../ui/Message';

const TransactionForm = () => {

    const navigate = useNavigate();

    const [forbidden, setForbidden] = useState(false);
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
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

            const status = e.response.status;

            if (status === 403) {
                setForbidden(true);
                return; 
            }

            setError(e.response.data.errors);
            console.log(e.response);

        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>

            {forbidden && <Message type="danger" message='Bu sahifadan faqatgina "Ega" foydalana oladi.' type="danger" />}

            <form onSubmit={handleSubmit} className="row">
                <div className="col-sm-6">
                    <Input
                        label="Kimdan / Kimga"
                        id='title'
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
                        id='description'
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
                        id='price'
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
        </>
    )
}

export default TransactionForm