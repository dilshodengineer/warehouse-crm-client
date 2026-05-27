import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {

  const [products, setProducts] = useState([]);

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


  const getUnitBadge = (unit) => {
    switch (unit) {
      case 'kg':
        return { status: "bg-success border border-success", content: "kg" };

      case 'pcs':
        return { status: "bg-warning border border-warning", content: "dona" };

      case 'l':
        return { status: "bg-info border border-info", content: "litr" };

      default:
        return { status: "bg-secondary border border-secondary", content: "miqdor" };
    }
  };


  return (
    <div className='row'>
      <h3>Maxsulotlar</h3>
      <div className="d-flex justify-content-between mb-3 align-items-end">
        <div className="d-flex align-items-center gap-2">
          <span className="small d-inline-block px-2 py-0 border border-success bg-success bg-opacity-25 text-white rounded-2">KG</span>
          <span className="small d-inline-block px-2 py-0 border border-warning bg-warning bg-opacity-25 text-white rounded-2">Dona</span>
          <span className="small d-inline-block px-2 py-0 border border-info bg-info bg-opacity-25 text-white rounded-2">Litr</span>
        </div>
        <Link to="/products/create" className="btn btn-primary mx-0">
          <i class="bi bi-plus-circle"></i> Yangi qo'shish
        </Link>
      </div>

      {
        products
          ?
          <>
            <table className='table align-middle w-100'>
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
                            {item.stock}
                            <small className={` mx-2
                            small d-inline-block 
                            px-2 py-0 bg-opacity-25 
                            text-white rounded-2 
                            ${unitBadge.status}
                            `}>
                              {unitBadge.content}
                            </small>
                          </div>
                        </td>
                        <td>{item.price} so'm</td>
                        <td>
                          <button className="btn btn-success btn-sm">
                            <i className="bi bi-pencil"></i> Tahrirlash
                          </button>
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
  );
};

export default Products;