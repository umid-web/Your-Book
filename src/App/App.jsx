import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'

// Layout/Context components (Static)
import Navbar from '../Main/Navbar/Navbar'
import Header from '../Main/Header/Header'
import WalletFillModal from '../Components/WalletFill/WalletFillModal'
import ScrollToTop from '../Components/Common/ScrollToTop/ScrollToTop'
import { ThemeProvider } from '../Context/ThemeContext'
import { AuthProvider, useAuth } from '../Context/AuthContext'
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute'
import './App.scss'

// Lazy loaded Pages
const Register = lazy(() => import('../Components/AuthComp/Register/Register'))
const Login = lazy(() => import('../Components/AuthComp/LoginComp/Login'))
const EmailVerification = lazy(() => import('../Components/AuthComp/EmailVerification/EmailVerification'))
const ForgotPassword = lazy(() => import('../Components/AuthComp/ForgotPassword/ForgotPassword'))
const ResetPassword = lazy(() => import('../Components/AuthComp/ResetPassword/ResetPassword'))
const Dashboard = lazy(() => import('../Pages/Dashboard/Dashboard'))
const IQTest = lazy(() => import('../Pages/IQTest/IQTest'))
const Reader = lazy(() => import('../Pages/Reader/Reader'))
const Progress = lazy(() => import('../Pages/Progress/Progress'))
const Profile = lazy(() => import('../Pages/Profile/Profile'))
const Library = lazy(() => import('../Pages/Library/Library'))
const Vault = lazy(() => import('../Pages/Vault/Vault'))
const CoinWallet = lazy(() => import('../Pages/CoinWallet/CoinWallet'))
const Leaderboard = lazy(() => import('../Pages/Leaderboard/Leaderboard'))
const Landing = lazy(() => import('../Pages/Landing/Landing'))
const MyDream = lazy(() => import('../Pages/MyDream/MyDream'))
const Store = lazy(() => import('../Pages/Store/Store'))

// Lazy loaded Profile Sections
const NotificationsSettings = lazy(() => import('../Pages/Profile/ProfileSub/NotificationsSettings/NotificationsSettings'))
const SecuritySettings = lazy(() => import('../Pages/Profile/ProfileSub/SecuritySettings/SecuritySettings'))
const PaymentMethods = lazy(() => import('../Pages/Profile/ProfileSub/PaymentMethods/PaymentMethods'))
const FriendsReferral = lazy(() => import('../Pages/Profile/ProfileSub/FriendsReferral/FriendsReferral'))
const PremiumSettings = lazy(() => import('../Pages/Profile/ProfileSub/PremiumSettings/PremiumSettings'))
const DeleteAccount = lazy(() => import('../Pages/Profile/ProfileSub/DeleteAccount/DeleteAccount'))

// Common components used in routing
const Search = lazy(() => import('../Components/SearchComp/Search'))

const AppContent = () => {
  const { user, loading } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = React.useState(false)

  // Pages that DON'T use the Dashboard Layout
  const noLayoutPages = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/verify-otp'];
  const isNoLayoutPage = noLayoutPages.includes(location.pathname);

  const LoadingFallback = () => <div className="app-loading-fallback"><div className="loader"></div></div>;

  if (loading) return null;

  if (isNoLayoutPage) {
    return (
      <div className="app-no-layout">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route path="/verify-otp" element={user ? <Navigate to="/dashboard" replace /> : <EmailVerification />} />
            <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" replace /> : <ForgotPassword />} />
            <Route path="/reset-password" element={user ? <Navigate to="/dashboard" replace /> : <ResetPassword />} />
          </Routes>
        </Suspense>
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
          <Suspense fallback={<LoadingFallback />}>
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
          </Suspense>
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
