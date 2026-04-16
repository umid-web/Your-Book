import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Register from '../Components/AuthComp/Register/Register'
import Login from '../Components/AuthComp/LoginComp/Login'
import EmailVerification from '../Components/AuthComp/EmailVerification/EmailVerification'
import ForgotPassword from '../Components/AuthComp/ForgotPassword/ForgotPassword'
import ResetPassword from '../Components/AuthComp/ResetPassword/ResetPassword'
import Search from '../Components/SearchComp/Search'
import Dashboard from '../Pages/Dashboard/Dashboard'
import IQTest from '../Pages/IQTest/IQTest'
import Reader from '../Pages/Reader/Reader'
import Progress from '../Pages/Progress/Progress'
import Profile from '../Pages/Profile/Profile'
import NotificationsSettings from '../Pages/Profile/ProfileSub/NotificationsSettings/NotificationsSettings'
import SecuritySettings from '../Pages/Profile/ProfileSub/SecuritySettings/SecuritySettings'
import PaymentMethods from '../Pages/Profile/ProfileSub/PaymentMethods/PaymentMethods'
import FriendsReferral from '../Pages/Profile/ProfileSub/FriendsReferral/FriendsReferral'
import PremiumSettings from '../Pages/Profile/ProfileSub/PremiumSettings/PremiumSettings'
import DeleteAccount from '../Pages/Profile/ProfileSub/DeleteAccount/DeleteAccount'
import Library from '../Pages/Library/Library'
import Vault from '../Pages/Vault/Vault'
import CoinWallet from '../Pages/CoinWallet/CoinWallet'
import Leaderboard from '../Pages/Leaderboard/Leaderboard'
import Landing from '../Pages/Landing/Landing'
import MyDream from '../Pages/MyDream/MyDream'
import Store from '../Pages/Store/Store'

import { ThemeProvider } from '../Context/ThemeContext'
import { AuthProvider, useAuth } from '../Context/AuthContext'
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute'
import Navbar from '../Main/Navbar/Navbar'
import Header from '../Main/Header/Header'
import WalletFillModal from '../Components/WalletFill/WalletFillModal'
import ScrollToTop from '../Components/common/ScrollToTop/ScrollToTop'
import './App.scss'

const AppContent = () => {
  const { user, loading } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = React.useState(false)

  // Pages that DON'T use the Dashboard Layout
  const noLayoutPages = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/verify-otp'];
  const isNoLayoutPage = noLayoutPages.includes(location.pathname);

  if (loading) return null;

  if (isNoLayoutPage) {
    return (
      <div className="app-no-layout">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/verify-otp" element={user ? <Navigate to="/dashboard" replace /> : <EmailVerification />} />
          <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" replace /> : <ForgotPassword />} />
          <Route path="/reset-password" element={user ? <Navigate to="/dashboard" replace /> : <ResetPassword />} />
        </Routes>
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className={`app-layout ${isSidebarCollapsed ? 'app-layout--collapsed' : ''}`}>
      <aside className={`sidebar-container ${isMobileMenuOpen ? 'open' : ''} ${isSidebarCollapsed ? 'sidebar-container--collapsed' : ''}`}>
        <Navbar
          onMobileClose={() => setIsMobileMenuOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onWalletFill={() => setIsWalletModalOpen(true)}
        />
      </aside>

      <WalletFillModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      {isMobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="content-wrapper">
        <div className="header-container">
          <Header onMenuClick={() => setIsMobileMenuOpen(prev => !prev)} />
        </div>

        <main className="main-content">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path='/library' element={<Library />} />
            <Route path='/vault' element={<Vault />} />
            <Route path='/coin-wallet' element={<CoinWallet />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/iq-test" element={<IQTest />} />
            <Route path="/my-dream" element={<MyDream />} />
            <Route path="/store" element={<Store />} />
            <Route
              path="/reader"
              element={
                <ProtectedRoute>
                  <Reader />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/notifications" element={<NotificationsSettings />} />
            <Route path="/profile/security" element={<SecuritySettings />} />
            <Route path="/profile/payments" element={<PaymentMethods />} />
            <Route path="/profile/friends" element={<FriendsReferral />} />
            <Route path="/profile/premium" element={<PremiumSettings />} />
            <Route path="/profile/delete-account" element={<DeleteAccount />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
      <ScrollToTop />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
