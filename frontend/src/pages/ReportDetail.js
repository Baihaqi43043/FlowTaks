import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const response = await fetch(`/api/reports/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setReport(data);
      }
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
      try {
        const response = await fetch(`/api/reports/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          navigate('/reports');
        }
      } catch (error) {
        console.error('Error deleting report:', error);
      }
    }
  };

  if (!report) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">{report.title}</h1>
          <div className="flex gap-4">
            <Link
              to={`/reports/${id}/edit`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <div className="text-sm text-gray-500">
                Ditulis oleh {report.user.name} pada{' '}
                {format(new Date(report.created_at), 'dd MMMM yyyy HH:mm')}
              </div>
              {report.updated_at !== report.created_at && (
                <div className="text-sm text-gray-500">
                  Diperbarui pada{' '}
                  {format(new Date(report.updated_at), 'dd MMMM yyyy HH:mm')}
                </div>
              )}
            </div>

            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap">{report.content}</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link
            to="/reports"
            className="text-blue-500 hover:text-blue-700"
          >
            &larr; Kembali ke Daftar Laporan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail; 