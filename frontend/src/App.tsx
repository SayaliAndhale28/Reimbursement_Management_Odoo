/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import SubmitExpense from './pages/SubmitExpense';
import ExpenseHistory from './pages/ExpenseHistory';
import ApprovalDashboard from './pages/ApprovalDashboard';
import Unauthorized from './pages/Unauthorized';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            
            {/* Employee Routes */}
            <Route path="/submit" element={<SubmitExpense />} />
            <Route path="/history" element={<ExpenseHistory />} />
            
            {/* Manager/Admin Routes */}
            <Route path="/approvals" element={
              <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']}>
                <ApprovalDashboard />
              </ProtectedRoute>
            } />
            
            {/* Admin Only Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminPage />
              </ProtectedRoute>
            } />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
