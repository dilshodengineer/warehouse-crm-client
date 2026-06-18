import {formatStock} from "../../../utils/formatStock";
import {getUnitForm} from "../../../utils/getUnitForm";

function ReceiptPreview({sale}) {

  return (
    <div id="receipt">

      <div className="receipt-header">

        <h4>Haridor uchun chek</h4>
        <h6>(-: Haridingiz uchun raxmat :-)</h6>

        <p className="receipt-date">
          {new Date(
            sale.created_at
          ).toLocaleString()}
        </p>

      </div>

      <hr/>

      {sale.items.map(item => (

        <div key={item.id}>

          <div className="first-line">
            <span>{item.product_name}</span>
            <span>{formatStock(item.unit ,item.quantity) + getUnitForm(item.unit)}</span>
          </div>

          <div className="receipt-row">
            <span>
              1kg = {item.price} so'm
            </span>

            <span>
              {item.subtotal} so'm
            </span>
          </div>

          <div className="dashed-border"></div>

        </div>

      ))}

      <strong className="total-amount">
        Jami: {sale.total_amount} so'm
      </strong>

      <hr/>


    </div>
  );
}

export default ReceiptPreview;