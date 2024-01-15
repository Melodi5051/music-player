import React, { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '~/pages/Layout'

const Home = React.lazy(() => import('~/pages/Home'))

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/add-song',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
])
