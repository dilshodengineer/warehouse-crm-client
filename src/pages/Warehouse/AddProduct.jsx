import React, { useState } from 'react';
import Input from "../../components/ui/Input";
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../services/ProductService';
import LoadingBtn from '../../components/ui/LoadingBtn';
import { formatPriceInput } from '../../utils/formatPrice';
import Message from '../../components/ui/Message';

const AddProduct = () => {

    const navigate = useNavigate();

    const [forbidden, setForbidden] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [unit, setUnit] = useState('kg');
    const [description, setDescription] = useState('');

    const handlePriceChange = (e) => {
        setPrice(formatPriceInput(e.target.value));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setIsLoading(true)

            const data = {
                name,
                price,
                stock,
                unit,
                description
            };

            await createProduct(data);


            navigate('/products', { replace: true });

        } catch (e) {

            const status = e.response.status

            if(status === 403){
                setForbidden(true);
            }

            if (status === 422) {
                setErrors(e.response.data.errors || "Xatolik yuz berdi.");
            }

            // console.log(e.response?.data || e.message);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className='container-fluid bg-white rounded-3 border shadow-sm p-3 pb-5'>

            <h3>Mahsulot qo'shish</h3>

            <div className="border-bottom my-2"></div>

            {forbidden && <Message type="danger" message='Bu sahifadan faqatgina "Ega" foydalana oladi.' type="danger" />}

            <form
                onSubmit={handleSubmit}
                className="row"
            >

                <div className="col-sm-6">
                    <Input
                        label="Nomi"
                        id='name'
                        placeholder="Nomi"
                        className={`mt-1 mb-3 ${errors.name && 'border-danger'}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {errors.name && (
                        <div className="text-danger mb-4">
                            {errors.name[0]}
                        </div>
                    )}
                </div>

                <div className="col-sm-6">
                    <Input
                        label="Narxi"
                        id='price'
                        type="text"
                        placeholder="Narxi"
                        className={`mt-1 mb-3 ${errors.price && 'border-danger'}`}
                        value={price}
                        onChange={handlePriceChange}
                    />

                    {errors.price && (
                        <div className="text-danger mb-4">
                            {errors.price[0]}
                        </div>
                    )}
                </div>

                <div className="col-sm-6">
                    <Input
                        label="Miqdori"
                        id='stock'
                        type="number"
                        placeholder="Miqdori"
                        className={`mt-1 mb-3 ${errors.stock && 'border-danger'}`}
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />

                    {errors.stock && (
                        <div className="text-danger mb-4">
                            {errors.stock[0]}
                        </div>
                    )}
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
                        id='description'
                        type="text"
                        placeholder="Izoh"
                        className='mt-1 mb-3'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="text-end">
                    <LoadingBtn isLoading={isLoading} content="Qo'shish"/>
                </div>

            </form>

        </div>
    )
}

export default AddProduct;