import React from 'react'
import { getUnitBadge } from "../../utils/getUnitBadge";
import { formatPrice } from '../../utils/formatPrice';
import { formatStock } from '../../utils/formatStock';
import Message from '../../components/ui/Message';

const LowStock = ({ products }) => {

  return (
    <div className='card mt-5 shadow-sm' id='low-stock'>
      <div className="card-header bg-white">
        <h5 className='mb-0 fw-semibold'>Kam miqdorda qolgan mahsultotlar</h5>
      </div>

      {products.length === 0
        ?
        (<Message message="Hozircha barcha maxsulotlar yetarli miqdorda" type="success" />)
        :
        (
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mhsulot</th>
                  <th>Qoldiq</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((product, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <span>{formatStock(product.unit, product.stock)}</span>
                          <span>{getUnitBadge(product.unit).content}</span>
                        </div>
                        
                        
                        
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )}
    </div>
  );

}

export default LowStock;