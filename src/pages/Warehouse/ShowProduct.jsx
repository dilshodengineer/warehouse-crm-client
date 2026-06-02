import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowProduct = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

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
            );

            setProduct(response.data.product);


        }

        fetchProduct();
    }, [id])

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