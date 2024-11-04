import React from 'react';
import { fadeIn} from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../categories/categoryFilterSlice';
import { fetchPizzas } from '../../services/pizzasApi';
import { PizzaBlock } from '../pizzaBlock';
import { Skeleton } from '../skeleton';
import { Pagination } from '../pegination';
import { Modal } from '../fullPizza';

import styles from './PizzaList.module.scss';

  const fadeInAnim = keyframes`${fadeIn}`;
  
  const FadeInDiv = styled.div`
  animation: 0.9s ${fadeInAnim};
  `;

export const PizzaList = () => {
  const dispatch = useDispatch();
  
  const { items, status } = useSelector((state) => state.pizzas);  
  const { categoryId, rating, order, currentPage, search } = useSelector((state) => state.categoryFilter);

  const [showModal, setShowModal] = React.useState(false);
  const [selectedPizza, setSelectedPizza] = React.useState(null);

  const handlePizzaClick = (pizza) => {
    setSelectedPizza(pizza);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPizza(null);
  };

  const params = React.useMemo(() => ({
    sortBy: rating,
    category: categoryId === 0 ? null : categoryId,
    order: order,
    currentPage: currentPage,
    limit: 4,
    search: search     
  }), [categoryId, rating, order, currentPage, search]);


  React.useEffect(() => {
    dispatch(fetchPizzas(params)); 
  }, [params, dispatch]);

  const onPageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  

  React.useEffect(() => {
  if (currentPage === 0) {
    dispatch(setCurrentPage(1));
  }
}, [dispatch, categoryId, currentPage, rating, order, search]);


  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
  <>
    {status === 'failed' ? (
      <div className={styles.errorInfo}>
        <p>Произошла ошибка загрузки...</p>
        <p>... или пиццы, которую вы ищете, в каталоге не найдена</p>
      </div>
    ) : (
      <div className={styles.pizzaBlockWrapper}>
        {status === 'loading' ? (
          skeletons
        ) : (
          items.map((item) => (
            <FadeInDiv key={item.id}>
              <PizzaBlock
                id={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                sizes={item.sizes}
                types={item.types}
                handleClick={() => handlePizzaClick(item)}
              />
            </FadeInDiv>
          ))
        )}
      </div>
    )}
    <Modal show={showModal} onClose={handleCloseModal} pizza={selectedPizza} />
    <Pagination currentPage={currentPage} onPageChange={onPageChange} />
  </>
);

};
