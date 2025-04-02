import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Benvenuto in Resilient App</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Test Disponibili</h3>
          <p className="text-gray-500 mb-4">
            Accedi ai test per valutare le capacità cognitive e motorie.
          </p>
          <Link
            to="/test"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Vai ai Test
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Esercizi</h3>
          <p className="text-gray-500 mb-4">
            Esplora gli esercizi disponibili per il training cognitivo e motorio.
          </p>
          <Link
            to="/esercizi"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Vai agli Esercizi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 