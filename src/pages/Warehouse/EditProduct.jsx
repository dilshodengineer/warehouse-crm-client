import React, { useEffect, useState } from 'react';
import Input from '../../components/ui/Input';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../components/ui/Loader';
import LoadingBtn from '../../components/ui/LoadingBtn';
import { getProduct, updateProduct } from '../../services/ProductService';
import Message from '../../components/ui/Message';
import { formatPriceInput } from '../../utils/formatPrice';

const EditProduct = () => {


    const { id } = useParams();
    const navigate = useNavigate();

    const [forbidden, setForbidden] = useState(false);
    const [errors, setErrors] = useState({});
    const [pageError, setPageError] = useState(null);
    const [pageLoading, setPageLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [costPrice, setCostPrice] = useState('');
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
                setCostPrice(formatPriceInput(String(data.cost_price ?? '')));
                setPrice(formatPriceInput(String(data.price ?? '')));
                setUnit(data.unit);
                setStock(data.stock);
                setDescription(data?.description);
            } catch (e) {

                setPageError(e.response?.data?.message || "Hatolik yuz berdi");
                console.log(e);



            } finally {
                setPageLoading(false)
            }
        }

        fetchProduct()

    }, [id]);

    const handleCostPriceChange = (e) => {
        setCostPrice(formatPriceInput(e.target.value));
    }

    const handlePriceChange = (e) => {
        setPrice(formatPriceInput(e.target.value));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setIsLoading(true)

            const data = {
                name,
                cost_price: costPrice,
                price,
                stock,
                unit,
                description
            }

            await updateProduct(id, data);

            navigate('/products', { replace: true })

        } catch (e) {

            const status = e.response?.status;

            if (status === 403) {
                setForbidden(true);
            }

            if (status === 422) {
                setErrors(e.response.data.errors ?? {});
                return;
            }

            setPageError(e.response?.data?.message ?? "Xatolik yuz berdi.");

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
                                    value={name ?? ''}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                {errors.name && (
                                    <div className="text-danger mb-4">
                                        {errors.name[0]}
                                    </div>
                                )}

                            </div>

                            <div className="col-6">
                                <Input
                                    label="Izoh (Ixtiyoriy)"
                                    id='description'
                                    type="text"
                                    placeholder="Izoh"
                                    className='mt-1 mb-3'
                                    value={description ?? ''}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="col-sm-6">
                                <Input
                                    label="Tan narxi"
                                    id="cost_price"
                                    type="text"
                                    placeholder="Tan narxi"
                                    className={`mt-1 mb-3 ${errors.cost_price && 'border-danger'}`}
                                    value={costPrice ?? ''}
                                    onChange={handleCostPriceChange}
                                />

                                {errors.cost_price && (
                                    <div className="text-danger mb-4">
                                        {errors.cost_price[0]}
                                    </div>
                                )}
                            </div>

                            <div className="col-sm-6">
                                <Input
                                    label="Narxi"
                                    id='price'
                                    type="text"
                                    placeholder="Sotuv narxi"
                                    className={`mt-1 mb-3 ${errors.price && 'border-danger'}`}
                                    value={price ?? ''}
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
                                    value={stock ?? ''}
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