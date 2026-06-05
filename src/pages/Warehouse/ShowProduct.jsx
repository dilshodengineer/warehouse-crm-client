import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/ui/Loader';
import { getProduct } from '../../services/ProductService';
import Message from '../../components/ui/Message';

const ShowProduct = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);   
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProduct = async () => {
            try {
                setLoading(true);

                const data = await getProduct(id);
                setProduct(data)
            } catch (err) {
                return null;
            } finally {
                setLoading(false);
            }

        }

        fetchProduct();
    }, [id])

    if (loading){
        return <Loader/>;
    }

    if (!product && !loading) {
        return <Message message="Mahsulot mavjud emas"/>
    }

    return (
        <div className='row'>
            <div className="col-12">
                <div className="border rounded-3 shadow-sm p-3 bg-white">
                    <h3>Joriy Mahsulot</h3>
                    <div className="border-top my-3"></div>

                    <p className="text-muted">
                        <b className="text-dark">Nomi: </b>{product.name}
                    </p>

                    <p className="text-muted">
                        <b className="text-dark">Ombordagi Qoldiq: </b>{product.stock}
                    </p>
                    <p className="text-muted">
                        <b className="text-dark">Narxi: </b>{product.price}
                    </p>
                    <div className="card border p-2 bg-light mt-2">
                        <b>Mahsulot Izohi:</b>
                        <div className="border-top my-2"></div>
                        <p className="text-muted">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowProduct