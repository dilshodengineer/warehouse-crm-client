import "../../components/ui/receipt/receipt.css";
import { replace, useLocation, useNavigate } from "react-router-dom";
import ReceiptPreview from "../../components/ui/receipt/ReceiptPreview";

function Receipt() {

  const navigate = useNavigate();
  const location = useLocation();

  const sale = location.state?.sale;

  const handleBack = () => {
    navigate(location.state.from || '/sales/history', {replace: true})
  }

  if (!sale) {
    return (
      <div className="text-danger text-center">
        <span>Chek topilmadi.</span>
      </div>
    );
  }

  return (
    <div className="receipt-page">

      <div className="receipt-center">
        <div>
          <div className="d-flex justify-content-center gap-2 pt-2 pb-2 border-bottom bg-white">
            <button
              onClick={handleBack}
              className="btn btn-secondary px-3 rounded-5 btn-sm print-btn">
              <i className="bi bi-arrow-left"></i> Ortga qaytish
            </button>

            <button
              onClick={() => window.print()}
              className="btn btn-primary px-3 rounded-5 btn-sm print-btn"
            >
              Chop etish <i className="bi bi-printer"></i>
            </button>

          </div>

          <ReceiptPreview sale={sale} />
        </div>
      </div>

    </div>
  );
}

export default Receipt;