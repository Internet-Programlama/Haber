
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Layout bileşenleri
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Sayfa bileşenleri
import { Home } from './components/pages/Home.jsx';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { Search } from './components/pages/Search';
import { Profile } from './components/pages/Profile/Profile';
import { AdminPanel } from './components/pages/AdminPanel/AdminPanel';
import { EditorPanel } from "./components/pages/EditorPanel/EditorPanel";
import { NewsDetail } from './components/pages/NewsDetail';
import { CategoryPage } from './components/pages/CategoryPage';
import { UserManagement } from './components/pages/AdminPanel/sections/UserManagement';
import { AddNews } from './components/pages/EditorPanel/AddNews.jsx'
import { CategoryManagement } from './components/pages/AdminPanel/sections/CategoryManagement';

const RequireAuth = ({ children, role, user, isAuthenticated }) => {
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && user?.role !== role) return <Navigate to="/" />;
  return children;
};

function AppContent() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (userData) => {
    let role = 'user';
    if (userData.username === 'admin') role = 'admin';
    else if (userData.username === 'editor') role = 'editor';

    setUser({ ...userData, role });
    setIsAuthenticated(true);

    if (role === 'admin') navigate('/admin');
    else if (role === 'editor') navigate('/editor');
    else navigate('/');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  const isAdminRoute = ['/admin', '/user-management', '/category-management'].some(
    route => window.location.pathname.startsWith(route)
  );

  if (isAdminRoute && user?.role === 'admin') {
    return (
      <div className="flex h-screen bg-gray-50">
        <Routes>
          <Route path="/admin" element={
            <RequireAuth user={user} isAuthenticated={isAuthenticated} role="admin">
              <AdminPanel user={user} />
            </RequireAuth>
          } />
          <Route path="/user-management" element={
            <RequireAuth user={user} isAuthenticated={isAuthenticated} role="admin">
              <UserManagement />
            </RequireAuth>
          } />
          <Route path="/category-management" element={
            <RequireAuth user={user} isAuthenticated={isAuthenticated} role="admin">
              <CategoryManagement />
            </RequireAuth>
          } />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} isAuthenticated={isAuthenticated} onLogout={logout} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/register" element={<Register />} /> {/* Register route ekledik */}
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={
            <RequireAuth user={user} isAuthenticated={isAuthenticated}>
              <Profile user={user} />
            </RequireAuth>
          } />
          <Route path="/editor" element={
            <RequireAuth user={user} isAuthenticated={isAuthenticated} role="editor">
              <EditorPanel user={user} />
            </RequireAuth>
          } />
          <Route path="/add-article" element={
            <RequireAuth user={user} isAuthenticated={isAuthenticated} role="editor">
              <AddNews />
            </RequireAuth>
          } />
          <Route path="/news/:newsId" element={<NewsDetail />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="*" element={<div className="p-8 text-center">Sayfa bulunamadı</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;