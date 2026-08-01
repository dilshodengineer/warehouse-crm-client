import React from 'react'
import { getUnitBadge } from "../../utils/getUnitBadge";
import { formatPrice } from '../../utils/formatPrice';
import { formatStock } from '../../utils/formatStock';
import Message from '../../components/ui/Message';

const LowStock = ({ products }) => {

  return (
    <div className='card mt-5 shadow-sm'>
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

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
    </div>
  );

}

export default LowStock;