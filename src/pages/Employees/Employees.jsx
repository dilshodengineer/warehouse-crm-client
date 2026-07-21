import React from 'react'
import PageWindow from '../../components/layout/PageWindow'
import UsersTable from '../../components/tables/UsersTable'

const Employees = () => {
  return (
    <PageWindow>
        <h4>Xodimlar</h4>
        <div className="border-bottom mb-2"></div>

        <UsersTable/>
    </PageWindow>
  )
}

export default Employees