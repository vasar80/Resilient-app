import React from 'react';
import { Link } from 'react-router-dom';

const Exercises = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Esercizi Disponibili</h2>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <Link 
            to="/esercizi/walking-sequence" 
            className="block hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Sequenza del Cammino</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Ordina le fasi del cammino trascinando le immagini nella sequenza corretta
                </p>
              </div>
              <div className="text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Exercises; 