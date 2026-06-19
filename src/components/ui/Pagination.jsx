import React from 'react';
import {getPageNumbers} from "../../utils/pagination";


function Pagination({currentPage, lastPage, onPageChange}) {
  return (
    <div className="d-flex justify-content-center gap-2 mt-3">
      <div className="btn-group gap-1">

        <button
          className="btn btn-dark"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <i className="bi bi-arrow-left"></i> Ortga
        </button>

        {getPageNumbers(currentPage, lastPage).map((page, index) =>
          page === "..." ? (
            <button
              key={index}
              className="btn btn-sm btn-outline-secondary"
              disabled
            >
              ...
            </button>
          ) : (
            <button
              key={page}
              className={`btn btn-sm ${
                currentPage === page
                  ? "btn-dark"
                  : "btn-outline-dark"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}

        <button
          className="btn btn-sm btn-dark"
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Keyingi <i className="bi bi-arrow-right"></i>
        </button>

      </div>

      <span className="align-self-center">
        {currentPage} / {lastPage}
      </span>
    </div>
  );
}

export default Pagination;