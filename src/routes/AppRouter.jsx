import { Route, Routes } from "react-router-dom";

/* LAYOUTS */
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

/* AUTH */
import Login from "../pages/Auth/Login";

/* DASHBOARD */

/* SALES */
import List from "../pages/Sales/List";
import NewSale from "../pages/Sales/NewSale";
import Receipt from "../pages/Sales/Receipt";
import SalesHistory from "../pages/Sales/SalesHistory";
import CustomerReceipt from "../pages/Sales/CustomerReceipt";

/* WAREHOUSE */
import Products from "../pages/Warehouse/Products";
import AddProduct from "../pages/Warehouse/AddProduct";
import EditProduct from "../pages/Warehouse/EditProduct";
import ShowProduct from "../pages/Warehouse/ShowProduct";

/* FINANCE */
import Transactions from "../pages/Finance/Transactions";

/* EMPLOYEES */
import Employees from "../pages/Employees/Employees";
import AddEmployee from "../pages/Employees/AddEmployee";

/* REPORTS */
import Dashboard from "../pages/Dashboard/Dashboard";
import TestPage from "../pages/Dashboard/TestPage";
import ExpensesReport from "../pages/Reports/ExpensesReport";
import InventoryReport from "../pages/Reports/InventoryReport";
import SalesReport from "../pages/Reports/SalesReport";
import ProtectedRoute from "../routes/ProtectedRoute";
import AddTransaction from "../pages/Finance/AddTransaction";
import EditEmployee from "../pages/Employees/EditEmployee";

function AppRouter() {
  return (
    <Routes>

      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>



      <Route element={<ProtectedRoute/>}>
        {/* MAIN */}
        <Route element={<MainLayout />}>

          {/* DASHBOARD */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/test" element={<TestPage />} />

          {/* SALES */}
          <Route path="/sales/new" element={<NewSale />} />
          <Route path="/sales/list" element={<List/>} />
          <Route path="/sales/history" element={<SalesHistory />} />
          <Route path="/sales/history/:id" element={<CustomerReceipt/>} />

          {/* WAREHOUSE */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ShowProduct/>} />
          <Route path="/products/create" element={<AddProduct/>} />
          <Route path="/products/:id/edit" element={<EditProduct/>} />

          {/* FINANCE */}
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/form" element={<AddTransaction />} />

          {/* EMPLOYEES */}
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/:id/edit" element={<EditEmployee />} />

          <Route path="/test" element={<h1>TEST ROUTE WORKS</h1>} />

          {/* REPORTS */}
          <Route path="/reports/sales" element={<SalesReport />} />
          <Route path="/reports/expenses" element={<ExpensesReport />} />
          <Route path="/reports/inventory" element={<InventoryReport />} />

        </Route>

        <Route path="/receipt" element={<Receipt/>} />

      </Route>

    </Routes>
  );
}

export default AppRouter;