import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from '../../components/ui/ConfirmModal';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import { deleteProduct, getProducts } from '../../services/ProductService';
import { formatStock } from '../../utils/FormatStock';
import { formatPrice } from '../../utils/formatPrice';

function Products() {

  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {

    const fetchProducts = async () => {

      try {
        const data = await getProducts();

        setProducts(data);
      } catch (err) {
        setErrors(err.response?.data?.message || "Xatolik yuz berdi");
      } finally {
        setIsLoading(false);
      }

    };

    fetchProducts();
  }, []);


  const handleClick = (id) => {
    setIsOpen(true);
    setSelectedId(id);
  }

  const closeModal = () => {
    if (isDeleting) return;
    setIsOpen(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {

    try {
      setIsDeleting(true);

      await deleteProduct(selectedId);

      setProducts(prev =>
        prev.filter(item => item.id !== selectedId)
      )

      setIsOpen(false);
      setSelectedId(null);

    } catch (err) {
      setErrors(err.response.data.message || "Xatolik yuz berdi");
    } finally {
      setIsDeleting(false)
    }
  };


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

  return (
    <>

      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />

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
              isLoading ? (
                <Loader />
              ) : errors ? (
                <Message message={errors} type="danger" />
              ) : products.length === 0 ? (
                <Message message="Hozircha mahsulotlar yo'q" />
              ) : (
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
                    {products.map((item, index) => {
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

                          <td>{formatPrice(item.price)} so'm</td>

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

          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
