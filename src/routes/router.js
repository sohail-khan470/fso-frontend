import { lazy } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

const NoteList = lazy(() => import ("./pages/NoteList"));
const NoteForm = lazy(() => import('./components/NoteForm'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <h2>Welcome to Notes App</h2>,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'notes',
        children: [
          {
            element: (
              <ProtectedRoute>
                <NoteList />
              </ProtectedRoute>
            ),
          },
          {
            path: 'new',
            element: (
              <ProtectedRoute>
                <NoteForm />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];