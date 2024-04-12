import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ThreeWaysToSumToN from './problems/three-ways-to-sum-to-n/ThreeWaysToSumToN';
import FancyForm from './problems/fancy-form/FancyForm';
import MessyReact from './problems/messy-react/MessyReact';
import Layout from './layouts/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <ThreeWaysToSumToN />,
        index: true
      },
      {
        path: '/fancy-form',
        element: <FancyForm />
      },
      {
        path: '/messy-react',
        element: <MessyReact />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
