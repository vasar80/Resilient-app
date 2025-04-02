import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Tests from './pages/Tests';
import Exercises from './pages/Exercises';
import NeglectTest from './components/test/NeglectTest';
import WalkingSequence from './components/exercises/WalkingSequence';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="test" element={<Tests />} />
          <Route path="test/neglect-h" element={<NeglectTest />} />
          <Route path="esercizi" element={<Exercises />} />
          <Route path="esercizi/walking-sequence" element={<WalkingSequence />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 