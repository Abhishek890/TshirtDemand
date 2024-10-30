import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DesignLibrary from './pages/DesignLibrary';
import NewOrder from './pages/NewOrder';
import OrderManagement from './pages/OrderManagement';
import ProductList from './pages/ProductList';
import Billing from './pages/Billing';
import Wallet from './pages/Wallet';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balance, setBalance] = useState(2680.45);
  const [userData, setUserData] = useState({
    companyName: 'SRIYAL Enterprises',
    type: 'private limited',
    userId: '64fac9b49ff9956b237480e4'
  });

  const handleLogin = (email: string, password: string) => {
    if (email && password) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleRecharge = () => {
    // Implement recharge logic
  };

  // Layout wrapper for protected routes
  const ProtectedLayout = ({ children }: { children: React.ReactNode }) => (
    <>
      <Navbar 
        balance={balance}
        onRecharge={handleRecharge}
        onLogout={handleLogout}
      />
      <div className="flex min-h-screen pt-16">
        <aside className="w-64 bg-[#111] fixed left-0 top-16 bottom-0 overflow-y-auto">
          <div className="p-4">
            <Sidebar />
          </div>
        </aside>
        <main className="flex-1 ml-64 p-8 bg-[#fdf6e3]">
          {children}
        </main>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#fdf6e3]">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={
            <ProtectedLayout>
              <Dashboard userData={userData} />
            </ProtectedLayout>
          } />
          <Route path="/design-library" element={
            <ProtectedLayout>
              <DesignLibrary />
            </ProtectedLayout>
          } />
          <Route path="/new-order" element={
            <ProtectedLayout>
              <NewOrder />
            </ProtectedLayout>
          } />
          <Route path="/order-management" element={
            <ProtectedLayout>
              <OrderManagement />
            </ProtectedLayout>
          } />
          <Route path="/products" element={
            <ProtectedLayout>
              <ProductList />
            </ProtectedLayout>
          } />
          <Route path="/billing" element={
            <ProtectedLayout>
              <Billing />
            </ProtectedLayout>
          } />
          <Route path="/wallet" element={
            <ProtectedLayout>
              <Wallet balance={balance} />
            </ProtectedLayout>
          } />
          <Route path="/settings" element={
            <ProtectedLayout>
              <Settings userData={userData} />
            </ProtectedLayout>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;