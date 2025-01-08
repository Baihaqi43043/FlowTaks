import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [health, setHealth] = useState('');
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkHealth();
    fetchUsers();
  }, []);

  const checkHealth = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/health');
      setHealth(response.data.status);
    } catch (error) {
      console.error('Error:', error);
      setError('Tidak dapat terhubung ke backend');
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8081/api/users');
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error:', error);
      setError('Gagal mengambil data users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/users', newUser);
      setNewUser({ username: '', email: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
      setError('Gagal menambahkan user');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="prose prose-lg max-w-none">
                  <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400 text-center mb-8">
                    React + Go Full Stack App
                  </h1>
                  <p className="text-green-600 text-center font-medium">Backend Status: {health || 'Tidak terhubung'}</p>
                  {error && (
                    <p className="text-red-500 text-center text-sm mt-2">{error}</p>
                  )}
                </div>

                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-primary-700 mb-6">Tambah User Baru</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        id="username"
                        type="text"
                        placeholder="Masukkan username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Masukkan email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                      Tambah User
                    </button>
                  </form>
                </div>

                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-primary-700 mb-6">Daftar User</h2>
                  {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                  ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                      {users && users.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                          {users.map((user) => (
                            <li 
                              key={user.id || Math.random()}
                              className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                                    <span className="text-primary-700 font-medium">
                                      {user.username ? user.username.charAt(0).toUpperCase() : '?'}
                                    </span>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-center py-4 text-gray-500">Belum ada user</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 