import axios from 'axios';
import React, { useState } from 'react';
import Input from "../../components/ui/Input";

const AddProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [unit, setUnit] = useState('kg');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const token = localStorage.getItem('token');

            const data = {
                name,
                price,
                stock,
                unit,
                description
            };

            const response = await axios.post(
                'http://127.0.0.1:8000/api/products',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    }

    return (
        <div className='px-3'>

            <form
                onSubmit={handleSubmit}
                className='container-fluid bg-white rounded-3 border shadow-sm p-4 pb-5'
            >

                <h3>Mahsulot qo'shish</h3>

                <div className="row">

                    <div className="col-sm-6">
                        <Input
                            label="Nomi"
                            placeholder="Nomi"
                            className='mt-1 mb-3'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="col-sm-6">
                        <Input
                            label="Narxi"
                            type="number"
                            placeholder="Narxi"
                            className='mt-1 mb-3'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="col-sm-6">
                        <Input
                            label="Miqdori"
                            type="number"
                            placeholder="Miqdori"
                            className='mt-1 mb-3'
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>

                    <div className="col-sm-6">

                        <label className="form-label">
                            O'lchov turi
                        </label>

                        <div className="d-flex gap-3 mt-2">

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="unit"
                                    value="kg"
                                    checked={unit === 'kg'}
                                    onChange={(e) => setUnit(e.target.value)}
                                />

                                <label className="form-check-label">
                                    KG
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="unit"
                                    value="l"
                                    checked={unit === 'l'}
                                    onChange={(e) => setUnit(e.target.value)}
                                />

                                <label className="form-check-label">
                                    Litr
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="unit"
                                    value="pcs"
                                    checked={unit === 'pcs'}
                                    onChange={(e) => setUnit(e.target.value)}
                                />

                                <label className="form-check-label">
                                    Dona
                                </label>
                            </div>

                        </div>

                    </div>

                    <div className="col-12">
                        <Input
                            label="Izoh"
                            type="text"
                            placeholder="Izoh"
                            className='mt-1 mb-3'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                </div>

                <button
                    className="btn btn-dark px-5"
                    type="submit"
                >
                    Qo'shish
                </button>

            </form>

        </div>
    )
}

export default AddProduct;