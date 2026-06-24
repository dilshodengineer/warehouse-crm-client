import React from 'react';
import { formatStock } from '../../../utils/formatStock';
import { getUnitBadge } from '../../../utils/getUnitBadge';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';

const ProductsTable = ({ data, handleClick }) => {
    return (
        <table className='table align-middle'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nomi</th>
                    <th>Miqdori va turi</th>
                    <th>Narxi</th>
                    <th>Boshqarish</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    const unitBadge = getUnitBadge(item.unit);
                    return (
                        <tr key={item.id || index}>

                            <td>{index + 1}</td>

                            <td>{item.name}</td>

                            <td>
                                <div className="d-flex">
                                    {formatStock(item.unit, item.stock)}
                                    <small className={`mx-2 px-2 py-0 bg-opacity-25 rounded-4 ${unitBadge.status}`}>
                                        {unitBadge.content}
                                    </small>
                                </div>
                            </td>

                            <td>
                                <b>{formatPrice(item.price)}</b> so'm
                            </td>

                            <td>
                                <div className="d-flex align-items-center gap-2">
                                    <Link to={`/products/${item.id}`} className="btn btn-info text-light btn-sm">
                                        Batafsil <i className="bi bi-box-arrow-up-right"></i>
                                    </Link>

                                    <Link to={`/products/${item.id}/edit`} className="btn btn-secondary btn-sm">
                                        <i className="bi bi-three-dots"></i> <i className="bi bi-pencil"></i>
                                    </Link>

                                    <button
                                        onClick={() => handleClick(item.id)}
                                        className="btn btn-dark btn-sm"
                                    >
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </div>
                            </td>

                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default ProductsTable