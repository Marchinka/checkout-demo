import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, RouterProvider, Routes } from 'react-router-dom';
import { AppRouter, AppRoutes } from './Pages/Router';

function App() {
  return (
    <div className="App">
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;
