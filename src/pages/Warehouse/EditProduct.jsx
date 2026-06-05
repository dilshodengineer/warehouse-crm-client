import React, { useEffect, useState } from 'react';
import Input from '../../components/ui/Input';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../components/ui/Loader';
import LoadingBtn from '../../components/ui/LoadingBtn';
import { getProduct, updateProduct } from '../../services/ProductService';
import Message from '../../components/ui/Message';

const EditProduct = () => {


    const { id } = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [pageError, setPageError] = useState(null);
    const [pageLoading, setPageLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [unit, setUnit] = useState('kg');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {

        const fetchProduct = async () => {

            try {

                setPageLoading(true);

                const data = await getProduct(id);

                setProduct(data);

                setName(data.name);
                setPrice(data.price);
                setUnit(data.unit);
                setStock(data.stock);
                setDescription(data.description);
            } catch (err) {
                setPageError(err.response.data.message || "Hatolik yus berdi");

            } finally {
                setPageLoading(false)
            }
        }

        fetchProduct()

    }, [id])

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
            }

            await updateProduct(id, data);

            navigate('/products', { replace: true })

        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors)
            }
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className='container-fluid bg-white rounded-3 border shadow-sm p-4 pb-5'>

            {
                pageLoading ? (
                    <Loader />
                ) : pageError ? (
                    <Message message={pageError} type="danger" />
                ) : !product ? (
                    <Message message="Mahsulot topilmadi" />
                ) : (
                    <>
                        <h3>Mahsulotni yangilash</h3>

                        <form
                            onSubmit={handleSubmit}
                            className="row"
                        >

                            <div className="col-sm-6">
                                <Input
                                    label="Nomi"
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
                                    type="number"
                                    placeholder="Narxi"
                                    className={`mt-1 mb-3 ${errors.price && 'border-danger'}`}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
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
                                    type="text"
                                    placeholder="Izoh"
                                    className='mt-1 mb-3'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="text-end">
                                <LoadingBtn isLoading={isLoading} content="Yangilash" />
                            </div>

                        </form>
                    </>
                )
            }

        </div>
    );
};

export default EditProduct;