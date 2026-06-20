import React from 'react';
import {getPageNumbers} from "../../utils/pagination";


function Pagination({currentPage, lastPage, onPageChange}) {
  return (
    <div className="d-flex justify-content-center gap-2 mt-3">
      <div>
        <div className="btn-group gap-1">

          <button
            className="btn btn-sm btn-dark"
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
        <p className="jumbotron jumbotron-secondary text-center my-2">
          <small className="px-2 py-1 border rounded-2 shadow-sm">
            {currentPage} / {lastPage}
          </small>
        </p>
      </div>
    </div>
  );
}

export default Pagination;