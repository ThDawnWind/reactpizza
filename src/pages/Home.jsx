import React from 'react';
import { Helmet } from 'react-helmet-async';
  
import { Categories} from '../components/categories';
import { SortBy } from '../components/sortBy';
import { PizzaList } from '../components/pizzaList';

export  const Home = () => {
  return (
    <>
        <Helmet>
          <title>Главная страница - React Pizza</title>
          <meta name="description" content="Сайт, где можете заказать лучшую пиццу" />
        </Helmet>
        <div className="sort-conteiner">
            <Categories/>
            <SortBy/>   
        </div>
        <main>
          <h2 className='content-title'>Все пиццы</h2>
            <PizzaList/>  
        </main>  
    </>
  );
};