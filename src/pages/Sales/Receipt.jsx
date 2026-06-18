import "../../components/ui/receipt/receipt.css";
import { useLocation } from "react-router-dom";
import ReceiptPreview from "../../components/ui/receipt/ReceiptPreview";

function Receipt(){

  const location = useLocation();

  const sale = location.state?.sale;


  if (!sale) {
    return (
      <div>
        Chek topilmadi
      </div>
    );
  }


  return (
    <div className="receipt-page">

      <div className="receipt-center">
        <div>
          <ReceiptPreview sale={sale}/>
          <div className="d-flex justify-content-center gap-3 pt-2 pb-3 bg-white">
            <button className="btn btn-secondary px-4 rounded-5 btn-sm print-btn">
              Ortga qaytish
            </button>
            <button
              onClick={() => window.print()}
              className="btn btn-primary px-4 rounded-5 btn-sm print-btn"
            >
              Chop etish
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Receipt;