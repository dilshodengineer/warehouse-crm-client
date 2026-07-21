import React from 'react';
import PageWindow from '../../components/layout/PageWindow';
import EmployeeForm from '../../components/forms/EmployeeForm';

function AddEmployee() {
  return (
    <PageWindow>
      <h3>Foydalanuvchi xodim qo'shish.</h3>

      <div className="border-bottom mb-2"></div>

      <EmployeeForm/>
    </PageWindow>
  )
}

export default AddEmployee;