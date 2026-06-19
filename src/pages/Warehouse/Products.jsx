import React, {useEffect, useState} from 'react';
import PageWindow from '../../components/layout/PageWindow';
import ConfirmModal from '../../components/ui/ConfirmModal';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import {deleteProduct, getProducts} from '../../services/ProductService';
import StockUnitBadges from '../../components/ui/StockUnitBadges';
import ProductsTable from '../../components/layout/warehouse/ProductsTable';
import Pagination from "../../components/ui/Pagination";


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

              <Pagination currentPage={currentPage} lastPage={lastPage} onPageChange={setCurrentPage}/>
            </>
          )
        }
      </PageWindow>

    </>
  );
}

export default Products;
