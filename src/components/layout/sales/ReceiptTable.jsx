import React from 'react';
import { formatPrice } from "../../../utils/formatPrice";
import { getUnitBadge } from "../../../utils/getUnitBadge";
import { formatStock } from "../../../utils/formatStock";
import { getUnitForm } from "../../../utils/getUnitForm";

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
              <div className="d-flex gap-2">
                <span>
                  <b>1</b> {getUnitForm(item.unit)} =
                </span>
                <span>
                  <span className="text-success">
                    {formatPrice(item.price)}
                  </span> -so'm
                </span>
              </div>
            </td>

            <td>
              <div className="d-flex gap-2">
                <span>
                  <b>{formatStock(item.unit, item.quantity)}</b> {getUnitBadge(item.unit).content} =
                </span>

                <b className="text-success">
                  {formatPrice(item.subtotal)}
                </b> - so'm
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReceiptTable;