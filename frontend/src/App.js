import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from './contexts/ThemeContext';
import ReportList from './pages/ReportList';
import ReportForm from './pages/ReportForm';
import ReportDetail from './pages/ReportDetail';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

// PrivateRoute component untuk proteksi rute
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const [page, setPage] = useState('login');
  const [health, setHealth] = useState('');
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [currentUser, setCurrentUser] = useState(null);
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    // Cek token yang tersimpan saat aplikasi dimuat
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/login', {
        email: auth.email,
        password: auth.password,
      });
      
      // Simpan token dan data user ke localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setCurrentUser(response.data.user);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || 'Login gagal');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/register', {
        username: auth.username,
        email: auth.email,
        password: auth.password,
      });
      setPage('login');
      setError(null);
      setAuth({ email: '', password: '', username: '' });
    } catch (error) {
      setError(error.response?.data?.error || 'Registrasi gagal');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const renderAuthForm = () => {
    if (page === 'login') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-gray-900 dark:to-gray-800 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
                    <div className="prose prose-lg max-w-none">
                      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400 text-center mb-8">
                        React + Go Full Stack App
                      </h1>
                      {error && (
                        <p className="text-red-500 text-center text-sm mt-2">{error}</p>
                      )}
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                          type="email"
                          value={auth.email}
                          onChange={(e) => setAuth({ ...auth, email: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                          type="password"
                          value={auth.password}
                          onChange={(e) => setAuth({ ...auth, password: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Login
                      </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Belum punya akun?{' '}
                      <button
                        onClick={() => setPage('register')}
                        className="text-primary-600 hover:text-primary-500 dark:text-primary-400"
                      >
                        Register
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (page === 'register') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-gray-900 dark:to-gray-800 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
                    <div className="prose prose-lg max-w-none">
                      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400 text-center mb-8">
                        Register
                      </h1>
                      {error && (
                        <p className="text-red-500 text-center text-sm mt-2">{error}</p>
                      )}
                    </div>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                        <input
                          type="text"
                          value={auth.username}
                          onChange={(e) => setAuth({ ...auth, username: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                          type="email"
                          value={auth.email}
                          onChange={(e) => setAuth({ ...auth, email: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                          type="password"
                          value={auth.password}
                          onChange={(e) => setAuth({ ...auth, password: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Register
                      </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Sudah punya akun?{' '}
                      <button
                        onClick={() => setPage('login')}
                        className="text-primary-600 hover:text-primary-500 dark:text-primary-400"
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          {currentUser && <Navbar onLogout={handleLogout} />}
          <Routes>
            <Route path="/login" element={!currentUser ? renderAuthForm() : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!currentUser ? renderAuthForm() : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard currentUser={currentUser} />
              </PrivateRoute>
            } />
            <Route path="/reports" element={<PrivateRoute><ReportList /></PrivateRoute>} />
            <Route path="/reports/create" element={<PrivateRoute><ReportForm /></PrivateRoute>} />
            <Route path="/reports/:id" element={<PrivateRoute><ReportDetail /></PrivateRoute>} />
            <Route path="/reports/:id/edit" element={<PrivateRoute><ReportForm /></PrivateRoute>} />
            <Route path="/" element={<Navigate to={currentUser ? "/dashboard" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 