import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Passport from './pages/Passport';
import Fortune from './pages/Fortune';
import Overview from './pages/Overview';

// Main App Container
const App: React.FC = () => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 shadow-xl relative overflow-hidden font-sans text-gray-800">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/passport" element={<Passport />} />
          <Route path="/fortune" element={<Fortune />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;