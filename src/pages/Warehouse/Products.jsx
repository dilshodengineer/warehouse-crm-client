import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {

  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          'http://127.0.0.1:8000/api/products',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setProducts(response.data.data.data);

      } catch (err) {
        console.log(err.message);
      }
    };

    getProducts();

  }, []);

  const formatStock = (stock, unit) => {
    if (unit === 'pcs') {
      return Number(stock);
    }

    return stock;
  }


  const getUnitBadge = (unit) => {
    switch (unit) {
      case 'kg':
        return { status: "bg-success border text-success border-success", content: "kg" };

      case 'pcs':
        return { status: "bg-warning border text-warning border-warning", content: "dona" };

      case 'l':
        return { status: "bg-info border text-info border-info", content: "litr" };

      default:
        return { status: "bg-secondary border text-secondary border-secondary", content: "miqdor" };
    }
  };

  if (!products) {
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

          <h3>Maxsulotlar</h3>
          <div className="d-flex justify-content-between mb-3 align-items-end">
            <div className="d-flex align-items-center gap-2">
              <span className="small d-inline-block px-2 py-0 border border-success bg-success text-success bg-opacity-25 rounded-4">kg</span>
              <span className="small d-inline-block px-2 py-0 border border-warning bg-warning text-warning bg-opacity-25 rounded-4">dona</span>
              <span className="small d-inline-block px-2 py-0 border border-info bg-info text-info bg-opacity-25 rounded-4">litr</span>
            </div>
            <Link to="/products/create" className="btn btn-primary mx-0">
              <i className="bi bi-plus-circle"></i> Yangi qo'shish
            </Link>
          </div>

          {
            products
              ?
              <>
                <table className='table table-bordered align-middle'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nomi</th>
                      <th>Miqdori va turi(dona/vazn/suyuq)</th>
                      <th>Narxi</th>
                      <th>Boshqarish</th>
                    </tr>
                  </thead>
                  <tbody>

                    {

                      products.map((item, index) => {

                        const unitBadge = getUnitBadge(item.unit);

                        return (
                          <tr key={item.id || index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                              <div className="d-flex">
                                {formatStock(item.stock, item.unit)}
                                <small className={` mx-2
                            small d-inline-block 
                            px-2 py-0 bg-opacity-25 
                            rounded-4
                            ${unitBadge.status}
                            `}>
                                  {unitBadge.content}
                                </small>
                              </div>
                            </td>
                            <td>{item.price} so'm</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">

                                <Link to={`/products/${item.id}`} className="btn btn-info text-light btn-sm">
                                  Batafsil  <i className="bi bi-box-arrow-up-right"></i>
                                </Link>

                                <Link to={`/products/${item.id}/edit`} className="btn btn-secondary btn-sm">
                                  Tahrirlash <i className="bi bi-pencil"></i>
                                </Link>

                                <button className="btn btn-dark btn-sm">
                                  Tashlash <i class="bi bi-trash3"></i>
                                </button>

                              </div>
                            </td>
                          </tr>
                        );
                      })
                    }

                  </tbody>
                </table>
              </>
              : ""
          }

        </div>
      </div>
    </div>
  );
};

export default Products;