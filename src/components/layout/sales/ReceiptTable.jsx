import React from 'react';
import {formatPrice} from "../../../utils/formatPrice";
import {getUnitBadge} from "../../../utils/getUnitBadge";
import {formatStock} from "../../../utils/formatStock";

function ReceiptTable({ items = [] }) {
  if (!items.length) {
    return (
      <div className="alert alert-secondary mb-0">
        Mahsulotlar topilmadi.
      </div>
    );
  }

  return (
    <table className="table table-bordered">
      <thead>
      <tr>
        <th>#</th>
        <th>Nomi</th>
        <th>Miqdori</th>
        <th>Narxi</th>
        <th>Umumiy</th>
      </tr>
      </thead>

      <tbody>
      {items.map((item, index) => (
        <tr key={item.id}>
          <td>{index + 1}</td>

          <td>{item.product_name}</td>

          <td>
            {formatStock(item.unit, item.quantity)} {getUnitBadge(item.unit).content}
          </td>

          <td>
            {formatPrice(item.price)} so'm
          </td>

          <td>
            {Number(item.subtotal).toLocaleString('uz-UZ')} so'm
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default ReceiptTable;