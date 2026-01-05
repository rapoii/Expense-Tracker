import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Modal from './components/ui/Modal';
import SyncStatus from './components/SyncStatus';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';

import History from './pages/History';

// Placeholders for other pages
import Settings from './pages/Settings';

import Reports from './pages/Reports';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <Router>
      <div className="app">
        <SyncStatus />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        <BottomNav onAddClick={() => setIsAddModalOpen(true)} />

        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Transaction"
        >
          <AddTransaction onClose={() => setIsAddModalOpen(false)} />
        </Modal>
      </div>
    </Router>
  );
}

export default App;
