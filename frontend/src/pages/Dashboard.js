import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ currentUser }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <div className="text-gray-600 dark:text-gray-300">
            Selamat datang, {currentUser?.username}!
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Statistik Card */}
          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-200 mb-2">
              Total Laporan
            </h3>
            <p className="text-3xl font-bold text-blue-800 dark:text-blue-100">0</p>
          </div>

          {/* Quick Links */}
          <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-200 mb-4">
              Aksi Cepat
            </h3>
            <div className="space-y-2">
              <Link
                to="/reports/create"
                className="block text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100"
              >
                ➕ Buat Laporan Baru
              </Link>
              <Link
                to="/reports"
                className="block text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100"
              >
                📋 Lihat Semua Laporan
              </Link>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-200 mb-2">
              Informasi Pengguna
            </h3>
            <div className="space-y-2">
              <p className="text-purple-600 dark:text-purple-300">
                <span className="font-semibold">Username:</span> {currentUser?.username}
              </p>
              <p className="text-purple-600 dark:text-purple-300">
                <span className="font-semibold">Email:</span> {currentUser?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Aktivitas Terbaru
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-300 text-center py-4">
              Belum ada aktivitas terbaru
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 