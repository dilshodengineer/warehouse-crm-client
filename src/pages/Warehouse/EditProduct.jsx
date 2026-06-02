import React, { useEffect, useState } from 'react';
import Input from '../../components/ui/Input';
import { useParams, useNavigate, replace } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState(null);

    const [product, setProduct] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [unit, setUnit] = useState();
    const [stock, setStock] = useState();
    const [description, setDescription] = useState('');


    useEffect(() => {

        const fetchProduct = async () => {

            const token = localStorage.getItem('token');

            const response = await axios.get(
                `http://127.0.0.1:8000/api/products/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = response.data.product;


            setProduct(data);

            setName(data.name);
            setPrice(data.price);
            setUnit(data.unit);
            setStock(data.stock);
            setDescription(data.description);
        }

        fetchProduct()

    }, [id])

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
            }

            const response = await axios.put(
                `http://127.0.0.1:8000/api/products/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            navigate('/products', {replace: true})

        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors)
            }
        }

    }

    if (!product) {
        return (
            <div className="d-flex justify-content-center border rounded-3 shadow-sm py-5 bg-white">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div>Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className='container-fluid bg-white rounded-3 border shadow-sm p-4 pb-5'>

            <h3>Mahsulot qo'shish</h3>

            <form
                onSubmit={handleSubmit}
                className="row"
            >

                <div className="col-sm-6">
                    <Input
                        label="Nomi"
                        placeholder="Nomi"
                        className={`mt-1 mb-3`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </div>

                <div className="col-sm-6">
                    <Input
                        label="Narxi"
                        type="number"
                        placeholder="Narxi"
                        className={`mt-1 mb-3`}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="col-sm-6">
                    <Input
                        label="Miqdori"
                        type="number"
                        placeholder="Miqdori"
                        className={`mt-1 mb-3`}
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
                        label="Izoh (Ixtiyoriy)"
                        type="text"
                        placeholder="Izoh"
                        className='mt-1 mb-3'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="text-end">
                    <button
                        className="btn btn-dark px-5"
                        type="submit"
                    >
                        Yangilash
                    </button>
                </div>

            </form>

        </div>
    )
};

export default EditProduct;