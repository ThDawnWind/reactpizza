import React, { Suspense } from 'react';
import { HelmetProvider} from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from '../../pages/Home';
import { MainLayOut } from '../../layouts/MainLayOut';
import { Skeleton } from '../skeleton';

import '../../scss/app.scss';

const Page404 = React.lazy(() => import('../../pages/page404').then(module => ({ default: module.Page404 })));
const Cart = React.lazy(() => import('../../pages/cart').then(module => ({ default: module.Cart })));
const PizzaPage = React.lazy(() => import('../../pages/pizzaSinglePage').then(module => ({ default: module.PizzaSinglePage})));

function App() {
  return (
    <HelmetProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainLayOut />}>
          <Route index element={<Home />} />
          <Route
          path="pizza/:id"
          element={
            <Suspense fallback={
                 <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
                }}>
                    <Skeleton />
                </div>}
            >
              <PizzaPage />
            </Suspense>
          }
          />
          <Route 
          path="cart" 
          element={
         <Suspense fallback={<div>Loading...</div>}>
           <Cart /> 
         </Suspense>
          }
         />
        <Route 
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Page404 />
            </Suspense>
          }
        />
        </Route>
      </Routes>
    </Router>
    </HelmetProvider>

  );
}

export default App;
