// src/App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login'; // Importando o componente de login
import Home from './pages/Home'; // Importando o componente principal da aplicação

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} /> {/* Redireciona para a página de login */}
      <Route path="/login" element={<Login />} /> {/* Página de Login */}
      <Route path="/home" element={<Home />} /> {/* Página Principal */}
      <Route path="/full" element={<Home />} /> {/* Página de Consulta Geral */}
    </Routes>
  );
};

export default App;
