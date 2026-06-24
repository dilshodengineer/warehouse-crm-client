import React from 'react';
import { formatStock } from '../../../utils/formatStock';
import {getUnitBadge} from '../../../utils/getUnitBadge';
import {Link} from 'react-router-dom';
import {useCartStore} from '../../../stores/cartStore';
import {formatPrice} from "../../../utils/formatPrice";

const SaleTable = ({data}) => {

  const cart = useCartStore(state => state.cart);
  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  return (
    <table className="table align-middle table-bordered">
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
      {
        data.map((item, index) => {
          const unitBadge = getUnitBadge(item.unit);
          const isInCart = cart.some(
            cartItem => cartItem.product_id === item.id
          );
          return (
            <tr key={index}>
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
                <div className="d-flex align-items-center gap-1">
                  <span>{formatPrice(item.price)} </span>
                  <span>/ so'm</span>
                </div>
              </td>

              <td>
                <div className="d-flex gap-2">
                  <Link to={`/products/${item.id}`} className="btn btn-info text-light btn-sm">
                    Batafsil <i className="bi bi-box-arrow-up-right"></i>
                  </Link>

                  <button
                    className={`btn btn-sm ${
                      isInCart ? 'btn-danger' : 'btn-dark'
                    }`}
                    onClick={() => {
                      if (isInCart) {
                        removeFromCart(item.id);
                      } else {
                        addToCart(item);
                      }
                    }}
                  >
                    {
                      isInCart
                        ? <i className="bi bi-x-lg"></i>
                        : <i className="bi bi-plus-circle"></i>
                    }
                  </button>
                </div>
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
}

export default SaleTable