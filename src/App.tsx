import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, RouterProvider, Routes } from 'react-router-dom';
import { AppRouter } from './Pages/AppRouter';
import { AppRoutes } from "./Pages/AppRoutes";

function App() {
  return (
    <div className="App">
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;
