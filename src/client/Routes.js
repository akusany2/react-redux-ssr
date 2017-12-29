import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';


export default [
  {
    component: App,
    routes: [
      {
        component: HomePage,
        path: '/',
        exact: true
      },
      {
        component: NotFoundPage,
        path: '*'
      }
    ]
  }
];