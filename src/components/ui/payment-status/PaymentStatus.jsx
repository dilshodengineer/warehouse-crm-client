import "./payment-status.css";

const STATUS_CONFIG = {
  paid: {
    label: "To'langan",
    className: "status-paid",
  },
  partial: {
    label: "Qisman",
    className: "status-partial",
  },
  unpaid: {
    label: "To'lanmagan",
    className: "status-unpaid",
  },
};


function PaymentStatus({ status }) {

  const config = STATUS_CONFIG[status] || {
    label: status,
    className: "",
  };

  return (
    <span className={`status-badge ${config.className}`}>
      <span className="status-dot" />
      {config.label}
    </span>
  );
}

export default PaymentStatus;