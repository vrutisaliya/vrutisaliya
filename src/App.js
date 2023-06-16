import React from 'react';
import CrudList from './Component/CrudList';
import { CrudProvider } from './Component/UI/CrudContext';
import CrudForm from './Component/UI/CrudForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CrudEdit from './Component/UI/CrudEdit';

function App() {
  return (
    <CrudProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CrudForm />} />
          <Route path="/list" element={<CrudList />} />
          <Route path="/edit/:index" element={<CrudEdit/>} />

        </Routes>
      </Router>
    </CrudProvider>
  );
}

export default App;
