import React from "react";
import { Routes, Route } from "react-router-dom";

/* LAYOUTS */
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

/* AUTH */
import Login from "../pages/Auth/Login";

/* DASHBOARD */

/* SALES */
import NewSale from "../pages/Sales/NewSale";
import SalesHistory from "../pages/Sales/SalesHistory";
import Receipt from "../pages/Sales/Receipt";

/* WAREHOUSE */
import Products from "../pages/Warehouse/Products";
import StockBatches from "../pages/Warehouse/StockBatches";
import StockBalance from "../pages/Warehouse/StockBalance";

/* FINANCE */
import Expenses from "../pages/Finance/Expenses";
import Debts from "../pages/Finance/Debts";
import Income from "../pages/Finance/Income";

/* EMPLOYEES */
import Employees from "../pages/Employees/Employees";
import Roles from "../pages/Employees/Roles";

/* REPORTS */
import SalesReport from "../pages/Reports/SalesReport";
import ExpensesReport from "../pages/Reports/ExpensesReport";
import InventoryReport from "../pages/Reports/InventoryReport";
import TestPage from "../pages/Dashboard/TestPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "../routes/ProtectedRoute";
import AddProduct from "../pages/Warehouse/AddProduct";
import ShowProduct from "../pages/Warehouse/ShowProduct";
import EditProduct from "../pages/Warehouse/EditProduct";
import CustomerReceipt from "../pages/Sales/CustomerReceipt";

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
          <Route path="/sales/history" element={<SalesHistory />} />
          <Route path="/sales/history/:id" element={<CustomerReceipt/>} />

          {/* WAREHOUSE */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ShowProduct/>} />
          <Route path="/stock-batches" element={<StockBatches />} />
          <Route path="/stock-balance" element={<StockBalance />} />
          <Route path="/products/create" element={<AddProduct/>} />
          <Route path="/products/:id/edit" element={<EditProduct/>} />

          {/* FINANCE */}
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/debts" element={<Debts />} />
          <Route path="/income" element={<Income />} />

          {/* EMPLOYEES */}
          <Route path="/employees" element={<Employees />} />
          <Route path="/roles" element={<Roles />} />

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