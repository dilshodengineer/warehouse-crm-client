import React, {useEffect, useState} from 'react';
import PageWindow from '../../components/layout/PageWindow';
import ConfirmModal from '../../components/ui/ConfirmModal';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import {deleteProduct, getProducts} from '../../services/ProductService';
import StockUnitBadges from '../../components/ui/StockUnitBadges';
import ProductsTable from '../../components/layout/warehouse/ProductsTable';
import {getPageNumbers} from "../../utils/pagination";


function Products() {

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {

    const fetchProducts = async () => {

      try {
        setIsLoading(true);

        const response = await getProducts(currentPage);

        setProducts(response.data);
        setLastPage(response.last_page);

      } catch (err) {

        setErrors(err.response?.data?.message || "Xatolik yuz berdi");

      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);


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

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />

      <PageWindow>
        <h3>Maxsulotlar</h3>

        <div className="border-bottom mt-2"></div>
        <StockUnitBadges classSyles="my-2"/>
        <div className="border-bottom mb-3"></div>

        {
          isLoading ? (
            <Loader/>
          ) : errors ? (
            <Message message={errors} type="danger"/>
          ) : products.length === 0 ? (
            <Message message="Hozircha mahsulotlar yo'q"/>
          ) : (
            <>
              <ProductsTable data={products} handleClick={handleClick}/>

              <div className="d-flex justify-content-center gap-2 mt-3">
                <div className="btn-group gap-1">
                  <button
                    className="btn btn-dark"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    <i className="bi bi-arrow-left"></i> Ortga
                  </button>
                  {
                    getPageNumbers(currentPage, lastPage).map((page, index) =>
                    page === "..." ?  (
                      <button
                        key={index}
                        className="btn btn-outline-secondary"
                        disabled
                      >
                        ...
                      </button>
                    ) : (
                      <button
                        key={page}
                        className={`btn ${
                          currentPage === page
                            ? "btn-dark"
                            : "btn-outline-dark"
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    )
                    )
                  }
                  <button
                    className="btn btn-dark"
                    disabled={currentPage === lastPage}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Keyingi <i className="bi bi-arrow-right"></i>
                  </button>
                </div>

                <span className="align-self-center">
                  {currentPage} / {lastPage}
                </span>
              </div>
            </>
          )
        }
      </PageWindow>

    </>
  );
}

export default Products;
