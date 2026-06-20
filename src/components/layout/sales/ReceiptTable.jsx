import React from 'react';

function ReceiptTable({ data }) {
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
      <tr>
        <td>1</td>
        <td>Temir profil</td>
        <td>10</td>
        <td>
          120 000 so'm
        </td>
        <td>
          1 200 000 so'm
        </td>
      </tr>
      </tbody>
    </table>
  );
}

export default ReceiptTable;