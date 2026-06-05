import React from 'react'

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => {

    if (!isOpen) return null;
    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header border-bottom-0">
                        <h5 className="modal-title">{title || "Tasdiqlash"}</h5>
                        <button type="button" className="btn-close" onClick={onClose} disabled={isLoading}></button>
                    </div>
                    <div className="modal-body py-3">
                        <p className="mb-0">{message || "Haqiqatan ham ushbu ma'lumotni o'chirib tashlamoqchimisiz?"}</p>
                    </div>
                    <div className="modal-footer border-top-0">
                        <button type="button" className="btn btn-light border" onClick={onClose} disabled={isLoading}>
                            Bekor qilish
                        </button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={isLoading}>
                            {isLoading ? (
                                <span className="spinner-border spinner-border-sm me-2"></span>
                            ) : (
                                <i className="bi bi-trash3 me-2"></i>
                            )}
                            O'chirish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;